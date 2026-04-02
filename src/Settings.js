export class Settings {
    #data = {
        fpsCap: 0,
        sensitivity: 1.0,
        fov: 90,
        volume: 0.5,
        showFps: false,
    };

    constructor() {
        this.#load();
    }

    get(key) {
        return this.#data[key];
    }

    set(key, value) {
        this.#data[key] = value;
        this.#save();
    }

    #load() {
        try {
            const saved = JSON.parse(localStorage.getItem('aimtrainer-settings'));
            if (saved) this.#data = { ...this.#data, ...saved };
        } catch {
        }
    }

    #save() {
        localStorage.setItem('aimtrainer-settings', JSON.stringify(this.#data));
    }
}

export const settings = new Settings();