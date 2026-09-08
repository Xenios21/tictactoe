import type {Player} from "./game.types.ts";

export function incrementScore(score: Record<Player, number>, winner: Player): Record<Player, number>{
    return {
        ...score,
        [winner]: score[winner] + 1,
    }
}
