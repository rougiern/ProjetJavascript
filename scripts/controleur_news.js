// boolean : est-ce que on est dans une recherche enregistrée
var recherche_enregistree = false;

function ajouter_recherche() {
	var zone_saisie = document.getElementById('zone_saisie').value;
  if(recherches.indexOf(zone_saisie)==-1){
    add_recherche(zone_saisie);
    ajouter_recherche_vue();
		$.cookie('recherches', JSON.stringify(recherches), { expires: 1000 });
  }else{
    alert('recherche déjà enregistrée');
  }
}


function supprimer_recherche(e) {
  rech = e.parentNode.firstChild.innerHTML;
  supprimer_recherche_modele(rech);
  supprimer_recherche_vue(e);
	$.cookie('recherches', JSON.stringify(recherches), { expires: 1000 });
  $.removeCookie(rech);
  if(recherche_enregistree==false && recherche_courante==rech){
    rechercher_nouvelles();
  }else if(recherche_enregistree==true && recherche_courante==rech){
    vider_resultats();
  }
}


function selectionner_recherche(e) {
  recherche_enregistree=true;
	set_Recherche_courante(e.innerHTML);
  vider_recherche_courante_news();
	if($.cookie(recherche_courante) != null){
		set_recherche_courante_news(JSON.parse($.cookie(recherche_courante)));
	}
  selectionner_recherche_vue();
}


function init() {
	if($.cookie("recherches") != null){
		setRecherches(JSON.parse($.cookie("recherches")));
	  for(var rech of recherches){
      init_vue(rech);
	  }
	}
}

function rechercher_nouvelles() {
  recherche_enregistree = false;
  rechercher_nouvelles_vue();
  try{
    $.get("search.php?data="+$("#zone_saisie").val(),function(data){
      maj_resultats(data);
    });
  }catch(err){
    alert(err.message);
  }
}

function maj_resultats(resultat) {
  maj_resultats_vue();
	set_Recherche_courante(document.getElementById('zone_saisie').value);
  vider_recherche_courante_news();
	if($.cookie(recherche_courante) != null){
		set_recherche_courante_news(JSON.parse($.cookie(recherche_courante)));
	}
	$.each(JSON.parse(resultat), function(){
		var nouvelle = {titre : decodeHtmlEntities(this.titre.trim()),
										url : decodeHtmlEntities(this.url),
										date : formatDate(this.date).trim()};
		var index = get_index_news(nouvelle);
		if(index == -1){
			maj_resultats_vue_non_sauvee(nouvelle);
		}else {
      maj_resultats_vue_sauvee(nouvelle);
		}
	});
}


function sauver_nouvelle(e) {
  if(get_index_recherche_stockee(recherche_courante)!=-1){
  	var nouvellesauvee = {titre : decodeHtmlEntities(e.parentNode.firstChild.innerHTML.trim()),
  												url : decodeHtmlEntities(e.parentNode.firstChild.href),
  												date : decodeHtmlEntities(e.parentNode.childNodes[1].innerHTML.trim())};
  	if(get_index_news(nouvellesauvee) == -1){
  		add_recherche_courante_news(nouvellesauvee);
  	}
    sauver_nouvelle_vue(e);
  	$.cookie(recherche_courante,JSON.stringify(recherche_courante_news), { expires: 1000 });
  }
}

function supprimer_nouvelle(e) {
  var nouvellesuppr = {titre : e.parentNode.firstChild.innerHTML.trim(),
												url : e.parentNode.firstChild.href,
												date : e.parentNode.childNodes[1].innerHTML.trim()};
	var index = get_index_news(nouvellesuppr);
	if(index != -1){
		delete_item_recherche_courante_news(index)
    supprimer_nouvelle_vue(e);
		if(recherche_enregistree){
			supprimer_nouvelle_enregistree_vue();
		}
	}
	$.cookie(recherche_courante,JSON.stringify(recherche_courante_news), { expires: 1000 });
}
