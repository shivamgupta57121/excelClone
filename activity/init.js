// initiall grid build
let columns = 26;
let rows = 100;
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let grid = document.querySelector(".grid");
for (let i = 0; i < columns; i++) {
    let div = document.createElement("div");
    // ASCII of A is 65
    // from char code used to get character from ASCII code
    div.innerText = String.fromCharCode(65 + i);
    div.setAttribute("class", "cell");
    topRow.appendChild(div);
}
for (let i = 1; i <= rows; i++) {
    let div = document.createElement("div");
    div.innerText = i;
    div.setAttribute("class", "block");
    leftCol.appendChild(div);
}
// rows-> 100
// col - > 26
let sheetArr = [];
for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    let rowArr = [];

    for (let j = 0; j < columns; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        // col.innerText = `${String.fromCharCode(65 + j)} ${i + 1}`;
        // to allow editing content of cell
        cell.setAttribute("contenteditable", "true")
        row.appendChild(cell);

        let cellObj = {
            isBold: false,
            isItalic: false,
            isUnderline: false,
            fontSize: 16,
            fontFamily: "sans-serif",
            color: "#000000",
            bgColor: "#90EE90",
            halign:"center"
        }
        rowArr.push(cellObj);
    }
    grid.appendChild(row);
    sheetArr.push(rowArr);
}