import "../css/style.css";

import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";

import React from "react";
import { createRoot } from "react-dom/client";

function App() {
    return (
        <div className="container">
            <h1>Ian's React Skeleton</h1>
            <h2>Feel free to begin editing <span>index.tsx</span>.</h2>
        </div>
    )
}

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set( 0, 0, 0 );

const teapot = new THREE.Mesh(
    new TeapotGeometry(1.5, 15),
    new THREE.MeshStandardMaterial( { color: 0xffffff, normalMap: new THREE.TextureLoader().load( "metal.jpg" )})
);
teapot.position.set(0, 0, 0);
scene.add(teapot);

const floor = new THREE.Mesh( 
    new THREE.BoxGeometry(15, 0.5, 15), 
    new THREE.MeshStandardMaterial( { color: 0xcccccc })
);
floor.position.set(0, -3, 0);
scene.add( floor ); 

const sl = new THREE.SpotLight(0x0000ff, 100, 7, Math.PI / 5, 0.1);
sl.position.set(0, 4, 0)
const slHelper = new THREE.SpotLightHelper(sl);
scene.add( sl, slHelper );

const dl = new THREE.DirectionalLight(0x00ff00, 1);
dl.position.set(0, 5, 0);
const dlHelper = new THREE.DirectionalLightHelper(dl);
scene.add( dl, dlHelper );

/*
const fontLoader = new FontLoader();
fontLoader.load(
    "optimer_regular.typeface.json",
    (droidFont) => {
        const textMesh = new THREE.Mesh(
            new TextGeometry("i9nn", {
                height: 2,
                size: 10,
                font: droidFont
            }),
            new THREE.MeshNormalMaterial()
        );
        textMesh.position.set(0, 0, 0);
        scene.add(textMesh);
    }
)
*/

function animate() {
    teapot.rotation.x += 0.025;
    teapot.rotation.y += 0.025;

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );