// Fetching the elements
let gameEl = document.querySelector("#board");
let diceEl = document.querySelector("#dice");

// Creating all cells
let cellsHTML = []
for (let i=1; i<=225; i++) {
    cellsHTML.push(createCell(i));
} 

// Defining cell colors
let green = [1,2,3,4,5,6,16,21,31,36,46,51,61,66,76,76,77,78,79,80, 81];
let red = green.map(i => i + 9);
let yellow = green.map(i => i + 135);
let blue = green.map(i => i+ 144);
let black = [97, 99, 127, 129, 113];
let greenPath = [92, 107, 108, 109, 110, 111, 112];
let redPath = [23, 38, 53, 68, 83, 98, 24];
let yellowPath = [202, 203, 188, 173, 158, 143, 128];
let bluePath = [134, 119, 118, 117, 116, 115, 114];

// Function to return cell color
function getColor(i) {
    if (green.includes(i) || greenPath.includes(i)){ return "green" }
    else if (red.includes(i) || redPath.includes(i)){ return "red" }
    else if (yellow.includes(i) || yellowPath.includes(i)){ return "yellow" }
    else if (blue.includes(i) || bluePath.includes(i)){ return "blue" }
    else if (black.includes(i)) { return"black" }
    else {return "white"}   
}

// Coloring cells
for (let i=1; i<=225; i++) {
    colorCell(i, getColor(i))
}

// Path traversal order
let pathOrder = [217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 219, 
                    217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 219];

// Number of pieces in house
let piecesInHouse = {
    'greenpiece':4,
    'redpiece':4,
    'yellowpiece':4,
    'bluepiece':4
}

// Piece class
class piece { 
    constructor(housePosition, pieceColor, home){
        this.housePosition = housePosition;
        this.position = housePosition;
        this.color = pieceColor;
        this.inHouse = this.position === this.housePosition;
        this.home = home;
    }

    // Place piece at cell i
    placePiece =  function(i){
        cellsHTML[i-1] = placePieceGetHTML(getColor(i), i, this.color);
        this.position = i;
    }

    // Move piece to cell j
    movePiece = function (j){
        let i = this.position;
        cellsHTML[i-1] =  placePieceGetHTML(getColor(i), i, getColor(i));
        cellsHTML[j-1] =  placePieceGetHTML(getColor(j), j, this.color);
        this.position = j;
    }

    // Remove piece from home
    removeFromHome = function(){
        if (this.position !== this.housePosition) {alert("Piece not in house")}
        else {this.movePiece(this.home)}
        this.inHouse = false;
        if (piecesInHouse[this.color]>0) {piecesInHouse[this.color]-=1;}
    }

    // Move piece function
    move = function(byNum){
        console.log(this)
        if (this.inHouse) {
            if(byNum === 6) {this.removeFromHome()}
            else {turn.complete = true}
        }
        else {
            let nextCell;
            for (let i =0; i<pathOrder.length; i++){
                if (pathOrder[i] === this.position) {
                    nextCell = pathOrder[i+ byNum];
                    break;
                }
            }
            this.movePiece(nextCell);
        }
        console.log(this)
    }
}

// Turn object
let turn = {
    color: "blue",
    rolledNumber: 0,
    complete: false
}

// Placing all 16 pieces
let g1 = new piece(33, "greenpiece", 92); g1.placePiece(g1.housePosition);
let g2 = new piece(34, "greenpiece", 92); g2.placePiece(g2.housePosition);
let g3 = new piece(48, "greenpiece", 92); g3.placePiece(g3.housePosition);
let g4 = new piece(49, "greenpiece", 92); g4.placePiece(g4.housePosition);

let r1 = new piece(42, "redpiece", 24); r1.placePiece(r1.housePosition);
let r2 = new piece(43, "redpiece", 24); r2.placePiece(r2.housePosition);
let r3 = new piece(57, "redpiece", 24); r3.placePiece(r3.housePosition);
let r4 = new piece(58, "redpiece", 24); r4.placePiece(r4.housePosition);

let y1 = new piece(168, "yellowpiece", 202); y1.placePiece(y1.housePosition);
let y2 = new piece(169, "yellowpiece", 202); y2.placePiece(y2.housePosition);
let y3 = new piece(183, "yellowpiece", 202); y3.placePiece(y3.housePosition);
let y4 = new piece(184, "yellowpiece", 202); y4.placePiece(y4.housePosition);

let b1 = new piece(177, "bluepiece", 134); b1.placePiece(b1.housePosition);
let b2 = new piece(178, "bluepiece", 134); b2.placePiece(b2.housePosition);
let b3 = new piece(192, "bluepiece", 134); b3.placePiece(b3.housePosition);
let b4 = new piece(193, "bluepiece", 134); b4.placePiece(b4.housePosition);

// Testing multi pieces stacking for showing multiple pieces on same box
// cellsHTML[91] = placePieceGetHTML2(getColor(91), 91, g1.color, getColor(91), 91, g2.color);

// Dice
let diceHTML = [];
initDice();

// Display blank dice at the start of the game
function initDice(){
    diceHTML.push(getDiceButtonHTML('blue', false));
    diceHTML.push(getDiceIcon(0));
    render();
}

// Change the dice turn
function activateTurn(){

    // Recording the start of a new turn
    turn.complete = false;
    
    // Display rolling dice gif
    diceHTML[1] = getDiceIcon(7);
    render();

    // Sample random number and display it
    let rolledNumber = Math.floor(Math.random()*6)+1;
    turn.rolledNumber = rolledNumber;
    diceHTML[1] = getDiceIcon(rolledNumber);
    // Disable dice button
    diceHTML[0] = getDiceButtonHTML(turn.color, true);
    console.log(turn);
    
    // Keep the dice rolling for 1 sec
    setTimeout(() => {  render(); }, 200);

    if (turn.rolledNumber !== 6 && piecesInHouse[turn.color+'piece']===4){
        setTimeout(() => {  finishTurn(); }, 1000);
    }
}

function selectPiece(i){
    console.log('selected piece at ',i);
    if (turn.complete) { alert('Roll the dice')}
    else{
        if (turn.color === 'green') {
            if (g1.position === i && (!g1.inHouse || turn.rolledNumber===6) ) {g1.move(turn.rolledNumber) ; finishTurn();}
            else if (g2.position === i && (!g2.inHouse || turn.rolledNumber===6)) {g2.move(turn.rolledNumber); finishTurn();}
            else if (g3.position === i && (!g3.inHouse || turn.rolledNumber===6)) {g3.move(turn.rolledNumber); finishTurn();}
            else if (g4.position === i && (!g4.inHouse || turn.rolledNumber===6)) {g4.move(turn.rolledNumber); finishTurn();}
        }
        if (turn.color === 'red') {
            if (r1.position === i && (!r1.inHouse || turn.rolledNumber===6)) {r1.move(turn.rolledNumber) ; finishTurn();}
            else if (r2.position === i && (!r2.inHouse || turn.rolledNumber===6)) {r2.move(turn.rolledNumber); finishTurn();}
            else if (r3.position === i && (!r3.inHouse || turn.rolledNumber===6)) {r3.move(turn.rolledNumber); finishTurn();}
            else if (r4.position === i && (!r4.inHouse || turn.rolledNumber===6)) {r4.move(turn.rolledNumber); finishTurn();}
        }
        if (turn.color === 'yellow') {
            if (y1.position === i && (!y1.inHouse || turn.rolledNumber===6)) {y1.move(turn.rolledNumber) ; finishTurn();}
            else if (y2.position === i && (!y2.inHouse || turn.rolledNumber===6)) {y2.move(turn.rolledNumber); finishTurn();}
            else if (y3.position === i && (!y3.inHouse || turn.rolledNumber===6)) {y3.move(turn.rolledNumber); finishTurn();}
            else if (y4.position === i && (!y4.inHouse || turn.rolledNumber===6)) {y4.move(turn.rolledNumber); finishTurn();}
        }
        if (turn.color === 'blue') {
            if (b1.position === i && (!b1.inHouse || turn.rolledNumber===6)) {b1.move(turn.rolledNumber) ; finishTurn();}
            else if (b2.position === i && (!b2.inHouse || turn.rolledNumber===6)) {b2.move(turn.rolledNumber); finishTurn();}
            else if (b3.position === i && (!b3.inHouse || turn.rolledNumber===6)) {b3.move(turn.rolledNumber); finishTurn();}
            else if (b4.position === i && (!b4.inHouse || turn.rolledNumber===6)) {b4.move(turn.rolledNumber); finishTurn();}
        }
    }
    console.log('pass turn');
}

let nextTurn = {
    'blue': 'yellow',
    'yellow': 'green',
    'green': 'red',
    'red': 'blue'
}

function finishTurn(){
    if (turn.rolledNumber === 6) {
        diceHTML[0] = getDiceButtonHTML(turn.color, false)    
    }
    else {
        // diceHTML[0] = getDiceButtonHTML(turn.color, false);
        diceHTML[0] = getDiceButtonHTML(nextTurn[turn.color], false);
        turn.color = nextTurn[turn.color];
        turn.complete = true;
    }
    render();
}


render();