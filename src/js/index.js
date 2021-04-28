import { routes } from './routes.js';
//import { PageList } from './PageList.js'
import 'bootstrap';
import '../sass/style.scss';

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

const getSearch = () => {
  let game = document.getElementById('game-searched');
  let searchLink = document.getElementById('pagelist');

  document.querySelector('#submit-btn').addEventListener('click', (event) => {
    event.preventDefault;
    pageContent.innerHTML = `<div id="articles-list" class="row"></div>`;
    window.location = `#pagelist/${game.value}`
  })
}

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
getSearch();
