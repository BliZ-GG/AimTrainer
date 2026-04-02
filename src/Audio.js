import { settings } from './Settings.js';
import shootUrl from './Shoot.ogg';
import hitUrl from './Hit.ogg';

export class Audio {
    #shoot = new window.Audio(shootUrl);
    #hit   = new window.Audio(hitUrl);

    #applyVolume(sound) {
        sound.volume = settings.get('volume');
        return sound;
    }

    playShoot() {
        const s = this.#shoot.cloneNode();
        this.#applyVolume(s).play();
    }

    playHit() {
        const s = this.#hit.cloneNode();
        this.#applyVolume(s).play();
    }
}

export const audio = new Audio();