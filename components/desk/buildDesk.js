// Builds the desk scene from simple shapes, so the site needs no 3D model file.
// Swapping in your own GLB later: load it with GLTFLoader, then give the meshes the
// same userData.action names used below ("screen", "drive", "lamp", "plant", "books").
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// One blue family, like the rest of the site.
export const DESK_COLORS = {
  deskTop: "#3d63b3",
  deskBody: "#2f4f94",
  drawers: "#cfdaf0",
  handles: "#f4f7fd",
  plastic: "#dbe4f4",
  rim: "#0a1a33",
  keys: "#f4f7fd",
  slot: "#0e2240",
  led: "#8fb0ff",
  floppy: "#2347c5",
  metal: "#8fa6cf",
  lampHead: "#2347c5",
  pot: "#7e97c9",
  leaves: "#1e3f8f",
  soil: "#0e2240",
  books: ["#0e2240", "#2347c5", "#8fb0ff"],
};

const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0, ...extra });

function box(w, h, d, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function roundBox(w, h, d, r, material, x, y, z) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// A cylinder running from point a to point b.
function rod(a, b, radius, material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, dir.length(), 16), material);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  m.castShadow = true;
  return m;
}

function interactive(group, action) {
  group.userData.action = action;
  return group;
}

export function buildDesk() {
  const C = DESK_COLORS;
  const root = new THREE.Group();
  const interactives = [];

  // Desk: top, drawer unit on the left, panels on the right.
  const top = mat(C.deskTop);
  const body = mat(C.deskBody);
  root.add(roundBox(1.6, 0.04, 0.72, 0.012, top, 0, 0.73, 0));
  root.add(box(0.44, 0.71, 0.66, body, -0.58, 0.355, 0));
  const drawerMat = mat(C.drawers);
  const handleMat = mat(C.handles, { roughness: 0.3, metalness: 0.2 });
  for (let i = 0; i < 4; i++) {
    const y = 0.1 + i * 0.172;
    root.add(roundBox(0.41, 0.158, 0.012, 0.004, drawerMat, -0.58, y, 0.334));
    root.add(box(0.12, 0.008, 0.012, handleMat, -0.58, y + 0.04, 0.344));
  }
  root.add(box(0.03, 0.71, 0.66, body, 0.785, 0.355, 0));
  root.add(box(0.03, 0.71, 0.66, body, 0.45, 0.355, 0));
  root.add(box(0.31, 0.02, 0.62, body, 0.617, 0.42, 0));
  root.add(box(0.8, 0.28, 0.02, body, 0.0, 0.52, -0.31));

  // CRT monitor. The screen is a separate plane that gets the idle-screen texture.
  const monitor = new THREE.Group();
  const plastic = mat(C.plastic, { roughness: 0.55 });
  monitor.add(roundBox(0.34, 0.035, 0.28, 0.01, plastic, 0, 0.768, -0.1));
  monitor.add(roundBox(0.52, 0.42, 0.44, 0.035, plastic, 0, 1.0, -0.1));
  monitor.add(box(0.43, 0.33, 0.01, mat(C.rim, { roughness: 0.4 }), 0, 1.01, 0.122));
  const screenMat = new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), screenMat);
  screen.position.set(0, 1.01, 0.128);
  screen.userData.action = "screen";
  monitor.add(screen);
  monitor.add(box(0.012, 0.012, 0.004, mat(C.led, { emissive: C.led, emissiveIntensity: 0.8 }), 0.22, 0.81, 0.121));
  root.add(monitor);
  interactives.push(screen);

  // Keyboard with an instanced grid of keys.
  const kb = new THREE.Group();
  kb.add(roundBox(0.46, 0.022, 0.16, 0.006, plastic, 0, 0.761, 0.24));
  const keyGeo = new THREE.BoxGeometry(0.027, 0.01, 0.025);
  const rows = 4;
  const cols = 13;
  const keys = new THREE.InstancedMesh(keyGeo, mat(C.keys, { roughness: 0.45 }), rows * cols);
  const m4 = new THREE.Matrix4();
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      m4.makeTranslation(-0.204 + c * 0.034, 0.776, 0.188 + r * 0.034);
      keys.setMatrixAt(k++, m4);
    }
  }
  keys.castShadow = true;
  kb.add(keys);
  root.add(kb);

  // Disk drive (download the CV) with a floppy beside it.
  const drive = interactive(new THREE.Group(), "drive");
  const driveBody = mat(C.plastic, { roughness: 0.55 });
  drive.add(roundBox(0.26, 0.07, 0.22, 0.01, driveBody, -0.42, 0.785, 0.09));
  drive.add(box(0.15, 0.007, 0.004, mat(C.slot), -0.42, 0.79, 0.201));
  drive.add(box(0.014, 0.008, 0.004, mat(C.led, { emissive: C.led, emissiveIntensity: 1 }), -0.33, 0.772, 0.201));
  const floppy = box(0.09, 0.004, 0.09, mat(C.floppy, { roughness: 0.5 }), -0.66, 0.752, 0.08);
  floppy.rotation.y = 0.35;
  drive.add(floppy);
  drive.add(box(0.05, 0.001, 0.03, mat(C.handles), -0.666, 0.7545, 0.065).rotateY(0.35));
  root.add(drive);
  interactives.push(drive);

  // Desk lamp (light or dark mode).
  const lamp = interactive(new THREE.Group(), "lamp");
  const metal = mat(C.metal, { roughness: 0.35, metalness: 0.5 });
  const lampBlue = mat(C.lampHead, { roughness: 0.5 });
  const baseC = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.025, 32), lampBlue);
  baseC.position.set(0.52, 0.7625, -0.18);
  baseC.castShadow = true;
  lamp.add(baseC);
  const p0 = new THREE.Vector3(0.52, 0.775, -0.18);
  const p1 = new THREE.Vector3(0.47, 1.08, -0.22);
  const p2 = new THREE.Vector3(0.31, 1.13, -0.04);
  lamp.add(rod(p0, p1, 0.011, metal));
  lamp.add(rod(p1, p2, 0.011, metal));
  const joint = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 12), lampBlue);
  joint.position.copy(p1);
  lamp.add(joint);
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.075, 0.11, 32, 1, true), mat(C.lampHead, { side: THREE.DoubleSide, roughness: 0.5 }));
  head.position.copy(p2).add(new THREE.Vector3(0, -0.035, 0));
  head.rotation.z = 0.35;
  head.castShadow = true;
  lamp.add(head);
  const bulbMat = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#eaf1ff", emissiveIntensity: 0 });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.024, 16, 12), bulbMat);
  bulb.position.copy(p2).add(new THREE.Vector3(-0.012, -0.07, 0));
  lamp.add(bulb);
  const lampLight = new THREE.SpotLight("#eaf1ff", 0, 2.2, 0.75, 0.6, 1.4);
  lampLight.position.copy(bulb.position);
  lampLight.target.position.set(0.12, 0.75, 0.2);
  lampLight.castShadow = true;
  lampLight.shadow.mapSize.set(512, 512);
  lamp.add(lampLight);
  lamp.add(lampLight.target);
  root.add(lamp);
  interactives.push(lamp);

  // Plant (giving back: teaching and mentoring).
  const plant = interactive(new THREE.Group(), "plant");
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.052, 0.12, 32), mat(C.pot));
  pot.position.set(-0.64, 0.81, -0.16);
  pot.castShadow = true;
  plant.add(pot);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.064, 0.064, 0.01, 32), mat(C.soil));
  soil.position.set(-0.64, 0.865, -0.16);
  plant.add(soil);
  const leafMat = mat(C.leaves, { roughness: 0.6 });
  const stemBase = new THREE.Vector3(-0.64, 0.86, -0.16);
  const leafGeo = new THREE.SphereGeometry(1, 20, 12);
  // Each leaf: a stem rising at an angle, then a long leaf continuing outward and drooping a little.
  const leaves = [
    { angle: 0.3, rise: 0.2, reach: 0.06 },
    { angle: 1.4, rise: 0.27, reach: 0.04 },
    { angle: 2.5, rise: 0.17, reach: 0.07 },
    { angle: 3.6, rise: 0.24, reach: 0.05 },
    { angle: 4.7, rise: 0.15, reach: 0.07 },
    { angle: 5.6, rise: 0.3, reach: 0.03 },
  ];
  for (const { angle, rise, reach } of leaves) {
    const out = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));
    const tip = stemBase.clone().addScaledVector(out, reach).add(new THREE.Vector3(0, rise, 0));
    plant.add(rod(stemBase, tip, 0.004, leafMat));
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.scale.set(0.075, 0.008, 0.03);
    leaf.position.copy(tip).addScaledVector(out, 0.06).add(new THREE.Vector3(0, -0.015, 0));
    leaf.rotation.set(0, angle, -0.35);
    leaf.castShadow = true;
    plant.add(leaf);
  }
  root.add(plant);
  interactives.push(plant);

  // Books (research: the thesis and papers).
  const books = interactive(new THREE.Group(), "books");
  C.books.forEach((color, i) => {
    const b = roundBox(0.2, 0.034, 0.15, 0.006, mat(color, { roughness: 0.65 }), 0.64, 0.767 + i * 0.035, 0.17);
    b.rotation.y = [0.1, -0.12, 0.2][i];
    books.add(b);
  });
  root.add(books);
  interactives.push(books);

  return { root, screen, interactives, lamp: { light: lampLight, bulb: bulbMat } };
}
