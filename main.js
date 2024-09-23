import "./style.css";

const global = {
  currentPage: window.location.pathname,
  api: {
    apiKey: "05e321fd035cb161d44909bda62aec4e",
    apiUrl: "https://api.themoviedb.org/3",
  },
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
};

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Add the type and term to the global object
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, total_results } = await searchAPIData();
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      alert("No such item");
      return;
    }

    displayResults(results);
  } else {
    alert("Search term is empty");
  }
}

async function searchAPIData() {
  try {
    const response = await fetch(
      `${global.api.apiUrl}/search/${global.search.type}?api_key=${global.api.apiKey}&language=en-US&query=${global.search.term}&page=${global.search.page}`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error.message);
  }
}

function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector("#pagination").appendChild(div);

  // Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  }

  // Disable next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }

  // Next page
  document.querySelector("#next").addEventListener("click", async (e) => {
    e.preventDefault();
    global.search.page++;
    const { results } = await searchAPIData();
    displayResults(results);
  });

  // Prev page
  document.querySelector("#prev").addEventListener("click", async (e) => {
    e.preventDefault();
    global.search.page--;
    const { results } = await searchAPIData();
    displayResults(results);
  });
}

function displayResults(results) {
  // Clear previous results
  document.querySelector(".results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
             alt="${
               global.search.type === "movie" ? result.title : result.name
             }"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        `;
    document.querySelector("#search-results-heading").innerHTML = `
        <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
`;
    document.querySelector(".results").appendChild(div);
  });

  displayPagination();
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("home");
      break;

    case "/search.html":
      search();
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
