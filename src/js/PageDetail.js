const PageDetail = (params = "") => {
  const defaultSearchParams = {
    key: "d36a865877a14bb08622b5ba79128cb3"
  };

  const searchGame = () => {
    const URL = "https://api.rawg.io/api/games/";

    const fetchURL = (params) => {

      let query = new URLSearchParams(defaultSearchParams);

      return fetch(URL + params.game_id + "?" + query);
    };

    fetchURL(params)
      .then((response) => response.json())
      .then(response => {
        console.log(response);
        document.getElementById('intro').classList.add('d-none');
        constructPage(response);
        getInfos(response.developers, "developer", displayDevelopers);
        getInfos(response.publishers, "publisher", displayPublishers);
        getInfos(response.tags, "tag", displayTags);
        getInfos(response.genres, "genre", displayGenres);
        getInfos(response.platforms, "platform", displayPlatforms);
        getScreenshots(URL, response.id);
        return response;
      });
  };

  const constructPage = (gameInfo) => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article card">
          <img src="${gameInfo.background_image}" class="card-banner" alt="game_image">
          <h1 id="title" class="card-title">${gameInfo.name}</h1>
          <div class="row">
            <p id="release-date" class="col-8">Release date : <span>${gameInfo.released}</span></p>
            <p id="rating" class="col-4">Rating : ${gameInfo.rating} (${gameInfo.ratings_count} ratings)</p>
          </div>
          <div id="card-body">
            <p id="description">${gameInfo.description}</p>
            <div id="developer"></div>
            <div id="publisher"></div>
            <div id="tag"></div>
            <div id="genre"></div>
            <div id="platform"></div>
            <div id="screenshots"></div>
          </div>
          <div class="card-footer">
            <a href="${gameInfo.website}" id="website">${gameInfo.website}</a>
          </div>
        </div>
      </section>
    `;
  }

  const getScreenshots = (URL, argument) => {
    let query = new URLSearchParams(defaultSearchParams);
    fetch(URL + `${argument}/screenshots?` + query)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      getInfos(response.results, "screenshots", displayScreenshots);
    })
  };

  searchGame();
};

const getInfos = (array, info, htmlRenderer) => {
  if(array.length > 0) {
    let container = document.getElementById(`${info}`);
    container.innerHTML = `${info.toUpperCase()} <br>`;
    array.forEach(result => {
      htmlRenderer(container, result);
    })
  };
};

const displayDevelopers = (container, developer) => {
  container.innerHTML += `
    <li><a href="index.html?developers=${developer.id}#pagelist">${developer.name}</a></li>
  `
};

const displayPublishers = (container, publisher) => {
  container.innerHTML += `
    <li><a href="index.html?publishers=${publisher.id}#pagelist">${publisher.name}</a></li>
  `
};

const displayTags = (container, tag) => {
  container.innerHTML += `
    <a href="index.html?tags=${tag.id}#pagelist" class="badge badge-primary">${tag.name}</a>
  `
};

const displayGenres = (container, genre) => {
  container.innerHTML += `
    <a href="index.html?genres=${genre.id}#pagelist" class="badge badge-secondary">${genre.name}</a>
  `
};

const displayPlatforms = (container, platform) => {
  container.innerHTML += `
    <li><a href="index.html?platforms=${platform.platform.id}#pagelist">${platform.platform.name}</a></li>
  `
};

const displayScreenshots = (container, screenshot) => {
  container.innerHTML += `
    <img src="${screenshot.image}" alt="game_image" style="width: 500px">
  `
};

export { PageDetail };
