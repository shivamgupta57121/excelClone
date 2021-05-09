// initiall grid build
let columns = 26;
let rows = 100;
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let grid = document.querySelector(".grid");
for(let i = 0 ; i < columns ; i++){
    let div = document.createElement("div");
    // ASCII of A is 65
    // from char code used to get character from ASCII code
    div.innerText = String.fromCharCode(65 + i);
    div.setAttribute("class","cell");
    topRow.appendChild(div);
}
for(let i = 1 ; i <= rows ; i++){
    let div = document.createElement("div");
    div.innerText = i;
    div.setAttribute("class","block");
    leftCol.appendChild(div);
}
for(let i = 1 ; i <= rows ; i++){
    let row = document.createElement("div");
    row.setAttribute("class","row");
    for(let j = 0 ; j < columns ; j++){
        let div = document.createElement("div");
        div.innerText = `${i} ${String.fromCharCode(65 + j)}`;
        div.setAttribute("class","cell");
        row.appendChild(div);
    }
    grid.appendChild(row);
}