const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameActive = true;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const combination of winningCombination) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent &&
            cells[a].textContent !== ''
        ) {
            gameActive = false;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return true;
        }
    }
    return false;
};

const checkTie = () => {
    let isTie = true;
    cells.forEach(cell => {
        if (cell.textContent === '') {
            isTie = false;
            return;
        }
    });
    return isTie;
};

const handleCellClick = (e) => {
    const cell = e.target;
    const index = parseInt(cell.dataset.cellIndex);
    
    if (cell.textContent === '' && gameActive) {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            gameActive = false;
            return;
        }
        if (checkTie()) {
            gameActive = false;
            return;
        }
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    gameActive = true;
    currentPlayer = 'X';
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
