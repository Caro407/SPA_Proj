import { routes } from './routes.js';
import 'bootstrap';
import '../sass/style.scss';

let searchParams;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  searchParams = window.location.search

  var pageContent = document.getElementById("pageContent");
  let finalParams = queryToJson(searchParams);

  routes[path[0]](finalParams);
  return true;
};

const getSearch = () => {
  let game = document.getElementById('game-searched');

  game.addEventListener('submit', (event) => {
      event.preventDefault();
      pageContent.innerHTML = `<div id="articles-list" class="row"></div>`;
      let input = document.getElementById("game-searched-input");
      window.location = `?search=${input.value}#pagelist`
  });
};

const queryToJson = (query) => {
  query = query.slice(1).split('&');

  let result = {};
  query.forEach((param) => {
    param = param.split('=');
    result[param[0]] = decodeURIComponent(param[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
getSearch();
