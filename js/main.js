"use strict";

//constanes
const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const serieSection = document.querySelector(".js-ulseries");
const favoriteSection = document.querySelector(".js-ulFavorites");

//estas son mis variables para guardar la info que me genera la API.
let serieList = [];
let serieFavorite = [];
//Local Storage
//const serieLS = JSON.parse(localStorage.getItem("serie"));


//función cuando hago click en buscar.
function handleClick(event) {
  event.preventDefault();


  //pagina vacia al cargar.
  serieSection.innerHTML = "";
  const inputValue = inputElement.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      //guardo los datos en el array que he creado.
      serieList = dataApi;

      
      //bucle listado
      for (const serie of dataApi) {
        //me pone la imagen por defecto en las que no la tienen.
        const imgDefault = `//via.placeholder.com/210x295/ffffff/666666/?text=TV`;
        const imgSrc =
        serie.show.image && serie.show.image.medium ? serie.show.image.medium : imgDefault;


        //me pinta la lista de series en la seccion. 
        serieSection.innerHTML += `<li id=${serie.show.id} class="card js-card" ><img class="image" src=${imgSrc} alt=""><h2>${serie.show.name}</h2></li>`;
      }

      //ejecuto la función que lo pinta dentro de mi ul.
      addEventToSeries();
    });
}
//handleFavorites crea las series en favoritos a traves de su id (donde se escucha).
function handleFavorites(event) {
  event.preventDefault();
 
  const idSerie = Number(event.currentTarget.id);
  
  const serieFavorite = serieList.find((serie)=> serie.show.id === idSerie);
  
  console.log(serieFavorite);

  //añado o elimino la clase al clicar.
  event.currentTarget.classList.add("cardFavorite");
  event.currentTarget.classList.remove("card");


  //imagen por defecto en caso de no tener.
  const imgDefault = `//via.placeholder.com/210x295/ffffff/666666/?text=TV`;
  const imgSrc = serieFavorite.show.image && serieFavorite.show.image.medium ? serieFavorite.show.image.medium : imgDefault;


  //ponga idSerie o serieFavorite hace lo mismo
  favoriteSection.innerHTML += `<li id=${serieFavorite} class="card js-card" ><img class="image" src=${imgSrc} alt=""><h2>${serieFavorite.show.name}</h2></li>`;
  //localStorage.setItem("serie",JSON.stringify(serieFavorite));
  }



// addEventToSeries  me permite añadir las series a mi ul y las favoritas elegidas (click) a mi lista de series favoritas.
function addEventToSeries() {
  const allSeries = document.querySelectorAll(".js-card");
  for (const serie of allSeries) {
  serie.addEventListener("click", handleFavorites);
  }
}

btnElement.addEventListener("click", handleClick);