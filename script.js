// Importa a biblioteca Three.js
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const images = [
  '/assets/previews/test.jpg',
  '/assets/previews/milkway.jpg',
  '/assets/previews/vlt-mw-potw.jpg',
  '/assets/previews/armazones-sunset360.jpg',
  '/assets/previews/sala_profissoes_panorama.jpg'
];
const textureCache = new Map();
let currentImageIndex = 0;

const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial();
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

function applyTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  material.map = texture;
  material.needsUpdate = true;
}

function loadTexture(index) {
  const textureUrl = images[index];
  const cachedTexture = textureCache.get(textureUrl);

  if (cachedTexture) {
    applyTexture(cachedTexture);
    return;
  }

  textureLoader.load(textureUrl, (texture) => {
    textureCache.set(textureUrl, texture);
    applyTexture(texture);
  });
}

function preloadTexture(index) {
  const textureUrl = images[index];
  if (!textureUrl || textureCache.has(textureUrl)) {
    return;
  }

  textureLoader.load(textureUrl, (texture) => {
    textureCache.set(textureUrl, texture);
  });
}

function initNavigation() {
  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      loadTexture(currentImageIndex);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      loadTexture(currentImageIndex);
    });
  }
}

function initInteraction() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let mouseDownPosition = { x: 0, y: 0 };
  const dragThreshold = 5;

  window.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
    mouseDownPosition.x = event.clientX;
    mouseDownPosition.y = event.clientY;
  });

  window.addEventListener('mouseup', (event) => {
    const dx = event.clientX - mouseDownPosition.x;
    const dy = event.clientY - mouseDownPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    isDragging = false;

    if (distance < dragThreshold) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(icon);
      if (intersects.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        loadTexture(currentImageIndex);
      }
    }
  });

  window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    let yaw = camera.rotation.y;
    let pitch = camera.rotation.x;

    yaw -= deltaX * 0.005;
    pitch -= deltaY * 0.005;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

    camera.rotation.set(pitch, yaw, 0);
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
  });
}

camera.position.set(0, 0, 0);
camera.rotation.order = 'YXZ';
camera.up.set(0, 1, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const spriteMaterial = new THREE.SpriteMaterial({
  map: textureLoader.load('/assets/info-icon.png'),
  sizeAttenuation: true
});

const icon = new THREE.Sprite(spriteMaterial);
icon.position.set(0, -50, 400);
icon.scale.set(50, 50, 1);
scene.add(icon);

loadTexture(currentImageIndex);
images.forEach((_, index) => {
  if (index !== currentImageIndex) {
    preloadTexture(index);
  }
});

initNavigation();
initInteraction();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
