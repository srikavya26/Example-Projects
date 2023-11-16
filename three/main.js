
import * as THREE from 'three';
// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer with white background
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Set background color to white
document.body.appendChild(renderer.domElement);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

// Create shapes
const circleGeometry = new THREE.CircleGeometry(1, 32);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);

const circleMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });

const circle = new THREE.Mesh(circleGeometry, circleMaterial);
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const cone = new THREE.Mesh(coneGeometry, coneMaterial);

circle.position.x = -3; // Adjusted position for a gap
cylinder.position.x = 0;
cone.position.x = 3; // Adjusted position for a gap

// Add shapes to scene
scene.add(circle);
scene.add(cylinder);
scene.add(cone);

// Add drop shadow
circle.castShadow = true;
cylinder.castShadow = true;
cone.castShadow = true;

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Move shapes slightly to the left with 3D effect
    circle.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    cone.rotation.z += 0.01;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

animate();