import { platformIcons } from './data.js'

const PageList = (pageParams = "") => {
  const searchGames = () => {
    let articles = "";

    const URL = "https://api.rawg.io/api";

    const fetchURL = (path, params) => {
      const defaultSearchParams = {
        page_size: "9",
        ordering: "-rating",
        key: process.env.API_KEY
      };

      let totalParams = {
        ...defaultSearchParams,
        ...params
      };

      let query = new URLSearchParams(totalParams);

      return fetch(URL + path + "?" + query);
    };

    const getGamesByFilter = (filter) => {
      fetchURL('/games', filter)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          constructPage(response);
          buildShowMoreBtn(response);
      });
    };

    document.getElementById('intro').classList.remove('d-none');
    getGamesByFilter(pageParams);
  };

  const constructPage = (response) => {
    let articlesList = document.getElementById('articles-list');
    response.results.forEach( (game, i) => {
      articlesList.innerHTML += `
      <div class="card col-4 p-2" style="width: 18rem;">
        <div class="img-list" style="background-image: url('${game.background_image}')">
          <div class="img-list-text h-100 d-flex flex-column align-items-center justify-content-around">
            <h3 class="card-title text-center"><a href = "index.html?game_id=${game.id}#pagedetail"><strong>${game.name}</strong></a></h3>
            <div class="platform-icon"></div>
          </div>
        </div>
      </div>
      `;
      let node = articlesList.querySelectorAll('.platform-icon');
      let element = node[node.length - 1];
      getSpecificInfos(game.platforms, element, displayGamePlatforms);
    });
  };

  const buildShowMoreBtn = (data) => {
    let articleNumber = document.getElementsByClassName('card').length;
    if(articleNumber < 27 && articleNumber < data.count) {
      let articlesList = document.getElementById('articles-list');
      articlesList.innerHTML += `
      <a id="showmore-btn" type="button" name="button" class="btn btn-red my-2" data-url="${data.next}">Show more</a>`;
      let button = document.getElementById('showmore-btn');
      button.addEventListener('click', (event) => {
        event.preventDefault;
        let temp = button.dataset.url;
        deleteShowMoreBtn();
        showMoreGames(temp);
      });
    }
  };

  const deleteShowMoreBtn = () => {
    let button = document.getElementById('showmore-btn');
    button.remove();
  };

  const showMoreGames = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        constructPage(response);
        buildShowMoreBtn(response);
      });
  };

  searchGames();
};

const getInfos = (array, info, htmlRenderer) => {
  if(array != null && array.length > 0) {
    let container = document.getElementById(`${info}`);
    array.forEach(result => {
      htmlRenderer(container, result);
    })
  };
};

const getSpecificInfos = (array, container, htmlRenderer) => {
  if(array != null && array.length > 0) {
    array.forEach(result => {
      htmlRenderer(container, result);
    })
  };
};

const displayGamePlatforms = (container, platform) => {
  let platformSearched = platform.platform.slug;
  if(platformIcons[platformSearched] !== undefined) {
    container.innerHTML += `
    <img src="src/images/${platformIcons[platformSearched]}" alt="game_image" style="width: 20px">
    `
  };
};

export { PageList };
