let iconContainer = document.querySelector(".icon-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", handleClick);
firstSheet.click();
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
    // click the new sheet to set sheetDB
    newSheet.click();
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
// also create new sheet, set UI and set current sheet in sheetArr
function handleClick(e) {
    // console.log(e); // currentTarget property of e - null but that exists
    // console.log(e.currentTarget);
    let sheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");

    // sheet change at UI - sync UI from DB 
    let idx = sheet.getAttribute("idx");
    if (idx == 0 && sheetListArr.length == 0) {
        initSheetDB();
        sheetArr = sheetListArr[0];
    } else {
        // create a new sheet
        if (sheetListArr[idx] == undefined) {
            initSheetDB();
            sheetArr = sheetListArr[idx];
        } else {
            // switch sheet
            sheetArr = sheetListArr[idx];
        }
        setUI(sheetArr);
    }
}