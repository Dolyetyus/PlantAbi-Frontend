const screenContainer = document.querySelector(".screen-container");
const settingsButton = document.querySelector(".settings-btn");

function parseQueryParameters() {
    const queryString = window.location.search;
    settingsButton.href = `../settings/plantSettings.html${queryString}`;
    const urlParams = new URLSearchParams(queryString);
    return Object.fromEntries(urlParams.entries());
  }
  
function getPlantData() {
    const queryParams = parseQueryParameters();
    const decodedPlantData = decodeURIComponent(queryParams.plantData);
    return JSON.parse(decodedPlantData);
}
  
const plantData = getPlantData();

const cardInfo = document.createElement("div");
cardInfo.innerHTML = `
    <div class="dashboard-midsection">
        <div id="plant-title">${plantData.name}</div>
        <div id="plant-title">${plantData.scientific}</div>
        <div class="card" id="current-plant-image">
            <img src="${plantData.image}" alt="${plantData.alt}" />
        </div>

        <div class="card" id="actions">
            <div>Actions: </div>
            <div class="action">-Water plant: <span class="urgency-status">URGENT</span></div>
            <div class="action">-Remove dust: <span class="urgency-status">14 days</span></div>
        </div>
        <div id="add-actions">
            <button id="add-btn">Add Actions+</button>
        </div>
    </div>
    <div id="bottom-section">
    <div>
        <a id="web-search-button" style="text-decoration:none" href="https://www.google.com/search?q=${plantData.name}">Web Search</a>
    </div>
    </div>
`;

screenContainer.append(cardInfo);
  