const backButton = document.querySelector(".back-btn");

function confirmDelete() {
    const confirmed = confirm("Are you sure you want to delete the plant?");
    if (confirmed) {
        console.log("Plant deleted!");
    } 
    else {
        console.log("Deletion canceled.");
    }
}

const queryString = window.location.search;
backButton.href = `../dashboard/dashboard.html${queryString}`;