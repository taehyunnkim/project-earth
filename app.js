const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 30, 30);
const material = new THREE.MeshLambertMaterial({
	color:     0xffffff, 
	map: new THREE.TextureLoader().load('earth.jpg')
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// CLOUDS
const cloudGeometry   = new THREE.SphereGeometry(0.51, 32, 32)
const cloudMaterial  = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load('clouds.jpg'),
	side: THREE.DoubleSide,
	opacity: 0.4,
	transparent: true,
	depthWrite: false,
})
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
sphere.add(cloudMesh)

const lightColor = 0xe4feff;
const intensity = 1;
var light = new THREE.DirectionalLight(lightColor, intensity);
light.position.set(3, 5, 15);
light.target = sphere;
scene.add(light);

camera.position.z = 5;
const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	sphere.rotation.y += 0.0008;
}
animate();    