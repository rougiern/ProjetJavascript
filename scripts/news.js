// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];
// boolean : est-ce que on est dans une recherche enregistrée
var recherche_enregistree = false;

function ajouter_recherche() {
	var zone_saisie = document.getElementById('zone_saisie').value;
  if(recherches.indexOf(zone_saisie)==-1){
    recherches.push(zone_saisie);
    $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+$("#zone_saisie").val()+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
    // setCookie("recherches",JSON.stringify(recherches),1000);
		$.cookie('recherches', JSON.stringify(recherches), { expires: 1000 });
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
  // setCookie("recherches",JSON.stringify(recherches),1000);
	$.cookie('recherches', JSON.stringify(recherches), { expires: 1000 });
}


function selectionner_recherche(e) {
	recherche_enregistree=true;
  recherche_courante =e.innerHTML;
	document.getElementById('zone_saisie').value = recherche_courante;
	recherche_courante_news = [];
	if($.cookie(recherche_courante) != null){
		recherche_courante_news = JSON.parse($.cookie(recherche_courante));
	}
	document.getElementById("resultats").innerHTML="";
	$.each(recherche_courante_news, function(){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + this.url + '" target="_blank"> '+ this.titre +' </a><span class="date_news">'+this.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
	});
}


function init() {
	if($.cookie("recherches") != null){
		recherches = JSON.parse($.cookie("recherches"));
		console.log(recherches);
	  for(var rech of recherches){
	    $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+rech+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
	  }
	}
}

function rechercher_nouvelles() {
	recherche_enregistree = false;
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
	recherche_courante_news = [];
	if($.cookie(recherche_courante) != null){
		recherche_courante_news = JSON.parse($.cookie(recherche_courante));
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
	var nouvellesauvee = {titre : decodeHtmlEntities(e.parentNode.firstChild.innerHTML.trim()),
												url : decodeHtmlEntities(e.parentNode.firstChild.href),
												date : decodeHtmlEntities(e.parentNode.childNodes[1].innerHTML.trim())};
	if(indexOfResultat(recherche_courante_news, nouvellesauvee) == -1){
		recherche_courante_news.push(nouvellesauvee);
	}
	// setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
	$.cookie(recherche_courante,JSON.stringify(recherche_courante_news), { expires: 1000 });
}

function supprimer_nouvelle(e) {
	var nouvellesuppr = {titre : e.parentNode.firstChild.innerHTML.trim(),
												url : e.parentNode.firstChild.href,
												date : e.parentNode.childNodes[1].innerHTML.trim()};
	var index = indexOfResultat(recherche_courante_news, nouvellesuppr);
	if(index != -1){
		e.firstChild.src= "images/horloge15.jpg";
		e.setAttribute("onclick","sauver_nouvelle(this)");
		recherche_courante_news.splice(index, 1);
		if(recherche_enregistree){
			document.getElementById("resultats").innerHTML="";
			$.each(recherche_courante_news, function(){
				$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + this.url + '" target="_blank"> '+ this.titre +' </a><span class="date_news">'+this.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
			});
		}
	}
	$.cookie(recherche_courante,JSON.stringify(recherche_courante_news), { expires: 1000 });
}
