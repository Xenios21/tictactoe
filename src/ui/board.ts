import type {GameState} from "../game/game.types.ts";

function getBoard(): HTMLElement{
    return document.querySelector('#board')!;
}

export function renderBoard(boardSize: number, onCellClick: (index: number) => void) {
    const board = getBoard();
    board.style.setProperty('--size', String(boardSize));
    board.innerHTML = '';

    const totalBoardSize = boardSize * boardSize;

    for(let iCase = 0; iCase < totalBoardSize; iCase++){
        const cell = document.createElement('button');
        cell.className = 'cellGame';
        cell.dataset.index = String(iCase);
        cell.addEventListener('click', () => onCellClick(iCase));
        board.appendChild(cell);
    }
}

export function updateBoard(state: GameState){
    const cells = getBoard().querySelectorAll<HTMLButtonElement>('.cellGame');
    cells.forEach((cell,index) => {
        const value = state.board[index];

        cell.textContent = value ?? '';

        cell.classList.toggle('is-x', value === 'X');
        cell.classList.toggle('is-o', value === 'O');

        cell.classList.toggle('is-winning', state.winningCells.includes(index));

        cell.disabled = value !== null || state.status !== 'playing';
    })
}

