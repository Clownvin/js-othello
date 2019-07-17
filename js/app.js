(() => {
  'use strict';
  const PLAYER_NONE = 0;
  const PLAYER_ONE = 1; //Black
  const PLAYER_TWO = 2; //White

  let boardState = [[]];

  //Only call this once!
  function createBoard() {
    let board = document.createElement('tbody');
    for (let y = 0; y < 8; y++) {
      boardState[y] = [];
      let row = document.createElement('tr');
      for (let x = 0; x < 8; x++) {
        boardState[y][x] = PLAYER_NONE;
        let piece = document.createElement('td');
        piece.id = `piece-${x}-${y}`;
        piece.classList.toggle('player-none', true);
        row.appendChild(piece);
      }
      board.appendChild(row);
    }
    let table = document.createElement('table');
    table.appendChild(board);
    return table;
  }

  function clearBoard() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        boardState[y][x] = PLAYER_NONE;
      }
    }
    //0 1 2 3 4
    boardState[4][4] = boardState[3][3] = PLAYER_TWO;
    boardState[4][3] = boardState[3][4] = PLAYER_ONE;
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
    let board = createBoard();
    let container = document.getElementById('othello-wrapper');
    container.appendChild(board);
    clearBoard();
    updateBoard();
  }

  setupBoard();

})();
