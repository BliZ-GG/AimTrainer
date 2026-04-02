import { FlickLevel } from './FlickLevel.js';
import { TrackingLevel } from './TrackingLevel.js';
import { renderer, camera, scoreEl, timerEl, canvas } from './main.js';

export class Game {
    constructor() {
        this.currentLevel = null;
        this.#bindEvents();
    }

    #bindEvents() {
        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement === canvas) {
                this.currentLevel.controls.isLocked = true;
            } else if (!document.pointerLockElement && this.currentLevel) {
                this.currentLevel.controls.isLocked = false;
            }
        });

        document.querySelector('#flick-btn').addEventListener('click', () => {
            document.querySelector('#menu').classList.add('hidden');
            this.loadLevel(new FlickLevel());
        });

        document.querySelector('#tracking-btn').addEventListener('click', () => {
            document.querySelector('#menu').classList.add('hidden');
            this.loadLevel(new TrackingLevel());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.currentLevel) {
                e.preventDefault();
                document.exitPointerLock();
                this.showMenu();
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (e.button !== 0 || !this.currentLevel) return;
            if (!this.currentLevel.controls.isLocked) return;
            if (this.currentLevel instanceof FlickLevel) this.currentLevel.shoot();
            if (this.currentLevel instanceof TrackingLevel) this.currentLevel.isMouseDown = true;
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button !== 0 || !this.currentLevel) return;
            if (this.currentLevel instanceof TrackingLevel) this.currentLevel.isMouseDown = false;
        });

        document.addEventListener('click', (e) => {
            if (e.target.id === 'result-menu-btn') this.showMenu();
        });
    }

    loadLevel(level) {
        if (this.currentLevel) this.currentLevel.stop();
        this.currentLevel = level;
        scoreEl.textContent = 'Score: 0';
        timerEl.textContent = '60s';
        this.currentLevel.start();
    }

    showMenu() {
        if (this.currentLevel) {
            this.currentLevel.stop();
            this.currentLevel = null;
            document.querySelector('#menu').classList.remove('hidden');
        }
    }

    update() {
        if (this.currentLevel) {
            this.currentLevel.update();
            renderer.render(this.currentLevel.scene, camera);
        }
    }
}