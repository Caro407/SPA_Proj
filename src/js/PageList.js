import { platformIcons } from './data.js'

const PageList = (argument = "") => {
  const searchGames = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const URL = "https://api.rawg.io/api";

    const fetchURL = (path, params) => {
      const defaultSearchParams = {
        page_size: "9",
        ordering: "-rating",
        key: "d36a865877a14bb08622b5ba79128cb3"
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
    getGamesByFilter({search: cleanedArgument});
  };

  const constructPage = (response) => {
    let articlesList = document.getElementById('articles-list');
    response.results.forEach( (game, i) => {
      articlesList.innerHTML += `
      <div class="card col-4 p-2" style="width: 18rem;">
        <img src="${game.background_image}" class="card-img-top img-list" alt="game_image">
        <h3 class="card-title"><a href = "#pagedetail/${game.id}"><strong>${game.name}</strong></a></h3>
        <div id="platform-icon-${i}"></div>
      </div>
      `;

      getInfos(game.platforms, `platform-icon-${i}`, displayGamePlatforms)
    });
  };

  const buildShowMoreBtn = (data) => {
    let articleNumber = document.getElementsByClassName('card').length;
    if(articleNumber < 27 && articleNumber < data.count) {
      let articlesList = document.getElementById('articles-list');
      articlesList.innerHTML += `
      <button id="showmore-btn" type="button" name="button" class="btn btn-danger my-2" data-url="${data.next}">Show more</button>`;
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

const displayGamePlatforms = (container, platform) => {
  let platformSearched = platform.platform.slug;
  if(platformIcons[platformSearched] !== undefined) {
    container.innerHTML += `
    <img src="src/images/${platformIcons[platformSearched]}" alt="game_image" style="width: 20px">
    `
  };
};

const getPlatformIcon = (platform) => {

};

export { PageList };
