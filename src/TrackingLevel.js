import * as THREE from 'three';
import { raycaster, screenCenter, camera } from './main.js';
import { BaseLevel } from './BaseLevel.js';

export class TrackingLevel extends BaseLevel {
    constructor() {
        super();
        this.scene.background = new THREE.Color(0x222222);
        this.addLight();
        this.createRoom();
        this.isMouseDown = false;
        this.ticksOnTarget = 0;
        this.ticksHeld = 0;

        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: 'blue' })
        );
        this.scene.add(this.cube);

        this.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1 ,
            0
        );

        this.bounds = { x: 5, y: 3 };
    }

    update() {
        if (this.isFinished) return;

        this.cube.position.add(this.velocity);

        if (Math.abs(this.cube.position.x) > this.bounds.x) {
            this.velocity.x *= -1;
            this.velocity.y = (Math.random() - 0.5) * 0.05;
        }
        if (Math.abs(this.cube.position.y) > this.bounds.y) {
            this.velocity.y *= -1;
            this.velocity.x = (Math.random() - 0.5) * 0.05;
        }

        if (this.isMouseDown && document.pointerLockElement) {
            this.ticksHeld++;
            raycaster.setFromCamera(screenCenter, camera);
            const intersects = raycaster.intersectObject(this.cube);
            if (intersects.length > 0) {
                this.ticksOnTarget++;
                this.addScore();
            }
        }
    }

    getAccuracy() {
        if (this.ticksHeld === 0) return 0;
        return Math.round((this.ticksOnTarget / this.ticksHeld) * 100);
    }
}