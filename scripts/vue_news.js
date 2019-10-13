function ajouter_recherche_vue() {
    $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+$("#zone_saisie").val()+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
  }


function supprimer_recherche_vue(e) {
	document.getElementById("recherches-stockees").removeChild(e.parentNode);
}

function vider_resultats(){
  document.getElementById("resultats").innerHTML="";
}


function selectionner_recherche_vue() {
	document.getElementById('zone_saisie').value = recherche_courante;
	document.getElementById("resultats").innerHTML="";
	$.each(recherche_courante_news, function(){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + this.url + '" target="_blank"> '+ this.titre +' </a><span class="date_news">'+this.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
	});
}


function init_vue(rech) {
  $("#recherches-stockees").append('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+rech+'</label><img src="images/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
}

function rechercher_nouvelles_vue() {
	vider_resultats();
  document.getElementById("wait").style.display="block";
}

function maj_resultats_vue() {
	document.getElementById("wait").style.display="none";
}

function maj_resultats_vue_sauvee(nouvelle) {
	$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + nouvelle.url + '" target="_blank"> '+ nouvelle.titre +' </a><span class="date_news">'+nouvelle.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
}

function maj_resultats_vue_non_sauvee(nouvelle) {
	$("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + nouvelle.url + '" target="_blank"> '+ nouvelle.titre +' </a><span class="date_news">'+nouvelle.date+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="images/horloge15.jpg"/></span></p>');
}

function sauver_nouvelle_vue(e) {
	e.firstChild.src= "images/disk15.jpg";
	e.setAttribute("onclick","supprimer_nouvelle(this)");
}

function supprimer_nouvelle_vue(e) {
		e.firstChild.src= "images/horloge15.jpg";
		e.setAttribute("onclick","sauver_nouvelle(this)");
}

function supprimer_nouvelle_enregistree_vue(){
  document.getElementById("resultats").innerHTML="";
  $.each(recherche_courante_news, function(){
    $("#resultats").append('<p class="titre_result"><a class="titre_news" href="' + this.url + '" target="_blank"> '+ this.titre +' </a><span class="date_news">'+this.date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="images/disk15.jpg"/></span></p>');
  });
}
