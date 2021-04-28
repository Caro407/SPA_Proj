import { routes } from './routes.js';
import 'bootstrap';
import '../sass/style.scss';

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  // JSON from params

  routes[path[0]](pageArgument); // json
  return true;
};

const getSearch = () => {
  let game = document.getElementById('game-searched');

  game.addEventListener('submit', (event) => {
      event.preventDefault();
      pageContent.innerHTML = `<div id="articles-list" class="row"></div>`;
      let input = document.getElementById("game-searched-input");
      window.location = `#pagelist/${input.value}`
  });
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
getSearch();
