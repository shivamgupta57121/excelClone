// event listener on cell so that updated value of cell can be stored in DB on blur
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function () {
        // db -> update value on prev cell
        let { rid, cid } = getRIdCIdfromAddress();
        let cellObj = sheetArr[rid][cid];
        // value of cell not changed
        if (cellObj.value == Allcells[i].innerText) {
            return;
        }
        cellObj.value = Allcells[i].innerText;
        // telling children to re evaluate and update
        updateChildren(cellObj);
        if (cellObj.formula) {
            removeFormula(cellObj.formula, addressElem.value);
        }
        // to remove formula from
        cellObj.formula = "";
    });
}

// to update value of children
function updateChildren(cellObj) {
    let children = cellObj.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let cCid = Number(child.charCodeAt(0)) - 65;
        let cRid = Number(child.slice(1)) - 1;
        let cFormula = sheetArr[cRid][cCid].formula;
        let value = evaluateFormula(cFormula);
        setCell(value, cRid, cCid, cFormula);
        updateChildren(sheetArr[cRid][cCid]);
    }
}


// event listener to listen to formula bar
formulaBar.addEventListener("keydown", function (e) {
    // 1. Enter formula and press enter
    if (e.key == "Enter" && formulaBar.value != "") {
        // 2. get formula
        let cFormula = formulaBar.value;
        let { rid, cid } = getRIdCIdfromAddress();
        cellObj = sheetArr[rid][cid];
        // check if formula not changed
        if (cellObj.formula == cFormula) {
            return;
        }
        else if (cellObj.formula) {
            removeFormula(cellObj.formula, addressElem.value);
        }
        // 3. value evaluation
        let val = evaluateFormula(cFormula);
        // UI/DB updat evalue
        setCell(val, rid, cid, cFormula);
        // set self as children in Parent 
        setFormula(cFormula, addressElem.value);
    }
})

// evaluate a given formula and return result
function evaluateFormula(cFormula) {
    let formulaTokens = cFormula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // valid cell
            let parentCell = formulaTokens[i];
            let pCid = Number(parentCell.charCodeAt(0)) - 65;
            let pRid = Number(parentCell.slice(1)) - 1;
            let pValue = sheetArr[pRid][pCid].value;
            formulaTokens[i] = pValue;
        }
    }
    let finalFormula = formulaTokens.join(" ");
    return eval(finalFormula);
}

// to add current cell as children of all cells used in formula
function setFormula(cFormula, myName) {
    let formulaTokens = cFormula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // valid cell
            let parentCell = formulaTokens[i];
            let pCid = Number(parentCell.charCodeAt(0)) - 65;
            let pRid = Number(parentCell.slice(1)) - 1;
            sheetArr[pRid][pCid].children.push(myName);
        }
    }
}

// to remove current cell as children of all cells used in formula
function removeFormula(cFormula, myName) {
    let formulaTokens = cFormula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            // valid cell
            let parentCell = formulaTokens[i];
            let pCid = Number(parentCell.charCodeAt(0)) - 65;
            let pRid = Number(parentCell.slice(1)) - 1;
            let parentObj = sheetArr[pRid][pCid];
            let idx = parentObj.children.indexOf(myName);
            parentObj.children.splice(idx, 1);
        }
    }
}


// set value in UI/DB and formula in DB
function setCell(val, rid, cid, cFormula) {
    // UI 
    let uiCell = document.querySelector(`.grid .cell[rid="${rid}"][ cid="${cid}"]`);
    uiCell.innerHTML = val;
    // DB
    sheetArr[rid][cid].value = val;
    sheetArr[rid][cid].formula = cFormula;
}