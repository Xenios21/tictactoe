const audio = document.querySelector<HTMLAudioElement>('audio')!;
const muteButton = document.querySelector<HTMLButtonElement>('#mute')!;

export function startAudio(){
    audio.play();
}
export function bindMuteAudio(){
    muteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
    })
}

