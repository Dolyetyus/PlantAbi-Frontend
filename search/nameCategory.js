// const fs = require("fs");
const searchInput = document.querySelector(".input-search");
const plantCardContainer = document.querySelector(".plant-grid");
const selectedCard = document.querySelector(".card-res");

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    console.log(value);
    plantCardContainer.innerHTML = "";
    
    plantList.forEach((plant) =>{
        const isSearch = plant.name.toLowerCase().includes(value.toLowerCase()) || plant.scientific.toLowerCase().includes(value.toLowerCase);
        if(isSearch) {
            const plantCard = createPlantCard(plant);
            plantCard.querySelector(".plant-button").addEventListener("click", () => {selectPlant(plant)});
            plantCardContainer.append(plantCard);
        };
    })
})

let plantList = [];

fetch("../api/plants.json")
    .then(res => res.json())
    .then(data => {
        plantList = data.map((plant) => {
            return {name: plant.name, scientific: plant.scientific, image: plant.image, alt: plant.alt, id: plant.id}
        });
    })
    .then(data => {
        plantList.forEach((plant) => {
            const plantCard = createPlantCard(plant);
            plantCard.querySelector(".plant-button").addEventListener("click", () => {selectPlant(plant)});
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
        </div>
        <div class="plant-button">
            <span class="plant-name">${plant.name}</span>
            <span class="chevron">➜</span>
        </div>
    `;
    card.classList = "plant-card";
    return card;
}

function selectPlant(plant) {
    selectedCard.innerHTML = `
        <div class="plant-image">
            <img src="${plant.image}">
        </div>    
        <p><strong class="label">Name:</strong> ${plant.name}</p>
        <p><strong class="label">Scientific:</strong> ${plant.scientific}</p>
        <button type="button" class="select-btn">Select</button>
    `;
    
    selectedCard.querySelector('.select-btn').addEventListener('click', () => {
        addPlant(plant);
    });
}

async function addPlant(plant) {
    const encodedPlant = encodeURIComponent(JSON.stringify(plant));
    const newPage = `../addPlant/addPlant.html?plantData=${encodedPlant}`;
    window.location.href = newPage;
}

function goBack(){
    window.location.href = "../addPlant/addPlant.html";
}
