// This function is for displaying the image, obviously
function showSelectedImage(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        // I hate javascript so much
        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%'; 
            img.style.maxHeight = '100%'; 
            img.style.borderRadius = '10px'; 
            
            var container = document.querySelector('.selected-plant-image');
            container.innerHTML = '';
            container.appendChild(img);
        };
        
        reader.readAsDataURL(event.target.files[0]);
    }
}

function openCamera() {
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            console.log("Camera access granted!");
        })
        .catch(error => {
            console.error("Camera access denied:", error);
        });
}

function navigateToSearch() {
    window.location.href = "../search/nameCategory.html";
}

function navigateToRecom(){
    window.location.href = "../recommendations/recommendations.html";
}


function parseQueryParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Object.fromEntries(urlParams.entries());
  }
  
function getPlantData() {
    const queryParams = parseQueryParameters();
    const decodedPlantData = decodeURIComponent(queryParams.plantData);
    return JSON.parse(decodedPlantData);
}

if(window.location.search) {
    const plantImageBanner = document.querySelector(".selected-plant-image");
    const plantData = getPlantData();
    plantImageBanner.innerHTML = `
        <img src="${plantData.image}" alt="${plantData.alt}" class="banner-image">
    `;
    plantImageBanner.classList = "selected-plant-image-selected";

}

document.querySelector(".add-btn").addEventListener("click", () => {
    window.location.href="../index.html";
})