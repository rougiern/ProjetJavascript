//arret à maj_resultats()


// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

function ajouter_recherche() {
	var zone_saisie = document.getElementById('zone_saisie').value;
  if(recherches.indexOf(zone_saisie)==-1){
    recherches.push(zone_saisie);
    $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+$("#zone_saisie").val()+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
    setCookie("recherches",JSON.stringify(recherches),1000);
  }else{
    alert('recherche déjà enregistrée');
  }
}


function supprimer_recherche(e) {
  //contenu du label
  var txt = e.parentNode.firstChild.innerHTML;
  //index dans recherches[]
  var index = recherches.indexOf(txt);

  recherches.splice(index,1);
	document.getElementById("recherches-stockees").removeChild(e.parentNode);
  setCookie("recherches",JSON.stringify(recherches),1000);
}


function selectionner_recherche(e) {
  recherche_courante =e.innerHTML;
	document.getElementById('zone_saisie').value = recherche_courante;
	if(getCookie(recherche_courante) != ""){
		recherche_courante_news = JSON.parse(getCookie(recherche_courante));
	}else{
		recherche_courante_news = [];
	}
	document.getElementById("resultats").innerHTML="";
	$.each(recherche_courante_news, function(){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + this.url + '" target="_blank"> '+ this.titre +' </a><span class="date_news">'+this.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
	});
}


function init() {
	if(getCookie("recherches") != ""){
		recherches = JSON.parse(getCookie("recherches"));
	}
	console.log(recherches);
  for(var rech of recherches){
    $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+rech+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
  }
}

function rechercher_nouvelles() {
	document.getElementById("resultats").innerHTML="";
  document.getElementById("wait").style.display="block";
  try{
    $.get("search.php?data="+$("#zone_saisie").val(),function(data){
      maj_resultats(data);
    });
  }catch(err){
    alert(err.message);
  }
}

function maj_resultats(resultat) {
	recherche_courante = document.getElementById('zone_saisie').value;
	if(getCookie(recherche_courante) != ""){
		recherche_courante_news = JSON.parse(getCookie(recherche_courante));
	}else{
		recherche_courante_news = [];
	}
	document.getElementById("wait").style.display="none";
	$.each(JSON.parse(resultat), function(){
		var nouvelle = {titre : decodeHtmlEntities(this.titre.trim()),
										url : decodeHtmlEntities(this.url),
										date : formatDate(this.date).trim()};
		var index = indexOfResultat(recherche_courante_news, nouvelle);
		if(index == -1){
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + nouvelle.url + '" target="_blank"> '+ nouvelle.titre +' </a><span class="date_news">'+nouvelle.date+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="images/horloge15.jpg"/></span></p>');
		}else {
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + nouvelle.url + '" target="_blank"> '+ nouvelle.titre +' </a><span class="date_news">'+nouvelle.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
		}
	});
}


function sauver_nouvelle(e) {
	e.firstChild.src= "images/disk15.jpg";
	e.setAttribute("onclick","supprimer_nouvelle(this)");
	var nouvellesauvee = {titre : e.parentNode.firstChild.innerHTML.trim(),
												url : e.parentNode.firstChild.href,
												date : e.parentNode.childNodes[1].innerHTML.trim()};
	if(indexOfResultat(recherche_courante_news, nouvellesauvee) == -1){
		recherche_courante_news.push(nouvellesauvee);
	}
	setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
}

function supprimer_nouvelle(e) {
	e.firstChild.src= "images/horloge15.jpg";
	e.setAttribute("onclick","sauver_nouvelle(this)");
	var nouvellesuppr = {titre : e.parentNode.firstChild.innerHTML.trim(),
												url : e.parentNode.firstChild.href,
												date : e.parentNode.childNodes[1].innerHTML.trim()};
	var index = indexOfResultat(recherche_courante_news, nouvellesuppr);
	console.log(nouvellesuppr);
	console.log(recherche_courante_news);
	console.log(index);
	if(index != -1){
		recherche_courante_news.splice(index, 1);
		document.getElementById("resultats").innerHTML="";
		if($(""))
		$.each(recherche_courante_news, function(){
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + this.url + '" target="_blank"> '+ this.titre +' </a><span class="date_news">'+this.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
		});
	}
	setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  var cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  document.cookie = encodeURIComponent(cookie);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
