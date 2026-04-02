import { Game } from './Game.js';
import { camera, renderer } from './main.js';
import { settings } from './Settings.js';
import { SettingsMenu } from './SettingsMenu.js';

const game = new Game();
new SettingsMenu();

const fpsCounter = document.querySelector('#fps-counter');
fpsCounter.style.display = settings.get('showFps') ? 'block' : 'none';

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let lastTime = performance.now();
let lastFpsTime = performance.now();
let frames = 0;

function animate(timestamp) {
    requestAnimationFrame(animate);

    const fpsCap = settings.get('fpsCap');
    if (fpsCap > 0) {
        const interval = 1000 / fpsCap;
        if (timestamp - lastTime < interval) return;
    }
    lastTime = timestamp;

    // FPS counter
    frames++;
    const elapsed = timestamp - lastFpsTime;
    if (elapsed >= 500) {
        fpsCounter.textContent = `FPS: ${Math.round((frames * 1000) / elapsed)}`;
        frames = 0;
        lastFpsTime = timestamp;
    }

    game.update();
}

requestAnimationFrame(animate);