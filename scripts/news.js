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
}


function init() {
	recherches = JSON.parse(getCookie("recherches"));
  for(var rech of recherches){
    $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+rech+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
  }
}

function rechercher_nouvelles() {
	document.getElementById("resultats").innerHTML="";
  document.getElementById("wait").style.display="block";
  try{
    $.get("calcul-serveur.php?data="+$("#zone_saisie").val(),function(data){
      maj_resultats(data);
    });
  }catch(err){
    alert(err.message);
  }
}

function maj_resultats(resultat) {
	document.getElementById("wait").style.display="none";
  for(var res in resultats){
    $("#resultats").append('<p class="titre_result"><a class="titre_news" href="url" target="_blank"> titre </a><span class="date_news">date</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="images/horloge15.jpg"/></span></p>');
  }
}


function sauver_nouvelle(e) {
	//TODO ...
}


function supprimer_nouvelle(e) {
	//TODO ...
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
