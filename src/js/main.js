'use strict';

//constanes
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const serieSection = document.querySelector('.js-ulseries');
const favoriteSection = document.querySelector('.js-ulFavorites');
const rstFav = document.querySelector('.js-btnX');

//estas son mis variables para guardar la info que me genera la API.
let serieList = [];
let serieFavorite = [];
//Local Storage //serie (item)
// eslint-disable-next-line no-unused-vars
const serieLS = JSON.parse(localStorage.getItem('serieFavorite'));
//función cuando hago click en buscar.
function handleClick(event) {
  event.preventDefault();
  //pagina vacia al cargar y buscador.
  serieSection.innerHTML = '';
  const inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      //guardo los datos en el array que he creado.
      serieList = dataApi;
      //vacio el input despues de cada busqueda.
      inputElement.value = '';
      //bucle listado
      for (const serie of dataApi) {
        //me pone la imagen por defecto en las que no la tienen.
        const imgDefault = `//via.placeholder.com/210x295/ffffff/666666/?text=TV`;
        const imgSrc =
          serie.show.image && serie.show.image.medium
            ? serie.show.image.medium
            : imgDefault;
        //me pinta la lista de series en la seccion.
        serieSection.innerHTML += `<li id=${serie.show.id} class="card js-card" ><img class="image" src=${imgSrc} alt=""><h2>${serie.show.name}</h2></li>`;
      }
      //ejecuto la función que lo pinta dentro de mi ul.
      addEventToSeries();
    });
}
function renderFavorite() {
  favoriteSection.innerHTML = '';
  for (const serie of serieFavorite) {
    //me pone la imagen por defecto en las que no la tienen.
    const imgDefault = `//via.placeholder.com/210x295/ffffff/666666/?text=TV`;
    const imgSrc =
      serie.show.image && serie.show.image.medium
        ? serie.show.image.medium
        : imgDefault;
    //me pinta la lista de series en la seccion.
    favoriteSection.innerHTML += `<li id=${serie.show.id} class="card js-card"><img class="image" src=${imgSrc} alt=""><h2>${serie.show.name}</h2></li>`;
    event.currentTarget.classList.add('cardFavorite');
  }
}
//handleFavorites crea las series en favoritos a traves de su id
function handleFavorites(event) {
  event.preventDefault();
  //paso id string a numero para que no sea undefine
  const idSerie = parseInt(event.currentTarget.id);
  //me devuelve el primer elemento que coincide con lo comparado -1 / 1
  const index = serieFavorite.findIndex((serie) => serie.show.id === idSerie);
  //si me devuelve -1 busca la id le añade la clase a la serie y añade la serie a favoritos
  if (index === -1) {
    const serieClick = serieList.find((serie) => serie.show.id === idSerie);
    serieFavorite.push(serieClick);
  } else {
    event.currentTarget.classList.remove('card');
    //splice para que no me deje coger la misma serie
    serieFavorite.splice(index, 1);
    const favoriteSerie = document.getElementById(idSerie);
    //dejar con la clase de seleccionada
    if (favoriteSerie) {
      event.currentTarget.classList.remove('card');
      event.currentTarget.classList.add('cardFavorite');
    }
  }
  renderFavorite();
  localStorage.setItem('serieFavorite', JSON.stringify(serieFavorite));
}
// addEventToSeries  me permite añadir las series a mi ul y las favoritas elegidas (click) a mi lista de series favoritas.
function addEventToSeries() {
  const allSeries = document.querySelectorAll('.js-card');
  for (const serie of allSeries) {
    serie.addEventListener('click', handleFavorites);
  }
}
//vacio el listado completo de favoritos y dejo la pagina por defecto (location.reload))
function handleResetFav(event) {
  event.preventDefault();
  serieFavorite = [];
  favoriteSection.innerHTML = '';
  localStorage.removeItem('serieFavorite');
  inputElement.value = '';
  location.reload();
}
rstFav.addEventListener('click', handleResetFav);
btnElement.addEventListener('click', handleClick);
