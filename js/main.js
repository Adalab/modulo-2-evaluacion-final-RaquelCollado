"use strict";

//constanes
const input = document.querySelector(".js-input");
const btn = document.querySelector(".js-btn");
const serieSection = document.querySelector(".js-series");
const favoriteSection = document.querySelector(".js-favorites");

const url = `https://api.tvmaze.com/search/shows?q=${input.value}`;

let serieList = []; 
let serieFavorite = []; 

fetch(url)               
  .then((response) => response.json())
  .then((dataApi) => {
    console.log(dataApi);
    serieList = dataApi.show;
    localStorage.setItem("show", JSON.stringify(serieList));
  });
  

  //función que me renderiza 1 serie (creo html)
  function renderSerie(oneShow) {
    let html = "";
    html += `<ul id=${oneShow.id} class="palette js-palette-one">`;
    html += `<li><img src=${oneShow.image.medium} alt=""><h2>${oneShow.name}</h2></li >`;
    html += `</ul>`;
    return html;
  }

  //función me recorre el listado de series y lo pinta usando la función renderSerie.
  function renderSerieList(listSerie){
    serieSection.innerHTML = "";
    for (const oneShow of listSerie){
        serieSection.innerHTML += renderSerie(oneShow);
    }
    addEventsToSerie();
  }
 //función

 function renderListFavorites (favoritesList) {
    favoriteSection.innerHTML ="";
    for (const item of favoritesList){
        favoriteSection.innerHTML += renderSerie(item);
    }
 }
 //función
function handleClick(event){
    const idSerieClick = event.currentTarget.id;
    let foundShow = serieList.find (item => item.id === idSerieClick);
    const indexFav = serieFavorite.findIndex(item => item.id === idSerieClick);
    if( indexFav === -1){
        serieFavorite.push(foundShow);
    
    }else{
        serieFavorite.splice(indexFav,1);
    }
    renderListFavorites(serieFavorite);
}

//función
function addEventsToSerie(){
    const allSeries = document.querySelectorAll('.js-list');
    for ( const item of allSeries){
        item.addEventListener('click',handleClick);
    }
}
function handleSearch(event){
    event.preventDefault();
    const searchValue = input.value;
    const filteredShow = serieList.filter(item =>item.name.toLowerCase().includes(searchValue.toLowerCase())); 
    renderSerieList(filteredShow);
}
btn.addEventListener('click', handleSearch);
