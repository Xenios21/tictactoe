import type {Player} from "../game/game.types.ts";

export function renderScore(score: Record<Player, number>, usernames: Record<Player, string>) {
    const score1 = document.querySelector<HTMLParagraphElement>('#score-player1')!;
    const score2 = document.querySelector<HTMLParagraphElement>('#score-player2')!;

    score1.textContent = `${usernames.X} : ${score.X}`;
    score2.textContent = `${usernames.O} : ${score.O}`;
}