let iconContainer = document.querySelector(".icon-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleClick);
// add event listener
iconContainer.addEventListener("click", function () {
    // create new sheet
    let newSheet = document.createElement("div");
    // create element
    let allSheets = document.querySelectorAll(".sheet");
    let lastSheet = allSheets[allSheets.length - 1];
    let idx = lastSheet.getAttribute("idx");
    newSheet.setAttribute("idx", Number(idx) + 1);
    // text set
    newSheet.innerText = `Sheet - ${Number(idx) + 2}`;
    // set class
    newSheet.setAttribute("class", "sheet");
    // append
    sheetList.appendChild(newSheet);

    // set last sheet as active
    setLastActive(allSheets);

    // put sheet color to the current
    newSheet.addEventListener("click", handleClick);
});

// function to set last sheet as active
function setLastActive() {
    let allSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    allSheets[allSheets.length - 1].classList.add("active");
}

// function to set clicked sheet as active
function handleClick(e) {
    // console.log(e); // currentTarget property of e - null but that exists
    // console.log(e.currentTarget);
    let sheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
}