import * as THREE from 'three';
import { raycaster, screenCenter, camera } from './main.js';
import { BaseLevel } from './BaseLevel.js';
import { audio } from './Audio.js';

export class FlickLevel extends BaseLevel {
    constructor() {
        super();
        this.shots = 0;
        this.hits = 0;
        this.scene.background = new THREE.Color(0xffffff);
        this.addLight();
        this.createRoom();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 'red' });
        this.cubes = [
            new THREE.Mesh(geometry, material),
            new THREE.Mesh(geometry, material),
            new THREE.Mesh(geometry, material),
        ];

        this.cubes.forEach(cube => {
            this.spawnCube(cube);
            this.scene.add(cube);
        });
    }

    spawnCube(cube) {
        cube.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        );
    }

    shoot() {
        if (this.isFinished) return;
        if (!document.pointerLockElement) return;

        this.shots++;
        audio.playShoot();
        raycaster.setFromCamera(screenCenter, camera);
        const intersects = raycaster.intersectObjects(this.cubes);

        if (intersects.length > 0) {
            this.hits++;
            audio.playHit();
            this.addScore();
            this.spawnCube(intersects[0].object);
        } else {
            if(this.score>0){
            this.removeScore();
            };
        }
    }

    getAccuracy() {
        if (this.shots === 0) return 0;
        return Math.round((this.hits / this.shots) * 100);
    }
}