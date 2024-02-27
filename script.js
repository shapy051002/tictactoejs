const boardSize = 3;

let currentPlayer = 'X';
let gameBoard = new Array(boardSize * boardSize).fill(null);
let winner = null;

const gameBoardElement = document.getElementById('game-board');
const statusElement = document.getElementById('status');

function initializeGame() {
    currentPlayer = 'X';
    gameBoard = new Array(boardSize * boardSize).fill(null);
    winner = null;

    renderGameBoard();
    updateStatus();
}

function renderGameBoard() {
    gameBoardElement.innerHTML = '';

    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        if (gameBoard[i] !== null) {
            cell.textContent = gameBoard[i];
        }

        cell.addEventListener('click', () => makeMove(i));

        gameBoardElement.appendChild(cell);
    }
}

function makeMove(index) {
    if (gameBoard[index] === null && winner === null) {
        gameBoard[index] = currentPlayer;
        checkWinner(index);
        togglePlayer();
        renderGameBoard();
        updateStatus();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(lastMove) {
    const row = Math.floor(lastMove / boardSize);
    const col = lastMove % boardSize;

    // Check row
    if (gameBoard[row * boardSize] === currentPlayer && gameBoard[row * boardSize + 1] === currentPlayer && gameBoard[row * boardSize + 2] === currentPlayer) {
        winner = currentPlayer;
        return;
    }

    // Check column
    if (gameBoard[col] === currentPlayer && gameBoard[col + boardSize] === currentPlayer && gameBoard[col + 2 * boardSize] === currentPlayer) {
        winner = currentPlayer;
        return;
    }

    // Check diagonal (if applicable)
    if ((row === col || row + col === boardSize - 1) &&
        ((gameBoard[0] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[8] === currentPlayer) ||
        (gameBoard[2] === currentPlayer && gameBoard[4] === currentPlayer && gameBoard[6] === currentPlayer))) {
        winner = currentPlayer;
        return;
    }

    // Check if the entire board is filled (draw)
    if (gameBoard.every(cell => cell !== null)) {
        winner = 'draw';
    }
}

function updateStatus() {
    if (winner) {
        if (winner === 'draw') {
            statusElement.textContent = `It's a draw!`;
        } else {
            statusElement.textContent = `Player ${winner} wins!`;
        }
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    initializeGame();
}

initializeGame();