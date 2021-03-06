let Allcells = document.querySelectorAll(".grid .cell");
let addressElem = document.querySelector(".address");
let formulaBar = document.querySelector(".formula");
let bold = document.querySelector(".fa-bold");
let italic = document.querySelector(".fa-italic");
let underline = document.querySelector(".fa-underline");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let alignmentbtns = document.querySelectorAll(".alignment-container>*");
let color = document.querySelector(".color");
let bgColor = document.querySelector(".bg-color");

bold.addEventListener("click", function () {
    // ui elemnt
    let uiCell = getcell();
    // address get 
    // check value in sheet array
    // perform action accordingly
    let { rid, cid } = getRIdCIdfromAddress();
    // console.log(rid,cid);
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isBold == true) {
        uiCell.style.fontWeight = "normal";
        bold.classList.remove("menu-active");
        cellObj.isBold = false
    } else {
        uiCell.style.fontWeight = "bold";
        bold.classList.add("menu-active");
        cellObj.isBold = true;
    }
});
italic.addEventListener("click", function () {
    // ui elemnt
    let uiCell = getcell();
    // address get 
    // check value in sheet array
    // perform action accordingly
    let { rid, cid } = getRIdCIdfromAddress();
    // console.log(rid,cid);
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isItalic == true) {
        uiCell.style.fontStyle = "normal";
        italic.classList.remove("menu-active");
        cellObj.isItalic = false
    } else {
        uiCell.style.fontStyle = "Italic";
        italic.classList.add("menu-active");
        cellObj.isItalic = true;
    }
});
underline.addEventListener("click", function () {
    // ui elemnt
    let uiCell = getcell();
    // address get 
    // check value in sheet array
    // perform action accordingly
    let { rid, cid } = getRIdCIdfromAddress();
    // console.log(rid,cid);
    let cellObj = sheetArr[rid][cid];
    if (cellObj.isUnderline == true) {
        uiCell.style.textDecoration = "none";
        underline.classList.remove("menu-active");
        cellObj.isUnderline = false
    } else {
        uiCell.style.textDecoration = "underline";
        underline.classList.add("menu-active");
        cellObj.isUnderline = true;
    }
});
fontSize.addEventListener("change", function () {
    let cfontSize = fontSize.value;
    let uiCell = getcell();
    let { rid, cid } = getRIdCIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    // ui change
    uiCell.style.fontSize = cfontSize + "px";
    // cell Object update
    cellObj.fontSize = cfontSize;
});
fontFamily.addEventListener("change", function () {
    let cfontFamily = fontFamily.value;
    let uiCell = getcell();
    let { rid, cid } = getRIdCIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    // ui change
    uiCell.style.fontFamily = cfontFamily;
    // cell Object update
    cellObj.fontFamily = cfontFamily;
});
color.addEventListener("change", function () {
    let selectedColor = color.value;
    uiCell = getcell();
    let { rid, cid } = getRIdCIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    // ui change
    uiCell.style.color = selectedColor;
    // cell Object update
    cellObj.color = selectedColor;
});
bgColor.addEventListener("change", function () {
    let selectedColor = bgColor.value;
    uiCell = getcell();
    let { rid, cid } = getRIdCIdfromAddress();
    let cellObj = sheetArr[rid][cid];
    // ui change
    uiCell.style.backgroundColor = selectedColor;
    // cell Object update
    cellObj.bgColor = selectedColor;
});

// to return current cell element
function getcell() {
    let address = addressElem.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    // console.log(rid, cid);
    return document.querySelector(`.grid .cell[rid="${rid}"][ cid="${cid}"]`)
}

// to get rid and cid for current cell
function getRIdCIdfromAddress() {
    let address = addressElem.value;
    // A->z
    // 1->100
    // charCodeAt gives ASCII value for given index of String
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;
    return { cid, rid };
}

// add event to alignment btn
for (let i = 0; i < alignmentbtns.length; i++) {
    alignmentbtns[i].onclick = function () {
        let uiCell = getcell();
        let { rid, cid } = getRIdCIdfromAddress();
        let cellObj = sheetArr[rid][cid];
        let newAlignment = alignmentbtns[i].getAttribute("direct")
        uiCell.style.textAlign = newAlignment;
        for (let j = 0; j < alignmentbtns.length; j++) {
            alignmentbtns[j].classList.remove("menu-active");
        }
        alignmentbtns[i].classList.add("menu-active");
        cellObj.halign = newAlignment;
    }
}

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function () {
        let cid = Allcells[i].getAttribute("cid");
        let rid = Allcells[i].getAttribute("rid");
        cid = Number(cid);
        rid = Number(rid);
        // console.log(rid,cid);
        addressElem.value = `${String.fromCharCode(65 + cid)}${rid + 1}`; // to show name of cell in formula section

        // tool bar
        let cellObj = sheetArr[rid][cid];
        if (cellObj.isBold == true) {
            bold.classList.add("menu-active");
        } else {
            bold.classList.remove("menu-active");

        }
        if (cellObj.isItalic == true) {
            italic.classList.add("menu-active");
        } else {
            italic.classList.remove("menu-active");
        }
        if (cellObj.isUnderline == true) {
            underline.classList.add("menu-active");
        } else {
            underline.classList.remove("menu-active");
        }
        fontSize.value = cellObj.fontSize;
        fontFamily.value = cellObj.fontFamily;
        for (let j = 0; j < alignmentbtns.length; j++) {
            alignmentbtns[j].classList.remove("menu-active");
            let cAlignment = alignmentbtns[j].getAttribute("direct");
            if (cAlignment == cellObj.halign) {
                alignmentbtns[j].classList.add("menu-active");
            }
        }
        color.value = cellObj.color;
        bgColor.value = cellObj.bgColor;

        /**************************** Formula Update ******************************/
        formulaBar.value = cellObj.formula;
    });
}
Allcells[0].click();