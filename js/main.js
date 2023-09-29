"use strict";

//constanes
const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const serieSection = document.querySelector(".js-ulseries");
const favoriteSection = document.querySelector(".js-favorites");
//estas son mis variables para guardar
let serieList = [];
let serieFavorite = [];
function handleClick(event) {
  event.preventDefault();
  const inputValue = inputElement.value;
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      console.log(dataApi);
      serieList = dataApi;
      for (const serie of dataApi) {
        serieSection.innerHTML += `<li id=${serie.show.id}><img src=${serie.show.image.medium} alt=""><h2>${serie.show.name}</h2></li >`;
      }
    });
}
btnElement.addEventListener("click", handleClick);


