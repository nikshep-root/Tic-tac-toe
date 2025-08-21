const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('.cell');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateStatus(message) {
    statusDisplay.innerHTML = message;
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = `<span class="${currentPlayer.toLowerCase()}">${currentPlayer}</span>`;
    clickedCell.style.transform = 'scale(1.1)';
    setTimeout(() => {
        clickedCell.style.transform = 'scale(1)';
    }, 100);
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`It's ${currentPlayer}'s turn`);
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            highlightWinningCells(winCondition);
            break;
        }
    }

    if (roundWon) {
        updateStatus(`Player ${currentPlayer} Wins!`);
        isGameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        updateStatus(`It's a Draw!`);
        isGameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    isGameActive = true;
    restartButton.textContent = 'Restart Game';
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    updateStatus(`It's ${currentPlayer}'s turn`);
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winning-cell');
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}

updateStatus(`It's ${currentPlayer}'s turn`);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
