console.log("view called")

function createCell(i){
    return   `<div class="cell" id="${i}"> </div>`
}

function colorCell(i, color){
    cellsHTML[i-1] =  `<div class="cell ${color}" id="${i}">${i%100}</div>`
}

function placePieceGetHTML(cellColor, id, pieceColor){
    return `<button class="pieceBtn cell ${cellColor}" id=${id} onclick='selectPiece(${id})'>
        <i class="fas fa-map-marker-alt  ${pieceColor}"></i>
        </button>`;
}

function placePieceGetHTML2(cellColor, id, pieceColor, cellColor2, id2, pieceColor2){
    return `<span class="fa-layers fa-fw" style="background:${cellColor}">
                <button class="pieceBtn cell" id=${id} onclick='selectPiece(${id})'>
                <i class="fas fa-circle  ${pieceColor}"></i>
                </button>
                <button class="pieceBtn cell" id=${id} onclick='selectPiece(${id})'>
                <i class="fas fa-circle  ${pieceColor}" data-fa-transform = "shrink-3"></i>
                </button>
        </span>`;
}

function getDiceButtonHTML(color, disabled){
    let buttonType;
    disabledText = '';
    if (disabled) {disabledText = 'disabled' }
    if (color === 'blue') {buttonType = 'primary'}
    else if (color === 'yellow') {buttonType = 'warning'}
    else if (color === 'red') {buttonType = 'danger'}
    else if (color === 'green') {buttonType = 'success'}
    return `<button type="button" class="btn btn-${buttonType} btn-sm" id="button"  ${disabledText}
            onclick="activateTurn()">    
        </button>`
}

function getDiceIcon(num){
    if (num !== 7) {return `<div> <img src="img/d${num}.png" width=25px height=25px/></div>`}
    else {return `<div> <img src="img/d${num}.gif" width=25px height=25px/></div>`}
}

function render(){
    gameEl.innerHTML = cellsHTML.join(" ");
    diceEl.innerHTML = diceHTML.join(" ");
}
