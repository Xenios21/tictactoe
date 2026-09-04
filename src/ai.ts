import type {Difficulty, GameState, Player} from "./types/gameState.types.ts";
import {playMove} from "./game.js";



export function chooseAiMove(state: GameState, difficulty: Difficulty): number {
    const ai = state.currentPlayer;
    const human: Player = ai === 'X' ? 'O' : 'X';
    switch (difficulty) {
        case "easy": return chooseEasyMove(state);
        case "normal": return chooseNormalMove(state, ai, human);
    }
}

function getEmptyCells(state: GameState): number[]{
    const cells: number[] = [];
    state.board.forEach((cell,index) => {
        if(cell === null){
            cells.push(index);
        }
    });

    return cells;
}

function pickRandom(cells: number[]): number{
    return cells[Math.floor(Math.random() * cells.length)];
}

function findWinningMove(state: GameState, player: Player): number | null{
    for (const index of getEmptyCells(state)){
        const simulated = playMove({...state, currentPlayer: player}, index);

        if(simulated.status === 'win' && simulated.winner === player){
            return index;
        }
    }
    return null;
}

function chooseEasyMove(state: GameState): number{
    return pickRandom(getEmptyCells(state));
}

function chooseNormalMove(state: GameState, ai:Player, human:Player): number{
    return findWinningMove(state, ai)
    ?? findWinningMove(state, human)
    ?? pickRandom(getEmptyCells(state));
}