import type {GameState, Player} from "../game/game.types.ts";

const STORAGE_KEY = 'history';

export function getHistory(): string[]{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
}

export function addHistory(state: GameState, usernames: Record<Player, string>){
    const entry = state.winner ? usernames[state.winner] : 'DRAW';
    const history = [entry, ...getHistory()].slice(0,10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function renderHistory(){
    const list = document.querySelector<HTMLUListElement>('#history')!;
    list.innerHTML = '';
    getHistory().forEach((entry) => {
        const li = document.createElement('li');
        li.textContent = entry === 'DRAW' ? 'Match nul' : `${entry} a gagné`;
        list.appendChild(li);
    })
}

export function bindRemoveHistory() {
    const buttonDelete = document.querySelector<HTMLButtonElement>('#delete-history')!;
    buttonDelete.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        renderHistory();
    })
}
