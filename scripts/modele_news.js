// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

function add_recherche(r) {
    recherches.push(r);
}

function add_recherche_courante_news(obj) {
    recherche_courante_news.push(obj);
}

function supprimer_recherche_modele(txt) {
  //index dans recherches[]
  var index = recherches.indexOf(txt);
  //splice
  recherches.splice(index,1);
}

function get_index_recherche_stockee(r){
  return recherches.indexOf(r);
}

function delete_item_recherche_courante_news(index){
  recherche_courante_news.splice(index, 1);
}

function set_Recherche_courante(r){
  recherche_courante = r
}

function vider_recherche_courante_news(){
  recherche_courante_news = [];
}

function set_recherche_courante_news(r) {
		recherche_courante_news = r;
}

function setRecherches(val) {
		recherches = val;
}

function get_index_news(obj){
  return indexOfResultat(recherche_courante_news, obj);
}
