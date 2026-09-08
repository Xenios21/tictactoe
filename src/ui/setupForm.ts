import type {Difficulty, GameMode, Player} from "../game/game.types.ts";
import type {GameSettings} from "./form.types.ts";

const overlay = document.querySelector<HTMLElement>('.setup-form-overlay')!;
const form = document.querySelector<HTMLFormElement>('#setup-form')!;

export function showSetup(current?: Partial<GameSettings>) {
    const username = localStorage.getItem('username');
    if(username){
        setField('username', username);
    }

    if(current?.size !== undefined){
        setField('size', String(current.size));
    }

    if(current?.difficulty !== undefined){
        setField('difficulty', String(current.difficulty));
    }

    if(current?.pawn !== undefined){
        setField('pawn', current.pawn);
    }

    if(current?.gameMode !== undefined){
        setRadio('mode', current.gameMode);
    }

    if(current?.username2 !== undefined){
        setField('username2', current.username2);
    }

    syncModeFields();
    overlay.classList.remove('hidden');
}

export function hideSetup(){
    overlay.classList.add('hidden');
}

export function bindSetupForm(onSubmit: (settings: GameSettings) => void) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const username = data.get('username') as string;
        localStorage.setItem('username', username);

        onSubmit({
            username,
            size: Number(data.get('size')),
            pawn: data.get('pawn') as Player,
            difficulty: data.get('difficulty') as Difficulty,
            gameMode: data.get('mode') as GameMode,
            username2: data.get('mode') === "duo" ? data.get('username2') as string : undefined,
        });
    });

    form.querySelectorAll<HTMLInputElement>('input[name="mode"]')
        .forEach((input) => input.addEventListener('change', syncModeFields));

}

export function bindSetupMenu(onOpen: () => void){
    document.querySelector<HTMLButtonElement>('#setup-menu')!.addEventListener('click', onOpen);
}

export function bindCloseMenu(onClose: () => void){
    form.querySelector<HTMLButtonElement>('#close-menu')!.addEventListener('click', onClose);
}

function setField(name: string, value: string){
    form.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${name}"]`)!.value = value;
}

function setRadio(name: string, value: string){
    form.querySelector<HTMLInputElement>(`[name="${name}"][value="${value}"]`)!.checked = true;
}

function syncModeFields(){
    const mode = form.querySelector<HTMLInputElement>('input[name="mode"]:checked')!.value;

    form.querySelectorAll<HTMLElement>('[data-mode]').forEach((field) => {
        field.classList.toggle('hidden', field.dataset.mode !== mode);
    })
}