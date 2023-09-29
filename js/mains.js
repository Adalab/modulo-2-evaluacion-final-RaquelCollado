"use strict";

//constanes
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-btn");
const serieSection = document.querySelector(".js-series");
const favoriteSection = document.querySelector(".js-favorites");
const inputValue = 'girls'//input.value;
const url = `https://api.tvmaze.com/search/shows?q=${inputValue}`;

let serieList = []; //ARRAY QUE GUARDA LISTADO FETCH
let serieFavorite = []; // ARRAY PARA METER FAVORITOS

// const serieLS = JSON.parse(localStorage.getItem("show"));
// if (serieLS !== null ){
//     serieList = serieLS;
//     renderSerieList(serieList); 
// }else{
fetch(url) // PETICIÓN AL SERVIDOR DE SERIES (API)
  .then((response) => response.json())
  .then((dataApi) => {
    serieList = dataApi.show; // AQUI GUARDAMOS EL LISTADO QUE NOS DAN EN EL ARRAY QUE HEMOS CREADO
 console.log(dataApi);
    localStorage.setItem("show", JSON.stringify(serieList)); // AQUI TRANSFORMAMOS LOS DATOS QUE NOS DAN
    renderSerieList(serieList); // EJECUTA LA FUNCION RENDER PARA PINTAR LA LISTA
  });
//}
function renderShow(firstSerie) {
  let html = "";
  html += `<ul id=${firstSerie.id} class="list js-list">`;
  for (const show of firstSerie.show) {
    html += `<li><div class="imgSerie js-imgSerie"><img id=${firstSerie.image} class="image js-image"><h2 class="title">${firstSerie.name}</h2></div></li >`;
  }
  html += `</ul>`;
  return html;
}

function renderSerieList(listSerie) {
  serieSection.innerHTML = '';
  for( const firstSerie of listSerie) {
    serieSection.innerHTML += renderShow(firstSerie);
  }
 addEventsSerie();
}
function addEventsSerie() {
  const allSeries = document.querySelectorAll(".js-list");
}
function handleClick(event) {
    const idSerieClick = event.currentTarget.id;
    //let foundSerie = serieList.find( item => item.id === idSerieClick);
}
function handleSearch(event){
    event.preventDefault();
    const searchValue = searchText.value;
    const filtShow = serieList.filter(item => iteerm.name.toLowerCase().includes(searchValue.toLowerCase()));
    renderSerieList(filtShow);
}
btn.addEventListener("click", handleClick);
