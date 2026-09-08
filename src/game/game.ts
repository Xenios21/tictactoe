import type {Cell, GameState, MoveResult, Player} from "./game.types.ts";
import {incrementScore} from "./score.ts";

export const DIRECTIONS = [
    [0,1],
    [1,0],
    [1,1],
    [1,-1],
] as const;

export function playMove(state: GameState, index: number): GameState{
    if(state.status !== 'playing'){
        return state;
    }

    if(state.board[index] !== null){
        return state;
    }

    const board = [...state.board];
    board[index] = state.currentPlayer;

    const result = checkWin(board, state.size, state.winLength, index);

    return {
        ...state,
        board,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        score: result.status === 'win' ? incrementScore(state.score, result.winner!) : state.score,
        status: result.status,
        winner: result.winner,
        winningCells: result.winningCells,
    };
}

function collectLine(
    board: Cell[],
    size: number,
    index: number,
    dRow: number,
    dCol: number,
): number[]{

    const player = board[index];
    const cells = [index];

    const startRow = Math.floor(index / size);
    const startCol = index % size;

    for (const sign of [1, -1]){
        let row = startRow + dRow * sign;
        let col = startCol + dCol * sign;

        while(
                row >= 0 && row < size &&
                col >= 0 && col < size &&
                board[row * size + col] === player
            ){

            cells.push(row * size + col);
            row += dRow * sign;
            col += dCol * sign;
        }
    }

    return cells;
}


function checkWin(board: Cell[], size: number, winLength: number, index: number): MoveResult{
    for (const [dRow, dCol] of DIRECTIONS){
        const cells = collectLine(board,size,index,dRow, dCol);

        if(cells.length >= winLength){
            return {
                status : 'win',
                winner: board[index] as Player,
                winningCells: cells.sort((a,b) => a - b),
            };
        }
    }

    if(board.every((cell) => cell !== null)){
        return {status: "draw", winner: null, winningCells: []};
    }

    return {status: 'playing',  winner: null, winningCells: []};
}
