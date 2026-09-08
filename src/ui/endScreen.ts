import type {GameState, Player} from "../game/game.types.ts";

const dialog = document.querySelector<HTMLDialogElement>('#end-screen')!;

export function renderEndScreen(state: GameState, usernames: Record<Player, string>){
    const message = dialog.querySelector('.end-message')!;

    if(state.status === 'playing'){
        dialog.close();
        return;
    }

    message.textContent = state.winner
        ? `${usernames[state.winner]} a gagné !`
        : 'Match nul';

    message.classList.toggle('is-x', state.winner === 'X');
    message.classList.toggle('is-o', state.winner === 'O');

    dialog.showModal();
}

export function closeEndScreen() {
    dialog.close();
}

export function bindEndScreenEvents(onRestart: () => void, onNewGame: () => void) {
    dialog.querySelector('.restart-dialog')?.addEventListener('click', onRestart);
    dialog.querySelector('.new-game-dialog')?.addEventListener('click', onNewGame);
}