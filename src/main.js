import * as THREE from 'three';

export const scoreEl  = document.querySelector('#score');
export const timerEl  = document.querySelector('#timer');
export const resultEl = document.querySelector('#result');
export const raycaster    = new THREE.Raycaster();
export const screenCenter = new THREE.Vector2(0, 0);
export const canvas   = document.querySelector('canvas.threejs');
export const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
camera.position.set(0, 0, 5);