import {renderBoard, updateBoard} from "./ui/board.ts";
import type {GameState, Player} from "./game/game.types.ts";
import {createGameState} from "./game/gameState.ts";
import {playMove} from "./game/game.ts";
import {bindEndScreenEvents, closeEndScreen, renderEndScreen} from "./ui/endScreen.ts";
import {chooseAiMove} from "./game/ai.ts";
import {bindCloseMenu, bindSetupForm, bindSetupMenu, hideSetup, showSetup} from "./ui/setupForm.ts";
import type {GameSettings} from "./ui/form.types.ts";
import {bindMuteAudio, startAudio} from "./ui/audio.ts";
import {addHistory, bindRemoveHistory, renderHistory} from "./ui/history.ts";
import {renderScore} from "./ui/scoreView.ts";

const AI_DELAY = 400;

let state: GameState;
let usernames: Record<Player, string>;
let aiTimer: number | undefined;
let currentSettings: GameSettings;

function initGame(settings: GameSettings, keepScore: boolean){
    clearTimeout(aiTimer);

    currentSettings = settings;

    const opponentName = settings.gameMode === 'duo'
        ? (settings.username2 || 'Joueur 2')
        : 'AI';

    if(settings.pawn === 'X'){
        usernames = {X: settings.username, O: opponentName};
    }else{
        usernames = {X: opponentName, O: settings.username};
    }

    const previousScore = keepScore ? state.score : undefined;

    state = createGameState(settings.size, settings.pawn, previousScore);
    renderBoard(settings.size, handleCellClick);
    renderScore(state.score, usernames);
    renderHistory();
    render();

    if(settings.gameMode === "solo" && state.currentPlayer !== currentSettings.pawn){
        aiTimer = window.setTimeout(playAiTurn, AI_DELAY);
    }
}

function restartGame(){
    initGame(currentSettings,true);
}

function openSetup(){
    closeEndScreen();
    showSetup(currentSettings);
}

function render(){
    updateBoard(state);
    renderEndScreen(state, usernames);
}

function applyMove(index: number){
    const wasPlaying = state.status === 'playing';

    state = playMove(state, index);
    render();

    if(wasPlaying && state.status !== 'playing'){
        addHistory(state,usernames);
        renderScore(state.score, usernames);
        renderHistory();
    }
}

function handleCellClick(index: number){
    if(state.status !== 'playing'){
        return;
    }

    if(currentSettings.gameMode === 'solo' && state.currentPlayer !== currentSettings.pawn){
        return;
    }

    applyMove(index);

    if(currentSettings.gameMode === 'solo' && state.status === 'playing'){
        aiTimer = window.setTimeout(playAiTurn, AI_DELAY);
    }
}
function playAiTurn(){
    if(state.status !== 'playing'){
        return;
    }

    applyMove(chooseAiMove(state, currentSettings.difficulty));
}

bindSetupForm((settings) => {
    initGame(settings,false);
    startAudio();
    hideSetup();
})

bindSetupMenu(openSetup);
bindCloseMenu(hideSetup);
bindEndScreenEvents(restartGame, openSetup);
bindMuteAudio();
bindRemoveHistory();
showSetup();
