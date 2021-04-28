const PageList = (argument = "") => {
  const searchGames = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const URL = "https://api.rawg.io/api/games";

    const buildJSON = (key, value) => {

    };

    const buildParamsSearch = (json) => {
      return new URLSearchParams(json);
    };

    const defaultSearchParams = {
      search: game,
      page_size: "9",
      ordering: "-rating",
      key: "d36a865877a14bb08622b5ba79128cb3"
    };

    const buildParamsSearch = (game) => {
      return new URLSearchParams({
        search: game,
        page_size: "9",
        ordering: "-rating",
        key: "d36a865877a14bb08622b5ba79128cb3"
      });
    };

    fetch(URL + "?" + buildParamsSearch(cleanedArgument))
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        constructPage(response);
        buildShowMoreBtn(response);
      });
  };

  const constructPage = (response) => {
    let articlesList = document.getElementById('articles-list');
    response.results.forEach(game => {
      articlesList.innerHTML += `
      <div class="card col-4" style="width: 18rem;">
        <img src="${game.background_image}" class="card-img-top" alt="game_image">
        <h1 class="card-title">${game.name}</h1>
        <h2>${game.released}</h2>
        <a href = "#pagedetail/${game.id}">${game.id}</a>
      </div>
      `
    });
  };

  const buildShowMoreBtn = (data) => {
    let articleNumber = document.getElementsByClassName('card').length;
    if(articleNumber < 27 && articleNumber < data.count) {
      let articlesList = document.getElementById('articles-list');
      articlesList.innerHTML += `
      <button id="showmore-btn" type="button" name="button" class"btn btn-primary" data-url="${data.next}">Show more</button>`;
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

export { PageList };
