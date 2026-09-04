import type {GameState, Player} from "./types/gameState.types.ts";

export function createGameState(size: number, firstPlayer: Player): GameState {
    return{
        board: Array(size * size).fill(null),
        size,
        winLength: size === 3 ? 3 :  4,
        currentPlayer: firstPlayer,
        status: 'playing',
        winner: null,
        winningCells: [],
    }
}


