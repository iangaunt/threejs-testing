import "../css/style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry";

import React from "react";
import { createRoot } from "react-dom/client";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.set( 0, 0, 0 );

const teapot = new THREE.Mesh(
    new TeapotGeometry(1.5, 15),
    new THREE.MeshStandardMaterial( { color: 0xffffff, normalMap: new THREE.TextureLoader().load("metal.jpg")})
);
teapot.position.set(0, 0, 0);
scene.add(teapot);

let cubes: Array<THREE.Mesh> = [];
let group = new THREE.Group();

for (let i = 0; i < 50; i++) {
    let h = Math.random() * 2 + 0.5;
    let box = new THREE.Mesh(
        new THREE.BoxGeometry(h, h, h),
        new THREE.MeshStandardMaterial( { color: Math.random() * 0xffffff } )
    );
    box.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
    cubes.push(box);
    group.add(box);
    group.position.set(0, 0, 0);
    // scene.add(group);
}

const floor = new THREE.Mesh( 
    new THREE.BoxGeometry(15, 0.25, 15), 
    new THREE.MeshStandardMaterial( { color: 0xffffff, normalMap: new THREE.TextureLoader().load("metal.jpg") })
);
floor.position.set(0, -3, 0);
scene.add( floor ); 

const sl = new THREE.SpotLight(0x0000ff, 100, 7, Math.PI / 5, 0.1);
sl.position.set(0, 4, -2)
const slHelper = new THREE.SpotLightHelper(sl);
scene.add( sl, slHelper );

const sl2 = new THREE.SpotLight(0xff0000, 100, 9, Math.PI / 5, 0.1);
sl2.position.set(-2, 4, 3)
const slHelper2 = new THREE.SpotLightHelper(sl2);
scene.add( sl2, slHelper2 );

const sl3 = new THREE.SpotLight(0x00ff00, 100, 9, Math.PI / 5, 0.1);
sl3.position.set(4, 1, -3)
const slHelper3 = new THREE.SpotLightHelper(sl3);
scene.add( sl3, slHelper3 );

const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 5, 0);
const dlHelper = new THREE.DirectionalLightHelper(dl);
scene.add( dl, dlHelper );

let time = 0.0;
function animate() {

    for (let i = 0; i < cubes.length; i++) {
        let c = cubes[i];
        let mod = c.scale.x > 0.75 ? -1 : 1;

        c.rotation.x += 0.025 * mod;
        c.rotation.y += 0.025 * mod;
    }

    teapot.position.y = Math.cos(time) * 0.5;

    group.position.y = Math.sin(time) * 2.0;

	renderer.render( scene, camera );
    time += 0.05;
}
renderer.setAnimationLoop( animate );