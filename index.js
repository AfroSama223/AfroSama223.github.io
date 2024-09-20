import * as THREE from "three";
import {OrbitControls } from "jsm/controls/OrbitControls.js";


const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 40;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
const geo = new THREE.IcosahedronGeometry(1.0, 7);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
});
const wiremesh = new THREE.Mesh(geo, wireMat);
wiremesh.scale.setScalar(1.009)
mesh.add(wiremesh)

const hemiLight = new THREE.HemisphereLight(0xe38119, 0xff00f2);
scene.add(hemiLight);  

function animate(t = 0){
requestAnimationFrame(animate);
mesh.rotation.y = t * 0.0001;
renderer.render(scene, camera);
controls.update();

}
animate();