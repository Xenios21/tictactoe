import type {Difficulty, GameMode, Player} from "../game/game.types.ts";

export interface GameSettings{
    username: string;
    username2?: string;
    size: number;
    pawn: Player;
    difficulty: Difficulty;
    gameMode: GameMode;
}