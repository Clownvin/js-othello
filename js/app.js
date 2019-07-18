(() => {
  'use strict';
  const NONE = 'none';
  const BLACK = 'black';
  const WHITE = 'white';
  const DIRECTIONS = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]];

  let boardState = [[]];
  let currentPlayer = BLACK;
  let move = 0;

  function putPiece(x, y) {
    if (boardState[y][x] !== NONE) {
      return; //That piece is already placed.
    }
    //Flip pieces in each of the 8 directions, only if the adjacent piece is not owned.
    let found = false;
    DIRECTIONS.forEach((direction) => {
      if (flipPieces(x, y, direction[0], direction[1])) {
        found = true;
      }
    });
    if (!found) {
      return;
    }
    boardState[y][x] = currentPlayer;
    updatePiece(x, y);
    move++;
    if (move === 60 || (!hasMove(BLACK) && !hasMove(WHITE))) { //End conditions.
      let s = score();
      if (s.black > s.white) {
        alert(`Black wins, ${s.black} to ${s.white}!`);
      } else if (s.black === s.white) {
        alert('It\'s a tie!');
      } else {
        alert(`White wins, ${s.white} to ${s.black}!`);
      }
      resetBoard();
      return;
    }
    if (currentPlayer === BLACK && hasMove(WHITE)) {
      currentPlayer = WHITE;
      console.log('White\'s turn');
    } else {
      currentPlayer = BLACK;
      console.log('Black\'s turn');
    }
  }

  function score() {
    let black = 0;
    let white = 0;
    boardState.forEach((row) => {
      row.forEach((state) => {
        if (state === BLACK) {
          black++;
        }
        if (state === WHITE) {
          white++;
        }
      });
    });
    return {black: black, white: white};
  }

  function hasMove(player) {
    let found = false;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (boardState[y][x] !== NONE) {
          continue;
        }
        DIRECTIONS.forEach((direction) => {
          if (walkPath(player, x, y, direction[0], direction[1]).canWalk) {
            found = true;
          }
        });
        if (found) {
          return true;
        }
      }
    }
    return false;
  }

  function walkPath(player, startX, startY, dirX, dirY) {
    let x = startX + dirX;
    let y = startY + dirY;
    if (x < 0 || y < 0 || x > 7 || y > 7 || boardState[y][x] === player) {
      return { canWalk: false, x: x, y: y };
    }
    for(; x >= 0 && y >= 0 && x < 8 && y < 8 && boardState[y][x] !== NONE; x += dirX, y += dirY) {
      if (boardState[y][x] === player) {
        return { canWalk: true, x: x, y: y };
      }
    }
    return { canWalk: false, x: x, y: y };
  }

  function flipPieces(startX, startY, dirX, dirY) {
    let results = walkPath(currentPlayer, startX, startY, dirX, dirY);
    if (!results.canWalk) {
      return false;
    }
    for(let x = results.x, y = results.y; x !== startX || y !== startY; x -= dirX, y -= dirY) {
      boardState[y][x] = currentPlayer;
      updatePiece(x, y);
    }
    return true;
  }

  //Only call this once!
  function createBoard(parent) {
    for (let y = 0; y < 8; y++) {
      boardState[y] = [];
      for (let x = 0; x < 8; x++) {
        boardState[y][x] = NONE;
        let piece = document.createElement('div');
        piece.id = `piece-${x}-${y}`;
        piece.classList.toggle(NONE, true);
        piece.addEventListener('click', () => putPiece(x, y));
        parent.appendChild(piece);
      }
    }
  }

  function resetBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        boardState[y][x] = NONE;
      }
    }
    boardState[4][4] = boardState[3][3] = WHITE;
    boardState[4][3] = boardState[3][4] = BLACK;
    currentPlayer = BLACK;
    move = 0;
    updateBoard();
  }

  function updatePiece(x, y) {
    let piece = document.getElementById(`piece-${x}-${y}`);
    piece.classList.toggle(NONE, false);
    piece.classList.toggle(BLACK, false);
    piece.classList.toggle(WHITE, false);
    piece.classList.toggle(boardState[y][x]);
  }

  function updateBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        updatePiece(x, y);
      }
    }
  }

  //Only call this once!
  function setupBoard() {
    let container = document.getElementById('othello-container');
    createBoard(container);
    resetBoard();
  }

  setupBoard();
})();
