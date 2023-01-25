/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// const WIDTH = 7;
// const HEIGHT = 6;

// let currPlayer = 1;  active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

class Player {
  constructor(color) {
    this.color = color
  }
}

  const form = document.querySelector('form')
  form.addEventListener('submit', function(evt) {
    evt.preventDefault()
    board = []
     
            const boardT = Array.from(document.querySelector('#board').children)
            boardT.forEach((elem) => elem.remove())
      //       new Game(this.height, this.width)
      //     }
  const color1 = document.querySelector('#P1').value
  const color2 = document.querySelector('#P2').value
  let P1 = new Player(color1)
  let P2 = new Player(color2)
  return new Game(P1,P2)
})
// }



class Game {
  constructor(P1, P2, height = 6, width = 7) {
    this.height = height,
    this.width = width,
    this.players = [P1, P2],
    this.currPlayer = this.players[0],
    this.makeBoard(),
    this.makeHtmlBoard(),
    this.gameOver = false
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      board.push(Array.from({ length: this.width }));
    }
    return board
  }

  makeHtmlBoard() {
    const click = this.handleClick.bind(this)
    const board = document.getElementById('board')
    const top = document.createElement('tr');
      top.setAttribute('id', 'column-top');
      top.addEventListener('click', click);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    board.append(top);
  // make main part of board
  for (let y = 0; y < this.height; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.width; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    // const color = this.currPlayer.color;
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
  }

  handleClick(evt) {
    if(!this.gameOver){
    const top = document.querySelector('#column-top')
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      this.gameOver = true;
      return this.endGame('Tie!');
    }
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    if(this.gameOver) {
      top.style.pointerEvents = "none";
    }
  }}

  checkForWin() {
    function _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          board[y][x] === this.currPlayer
      );
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win.call(this,horiz) || _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) {
          return true;
        }
      }
    }
  }
}
  
