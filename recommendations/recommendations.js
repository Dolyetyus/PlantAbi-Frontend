const buttons = document.querySelectorAll(".category-btn");
//This function is to change the selected category on the category bar
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        buttons.forEach((btn) => {
            btn.classList.remove("active");
        });

        this.classList.add("active");
    });
});

function goBack() {
    window.location.href = "../addPlant/addPlant.html";
}