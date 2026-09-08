import type {GameState, Player} from "./game.types.ts";

export function createGameState(size: number, firstPlayer: Player, score: Record<Player, number> = {X: 0, O: 0}): GameState {
    return{
        board: Array(size * size).fill(null),
        size,
        score,
        winLength: size === 3 ? 3 :  4,
        currentPlayer: firstPlayer,
        status: 'playing',
        winner: null,
        winningCells: [],
    }
}


