"use strict";

//constanes
const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const serieSection = document.querySelector(".js-ulseries");
const favoriteSection = document.querySelector(".js-favorites");

//estas son mis variables para guardar la info que me genera la API.
let serieList = [];
let serieFavorite = [];

/*handleClick : sección vacia por defecto (evita duplicar la busqueda), petición al sevidor, respuesta en el array, valor del input y compararlo con la info guardada para despues pintar en pantalla unicamente los resultado que concuerdan con esa busqueda.(le pongo imagen por defecto en caso de no tenerla) La ejecuto al clicar en buscar. */
function handleClick(event) {
  event.preventDefault();
  serieSection.innerHTML = "";
  const inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      serieList = dataApi;
      for (const serie of dataApi) {
        const imgDefault = `//via.placeholder.com/210x295/ffffff/666666/?text=TV`;
        const imgSrc =
          serie.show.image && serie.show.image.medium ? serie.show.image.medium : imgDefault;
        serieSection.innerHTML += `<li id=${serie.show.id} class="card js-card" ><img class="image" src=${imgSrc} alt=""><h2>${serie.show.name}</h2></li>`;
      }
      addEventToSeries();
    });
}
//handleFavorites crea las series en favoritos a traves de su id .
//Busca paleta por paleta el id de la paleta que clico y la crea y le cambia la clase en sectionSerie .
function handleFavorites(event) {
  event.preventDefault();
  const idSerie = event.currentTarget.id;
  serieFavorite = serieList.find( serie => serie.show.id = idSerie);
  console.log(serieFavorite);
  serieFavorite.innerHTML += `<li id=${serie.show.id} class="card js-card" ><img class="image" src=${imgSrc} alt=""><h2>${serie.show.name}</h2></li>`;
  }
// addEventToSeries  me permite añadir las series favoritas elegidas (click) a mi lista de series favoritas.
function addEventToSeries() {
  const allSeries = document.querySelectorAll(".js-card");
  for (const serie of allSeries) {
    serie.addEventListener("click", handleFavorites);
  }
}

btnElement.addEventListener("click", handleClick);