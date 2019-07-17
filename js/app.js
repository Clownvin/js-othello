(() => {
  'use strict';
  const PLAYER_NONE = 0;
  const PLAYER_ONE = 1; //Black
  const PLAYER_TWO = 2; //White

  let boardState = [[]];
  let currentPlayer = 0;

  function putPiece(x, y) {
    console.log('Doing put piece');
    if (boardState[y][x] !== PLAYER_NONE) {
      return; //That piece is already placed.
    }
    //Flip pieces in each of the 8 directions, only if the adjacent piece is not owned.
    let directions = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]];
    let found = false;
    directions.forEach((direction) => {
      if (flipPieces(x, y, direction[0], direction[1])) {
        found = true;
      }
    });
    if (!found) {
      return;
    }
    boardState[y][x] = currentPlayer;
    if (currentPlayer === PLAYER_ONE) {
      currentPlayer = PLAYER_TWO;
    } else {
      currentPlayer = PLAYER_ONE;
    }
    updateBoard();
  }

  function checkPath(player, startX, startY, dirX, dirY) {
    let x = startX + dirX;
    let y = startY + dirY;
    if (boardState[y][x] === currentPlayer) {
      return false;
    }
    for(; x >= 0 && y >= 0 && x < 8 && y < 8; x += dirX, y += dirY) {
      if (boardState[y][x] === currentPlayer) {
        return true;
      }
    }
    return false;
  }

  function flipPieces(startX, startY, dirX, dirY) {
    let found = false;
    //Beefiest for-loop ever...
    let x = startX + dirX;
    let y = startY + dirY;
    if (boardState[y][x] === currentPlayer) {
      return false;
    }
    for(; x >= 0 && y >= 0 && x < 8 && y < 8; x += dirX, y += dirY) {
      if (boardState[y][x] === currentPlayer) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
    for(; x !== startX || y !== startY; x -= dirX, y -= dirY) {
      boardState[y][x] = currentPlayer;
    }
    return true;
  }

  //Only call this once!
  function createBoard(parent) {
    for (let y = 0; y < 8; y++) {
      boardState[y] = [];
      for (let x = 0; x < 8; x++) {
        boardState[y][x] = PLAYER_NONE;
        let piece = document.createElement('div');
        piece.id = `piece-${x}-${y}`;
        piece.classList.toggle('player-none', true);
        piece.addEventListener('click', () => putPiece(x, y));
        parent.appendChild(piece);
      }
    }
  }

  function resetBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        boardState[y][x] = PLAYER_NONE;
      }
    }
    boardState[4][4] = boardState[3][3] = PLAYER_TWO;
    boardState[4][3] = boardState[3][4] = PLAYER_ONE;
    currentPlayer = PLAYER_ONE;
  }

  function updateBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let piece = document.getElementById(`piece-${x}-${y}`);
        switch (boardState[y][x]) {
          case PLAYER_NONE:
          piece.classList.toggle('player-none', true);
          piece.classList.toggle('player-one', false);
          piece.classList.toggle('player-two', false);
          break;
          case PLAYER_ONE:
          piece.classList.toggle('player-none', false);
          piece.classList.toggle('player-one', true);
          piece.classList.toggle('player-two', false);
          break;
          case PLAYER_TWO:
          piece.classList.toggle('player-none', false);
          piece.classList.toggle('player-one', false);
          piece.classList.toggle('player-two', true);
          break;
          default:
          console.log('Unexpected board state: '+boardState[y][x]);
        }
      }
    }
  }

  //Only call this once!
  function setupBoard() {
    let container = document.getElementById('othello-container');
    createBoard(container);
    resetBoard();
    updateBoard();
  }

  setupBoard();

})();
