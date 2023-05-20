const makeTwoPartCallback = () => {
  const readyCallback = (name, q, promos, results, resultsDiv) => {
    // Set data in localStorage
    localStorage.setItem("searchData", JSON.stringify(results));
  };

  const renderedCallback = (name, q, promos, results, resultsDiv) => {};

  return { readyCallback, renderedCallback };
};

const {
  readyCallback: webResultsReadyCallback,
  renderedCallback: webResultsRenderedCallback,
} = makeTwoPartCallback();
window.__gcse || (window.__gcse = {});
window.__gcse.searchCallbacks = {
  web: {
    ready: webResultsReadyCallback,
    rendered: webResultsRenderedCallback,
  },
};

// Retrieve data from localStorage

function getSearchData() {
  const data = JSON.parse(localStorage.getItem("searchData"));
  // Clear the data for next search
  localStorage.removeItem("searchData");
  return data;
}

// filter data for application

const items = getSearchData().filter(
  (item) => item.richSnippet.videoobject?.genre === "Music"
);

console.log(items);

// --------------------------new code -----------------------------

function displayResults(items) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  items.forEach((item) => {
    const videoId = item.link.split("v=")[1];

    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.innerHTML = `
    <img src="${item.thumbnailImage.url}" alt="Card Image" />
    <div class="card-content">

      <h3 class="video__title">${item.titleNoFormatting}</h3>
      <p class="video__description">${item.contentNoFormatting}</p>

      <div class="details">
        <div class="website">
          <span class="website__logo">yu</span>
          youtube
        </div>
        <div class="views">23m views</div>
      </div>
    </div>
    `;

    resultsContainer.appendChild(resultItem);
  });
}

// // Function to display the navigation
// function displayNavigation(queries) {
//   const navigationContainer = document.getElementById("navigation-container");
//   navigationContainer.innerHTML = "";

//   if (queries.previousPage) {
//     const prevButton = createNavigationButton(
//       "Prev",
//       queries.previousPage[0].startIndex
//     );
//     navigationContainer.appendChild(prevButton);
//   }

//   if (queries.nextPage) {
//     const nextButton = createNavigationButton(
//       "Next",
//       queries.nextPage[0].startIndex
//     );
//     navigationContainer.appendChild(nextButton);
//   }
// }

// // Function to create navigation buttons
// function createNavigationButton(label, startIndex) {
//   const button = document.createElement("button");
//   button.textContent = label;
//   button.addEventListener("click", () => {
//     currentPage = startIndex / resultsPerPage;
//     performSearch(document.getElementById("search-input").value);
//   });

//   return button;
// }

// // Function to show the video preview overlay
// function showPreview(videoId) {
//   const overlay = document.getElementById("preview-overlay");
//   overlay.innerHTML = `
//     <div class="video-preview">
//       <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
//     </div>
//     <div class="overlay-buttons">
//       <button onclick="openVideo('${videoId}');">Visit</button>
//       <button onclick="closePreview();">Close</button>
//     </div>
//   `;
//   overlay.style.display = "block";
// }

// // Function to open the video in a new tab
// function openVideo(videoId) {
//   window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
//   closePreview();
// }

// // Function to close the video preview overlay
// function closePreview() {
//   const overlay = document.getElementById("preview-overlay");
//   overlay.style.display = "none";
//   overlay.innerHTML = "";
// }

// Event listener for the search form submission
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  displayResults(items);
  // const query = document.getElementById("search-input").value;
});
