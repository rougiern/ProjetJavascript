// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

//ajouter une recherche à la div recherches-stockees
function afficheRecherche(saisie){
  //p
  var p = document.createElement("p");
  p.className="titre-recherche";
  //label
  var label = document.createElement("label");
  label.appendChild(document.createTextNode(saisie));
  label.setAttribute("onclick","selectionner_recherche(this)");
  //img
  var img= document.createElement("img");
  img.src="images/croix30.jpg";
  img.className="icone-croix";
  img.setAttribute("onclick","supprimer_recherche(this)");
  //ajout
  p.appendChild(label);
  p.appendChild(img);
  document.getElementById("recherches-stockees").insertAdjacentElement("beforeend",p);
}

function ajouter_recherche() {
	var zone_saisie = document.getElementById('zone_saisie').value;
  if(recherches.indexOf(zone_saisie)==-1){
    recherches.push(zone_saisie);
    afficheRecherche(zone_saisie);
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
  for(var rech in recherches){
    afficheRecherche(rech);
  }
}


function rechercher_nouvelles() {
	//TODO ...
}


function maj_resultats(res) {
	//TODO ...
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
