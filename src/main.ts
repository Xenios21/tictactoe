import {renderBoard, updateBoard} from "./board.js";
import type {GameState, Player} from "./types/gameState.types.ts";
import {createGameState} from "./gameState.js";
import {playMove} from "./game.js";
import {bindEndScreenEvents, closeEndScreen, renderEndScreen} from "./endScreen.js";
import {chooseAiMove} from "./ai.js";
import {bindSetupForm, hideSetup, showSetup} from "./setupForm.js";
import type {GameSettings} from "./types/gameForm.types.ts";

const AI_DELAY = 400;

let state: GameState;
let usernames: Record<Player, string>
let aiTimer: number | undefined;
let currentSettings: GameSettings;

function initGame(settings: GameSettings){
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
    state = createGameState(settings.size, 'X');
    renderBoard(settings.size, handleCellClick);
    render();

    if(settings.gameMode === "solo"){
        if(state.currentPlayer !== currentSettings.pawn){
            aiTimer = window.setTimeout(playAiTurn, AI_DELAY);
        }
    }
}

function restartGame(){
    initGame(currentSettings);
}

function openSetup(){
    closeEndScreen();
    showSetup(currentSettings);
}

function render(){
    updateBoard(state);
    renderEndScreen(state, usernames);
}

function handleCellClick(index: number){
    if(state.status !== 'playing'){
        return;
    }

    if(currentSettings.gameMode === 'solo' && state.currentPlayer !== currentSettings.pawn){
        return;
    }

    state = playMove(state, index);
    render();

    if(currentSettings.gameMode === 'solo'){
        if(state.status === 'playing'){
            aiTimer =window.setTimeout(playAiTurn, AI_DELAY);
        }
    }
}

function playAiTurn(){
    if(state.status !== 'playing'){
        return;
    }

    state = playMove(state, chooseAiMove(state,currentSettings.difficulty));
    render();
}


bindSetupForm((settings) => {
    initGame(settings);
    hideSetup();
})

bindEndScreenEvents(restartGame, openSetup);

showSetup();
