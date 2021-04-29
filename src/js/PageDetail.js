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
        <div class="jumbotron jumbotron-fluid d-flex justify-content-end align-items-end" style="background-image: url('${gameInfo.background_image}');">
          <a href="${gameInfo.website}" id="website" class="btn btn-red mr-2">Check website !</a>
        </div>
          <h1 id="title" class="card-title">${gameInfo.name}</h1>
          <div class="row mt-2">
            <h3 id="release-date" class="col-7">Release date : <span>${gameInfo.released}</span></h3>
            <h3 id="rating" class="col-5">Rating : ${gameInfo.rating} (${gameInfo.ratings_count} ratings)</h3>
          </div>
          <div class="card-body">
            <div id="genre" class="col-6"></div>
            <p id="description" class="text-justify">${gameInfo.description}</p>
            <div class="row">
              <div class="col-3">
                <h5>Developper</h5>
                <div id="developer"></div>
              </div>
              <div class="col-3">
                <h5>Publisher</h5>
                <div id="publisher"></div>
              </div>
              <div class="col-6">
                <h5>Platforms</h5>
                <div id="platform" class="row"></div>
              </div>
            </div>
            <div class="row">
              <div id="tag" class="col-6"></div>
            </div>
            <h3>Screenshots</h3>
            <div id="screenshots" class="row"></div>
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
      getOnlyFewInfos(response.results, 4, "screenshots", displayScreenshots);
    })
  };

  searchGame();
};

const getInfos = (array, info, htmlRenderer) => {
  if(array.length > 0) {
    let container = document.getElementById(`${info}`);
    array.forEach(result => {
      htmlRenderer(container, result);
    })
  };
};

const getOnlyFewInfos = (array, number, info, htmlRenderer) => {
  if(array.length > 0) {
    let container = document.getElementById(`${info}`);
    for(let i = 0; i < number; i++) {
      htmlRenderer(container, array[i])
    };
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
    <li class="col-6"><a href="index.html?platforms=${platform.platform.id}#pagelist">${platform.platform.name}</a></li>
  `
};

const displayScreenshots = (container, screenshot) => {
  container.innerHTML += `
    <img src="${screenshot.image}" alt="game_image" style="width: 500px" class="col-6">
  `
};

export { PageDetail };
