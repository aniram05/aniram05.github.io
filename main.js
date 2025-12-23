const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new FBXLoader();

// loading in the 3D model
loader.load('models/TAC215_PBall.fbx', 
    (object) => {
        scene.add(object);
        object.scale.set(0.01, 0.01, 0.01);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('FBX load error:', error);
    }
);

// position the camera
camera.position.z = 5;

// add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// render the model
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();