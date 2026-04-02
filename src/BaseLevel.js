import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { camera, scoreEl, timerEl, resultEl } from './main.js';
import { settings } from './Settings.js';

export class BaseLevel {
    constructor() {
        this.scene = new THREE.Scene();
        this.score = 0;
        this.timeLeft = 30;
        this.isFinished = false;
        this.#initControls();
        this.scene.add(camera);
    }

    #initControls() {
        this.controls = new PointerLockControls(camera, document.body);
        this.controls.pointerSpeed = settings.get('sensitivity');
    }

    relock() {
        this.controls.dispose();
        this.#initControls();
        this.controls.lock();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerEl.textContent = `${this.timeLeft}s`;
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.isFinished = true;
                this.showResults();
            }
        }, 1000);
    }

    showResults() {
        document.exitPointerLock();
        const accuracy = this.getAccuracy();
        resultEl.innerHTML = `
            <h2>Tid er gået!</h2>
            <p>Score: ${this.score}</p>
            <p>Accuracy: ${accuracy}%</p>
            <button id="result-menu-btn">Tilbage til menu</button>
        `;
        resultEl.style.display = 'flex';
    }

    getAccuracy() { return 0; }

    createRoom() {
        const roomMaterial = new THREE.MeshLambertMaterial({
            color: 0xaaaaaa,
            side: THREE.BackSide
        });
        const roomGeometry = new THREE.BoxGeometry(20, 10, 20);
        const room = new THREE.Mesh(roomGeometry, roomMaterial);
        this.scene.add(room);
    }

    addLight() {
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
        light.position.set(0.5, 1, 0.75);
        this.scene.add(light);
    }

    addScore() {
        this.score++;
        scoreEl.textContent = `Score: ${this.score}`;
    }

    removeScore() {
        this.score--;
        scoreEl.textContent = `Score: ${this.score}`;
    }

    start() {
        this.controls.lock();
        this.startTimer();
    }

    stop() {
        clearInterval(this.timerInterval);
        this.controls.dispose();
        resultEl.style.display = 'none';
        timerEl.textContent = '60s';
    }

    update() {}
}