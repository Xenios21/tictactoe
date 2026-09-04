export type Player = 'X' | 'O';
export type Cell = Player | null;
export type GameStatus = 'playing' | 'win' | 'draw';
export type Difficulty = 'easy' | 'normal';
export type GameMode = 'solo' | 'duo';

export interface GameState {
    board: Cell[];
    size: number;
    winLength: number;
    currentPlayer: Player;
    status: GameStatus;
    winner: Player | null;
    winningCells: number[];
}

