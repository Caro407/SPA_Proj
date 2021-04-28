const PageDetail = (argument = "") => {
  const searchGame = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const URL = "https://api.rawg.io/api/games";

    const buildParamsIndex = () => {
      return new URLSearchParams({
        key: "d36a865877a14bb08622b5ba79128cb3"
      });
    };

    fetch(URL + `/${cleanedArgument}?` + buildParamsIndex())
      .then((response) => response.json())
      .then(response => {
        console.log(response);
        constructPage(response);
        getInfos(response.developers, "developer", displayDevelopers);
        getInfos(response.publishers, "publisher", displayPublishers);
        getInfos(response.tags, "tag", displayTags);
        getInfos(response.genres, "genre", displayGenres);
        getInfos(response.platforms, "platform", displayPlatforms);
        getScreenshots(URL, cleanedArgument, buildParamsIndex);
        //getTrailer(URL, cleanedArgument, buildParamsIndex);
        return response;
      });
  };

  const constructPage = (gameInfo) => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article card">
          <img src="${gameInfo.background_image}" class="image-top" alt="game_image">
          <h1 id="title" class="card-title">${gameInfo.name}</h1>
          <p id="release-date">Release date : <span>${gameInfo.released}</span></p>
          <div id="card-body">
            <p id="rating">Rating : ${gameInfo.rating} (${gameInfo.ratings_count} ratings)</p>
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

const getScreenshots = (URL, argument, buildParams) => {
  fetch(URL + `/${argument}/screenshots?` + buildParams())
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    getInfos(response.results, "screenshots", displayScreenshots);
  })
};

const getTrailer = (URL, argument, buildParams) => {
  fetch(URL + `/${argument}/movies?` + buildParams())
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  })
};

const displayDevelopers = (container, developer) => {
  container.innerHTML += `
    <li>${developer.name}</li>
  `
};

const displayPublishers = (container, publisher) => {
  container.innerHTML += `
    <li>${publisher.name}</li>
  `
};

const displayTags = (container, tag) => {
  container.innerHTML += `
    <p class="badge badge-pill badge-primary">${tag.name}</p>
  `
};

const displayGenres = (container, genre) => {
  container.innerHTML += `
    <p class="badge badge-pill badge-secondary">${genre.name}</p>
  `
};

const displayPlatforms = (container, platform) => {
  container.innerHTML += `
    <li>${platform.platform.name}</li>
  `
};

const displayScreenshots = (container, screenshot) => {
  container.innerHTML += `
    <img src="${screenshot.image}" alt="game_image" style="width: 500px">
  `
};

export { PageDetail };
