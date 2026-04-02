import { settings } from './Settings.js';
import { camera } from './main.js';

export class SettingsMenu {
    constructor() {
        this.settingsEl = document.querySelector('#settings');
        this.menuEl     = document.querySelector('#menu');

        this.fpsInput    = document.querySelector('#fps-input');
        this.sensInput   = document.querySelector('#sens-input');
        this.fovInput    = document.querySelector('#fov-input');
        this.volInput    = document.querySelector('#vol-input');
        this.showFpsInput = document.querySelector('#show-fps-input');

        this.#applyInitialValues();
        this.#bindEvents();
    }

    #applyInitialValues() {
        this.fpsInput.value      = settings.get('fpsCap');
        this.sensInput.value     = settings.get('sensitivity');
        this.fovInput.value      = settings.get('fov');
        this.volInput.value      = settings.get('volume');
        this.showFpsInput.checked = settings.get('showFps');

        camera.fov = settings.get('fov');
        camera.updateProjectionMatrix();
    }

    #bindEvents() {
        this.fpsInput.addEventListener('change', () => {
            const val = parseInt(this.fpsInput.value) || 0;
            settings.set('fpsCap', val);
        });

        this.sensInput.addEventListener('change', () => {
            const val = parseFloat(this.sensInput.value) || 1.0;
            settings.set('sensitivity', val);
        });

        this.fovInput.addEventListener('change', () => {
            const val = Math.min(120, Math.max(50, parseInt(this.fovInput.value) || 75));
            this.fovInput.value = val;
            settings.set('fov', val);
            camera.fov = val;
            camera.updateProjectionMatrix();
        });

        this.volInput.addEventListener('change', () => {
            const val = parseFloat(this.volInput.value) ?? 0.5;
            settings.set('volume', val);
        });

        this.showFpsInput.addEventListener('change', () => {
            const val = this.showFpsInput.checked;
            settings.set('showFps', val);
            document.querySelector('#fps-counter').style.display = val ? 'block' : 'none';
        });

        document.querySelector('#settings-btn').addEventListener('click', () => {
            this.menuEl.classList.add('hidden');
            this.settingsEl.classList.remove('hidden');
        });

        document.querySelector('#settings-back-btn').addEventListener('click', () => {
            this.settingsEl.classList.add('hidden');
            this.menuEl.classList.remove('hidden');
        });
    }
}