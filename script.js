const plantCardTemplate = document.querySelector("[data-plant-card-template]");
const plantCardContainer = document.querySelector("[data-plant-card-container]");
const searchInput = document.querySelector(".search-input");
const addButton = document.querySelector(".fab");

let plantList = [];

addButton.addEventListener("click", () => {
    window.location.href = "addPlant.html";
})

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    console.log(value);
    plantCardContainer.innerHTML = "";
    
    plantList.forEach((plant) =>{
        const isSearch = plant.name.toLowerCase().includes(value.toLowerCase()) || plant.scientific.toLowerCase().includes(value.toLowerCase);
        if(isSearch) {
            const plantCard = createPlantCard(plant);
            // plantCard.addEventListener("click", (e) => {selectPlant(plant, e)});
            plantCardContainer.append(plantCard);
        };
    })
})

fetch("api/plants.json")
    .then(res => res.json())
    .then(data => {
        plantList = data.map((plant) => {
            return {name: plant.name, scientific: plant.scientific, image: plant.image, alt: plant.alt, id: plant.id}
        });
    })
    .then(data => {
        plantList.forEach((plant) => {
            const plantCard = createPlantCard(plant);
            
            const encodedPlant = encodeURIComponent(JSON.stringify(plant));
            const newPage = `dashboard/dashboard.html?plantData=${encodedPlant}`;
            plantCard.addEventListener("click", () => {window.location.href = newPage});
            plantCardContainer.append(plantCard);
        });
    });

const createPlantCard = (plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="plant-image">
            <img src="${plant.image}" alt="${plant.alt}">
        </div>
        <div class="plant-info">
            <p><strong class="label">Name:</strong> ${plant.name}</p>
            <p><strong class="label">Scientific Name:</strong> ${plant.scientific}</p>
            <p><strong class="label">Condition:</strong> ${["bad","okay","good"][Math.floor(Math.random()*3)]}</p> 
        </div>
        <div class="plant-button">
            <span class="plant-name">${plant.name}</span>
            <span class="chevron">➜</span>
        </div>
    `;
    card.classList = "plant-card";
    return card;
}