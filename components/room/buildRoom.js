// Yara's room, built from simple shapes and canvas textures (no model files).
// Units are metres. The desk stands against the back wall (z = -1.5); her
// certificates hang above it, her shelves of awards are on the right wall,
// the window and her calligraphy are on the left, the door and pinboard behind you.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { buildDesk } from "@/components/desk/buildDesk";
import { cv } from "@/data/cv";
import { GARDEN_PATHS, GARDEN_VIEWBOX } from "./printPaths";
import * as T from "./textures";
import { ANCHORS, VIEWS, ROOM } from "./layout";

const { x0: X0, x1: X1, z0: Z0, z1: Z1, h: H, deskZ: DESK_Z } = ROOM;

const v = (x, y, z) => new THREE.Vector3(x, y, z);
const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0, ...extra });

function mesh(geo, material, { cast = true, receive = true } = {}) {
  const m = new THREE.Mesh(geo, material);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function box(w, h, d, material, x, y, z, opts) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), material, opts);
  m.position.set(x, y, z);
  return m;
}

function rbox(w, h, d, r, material, x, y, z, opts) {
  const m = mesh(new RoundedBoxGeometry(w, h, d, 3, r), material, opts);
  m.position.set(x, y, z);
  return m;
}

function tag(obj, spot) {
  obj.userData.spot = spot;
  return obj;
}

// A framed picture facing +z in its own space. Rotate the returned group to hang it on any wall.
function framed(w, h, texture, frameColor, depth = 0.025, border = 0.02) {
  const g = new THREE.Group();
  g.add(box(w + border * 2, h + border * 2, depth, std(frameColor, { roughness: 0.5 }), 0, 0, depth / 2, { cast: false }));
  const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 }));
  pic.position.z = depth + 0.001;
  g.add(pic);
  return g;
}

// Hang a +z-facing object on a wall. wall: "back" | "left" | "right" | "front".
function hang(obj, wall, a, y, off = 0) {
  if (wall === "back") {
    obj.position.set(a, y, Z0 + off);
  } else if (wall === "left") {
    obj.rotation.y = Math.PI / 2;
    obj.position.set(X0 + off, y, a);
  } else if (wall === "right") {
    obj.rotation.y = -Math.PI / 2;
    obj.position.set(X1 - off, y, a);
  } else {
    obj.rotation.y = Math.PI;
    obj.position.set(a, y, Z1 - off);
  }
  return obj;
}

// The Type Garden name, drawn onto a canvas for the framed print.
function gardenPrint() {
  const W = 1024;
  const Hh = 720;
  const { texture, redraw } = T.canvasTexture(W, Hh, (ctx) => {
    ctx.fillStyle = "#0d1b4c";
    ctx.fillRect(0, 0, W, Hh);
  });
  const css =
    ".a{fill:#9fb4ff}.as{fill:none;stroke:#9fb4ff;stroke-linecap:round;stroke-linejoin:round}" +
    ".b{fill:#4f7bff}.cs{fill:none;stroke:#dbe6ff;stroke-linecap:round;stroke-linejoin:round}" +
    ".ds{fill:none;stroke:#0d1b4c;stroke-linecap:round;stroke-linejoin:round}.t{fill:#ffffff}";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${GARDEN_VIEWBOX}" width="${W}" height="${Hh}"><style>${css}</style>${GARDEN_PATHS}</svg>`;
  const img = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  img.onload = () => {
    redraw();
    texture.image.getContext("2d").drawImage(img, 0, 0, W, Hh);
    texture.needsUpdate = true;
    URL.revokeObjectURL(url);
  };
  img.src = url;
  return texture;
}

export function buildRoom({ fonts, shadows }) {
  const root = new THREE.Group();
  const pickables = [];
  const repaint = [];
  const paint = (w, h, fn, opts) => {
    const c = T.canvasTexture(w, h, fn, opts);
    repaint.push(c.redraw);
    return c.texture;
  };

  // ---------- Shell: floor, walls, ceiling, skirting ----------
  const wallMat = std("#e3eaf6", { roughness: 0.95 });
  // The wall behind the desk: a deeper periwinkle with her mashq (calligraphy practice)
  // painted on in a slightly darker blue, so the white certificates stand out.
  const muralTex = paint(1792, 1100, T.paintMashqWall(fonts));
  const featureMat = std("#ffffff", { map: muralTex, roughness: 0.95 });
  const floorTex = paint(1024, 1024, T.paintFloor, { repeat: [2, 2] });
  const floor = mesh(new THREE.PlaneGeometry(X1 - X0, Z1 - Z0), std("#ffffff", { map: floorTex, roughness: 0.7 }), { cast: false });
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, (Z0 + Z1) / 2);
  root.add(floor);

  const walls = [
    { w: X1 - X0, pos: [0, H / 2, Z0], ry: 0 },
    { w: X1 - X0, pos: [0, H / 2, Z1], ry: Math.PI },
    { w: Z1 - Z0, pos: [X0, H / 2, (Z0 + Z1) / 2], ry: Math.PI / 2 },
    { w: Z1 - Z0, pos: [X1, H / 2, (Z0 + Z1) / 2], ry: -Math.PI / 2 },
  ];
  walls.forEach((wl, i) => {
    const m = mesh(new THREE.PlaneGeometry(wl.w, H), i === 0 ? featureMat : wallMat, { cast: false });
    m.position.set(...wl.pos);
    m.rotation.y = wl.ry;
    root.add(m);
  });
  const ceiling = mesh(new THREE.PlaneGeometry(X1 - X0, Z1 - Z0), std("#f4f7fd", { emissive: "#dbe6ff", emissiveIntensity: 0.55 }), { cast: false, receive: false });
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, H, (Z0 + Z1) / 2);
  root.add(ceiling);

  const skirt = std("#c2cfe6", { roughness: 0.6 });
  root.add(box(X1 - X0, 0.08, 0.015, skirt, 0, 0.04, Z0 + 0.008, { cast: false }));
  root.add(box(X1 - X0, 0.08, 0.015, skirt, 0, 0.04, Z1 - 0.008, { cast: false }));
  root.add(box(0.015, 0.08, Z1 - Z0, skirt, X0 + 0.008, 0.04, (Z0 + Z1) / 2, { cast: false }));
  root.add(box(0.015, 0.08, Z1 - Z0, skirt, X1 - 0.008, 0.04, (Z0 + Z1) / 2, { cast: false }));

  // Rug under the desk and chair.
  const rug = mesh(new THREE.PlaneGeometry(2.3, 1.6), std("#ffffff", { map: paint(512, 384, T.paintRug), roughness: 1 }), { cast: false });
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.004, -0.45);
  root.add(rug);

  // Ceiling light: a flat round lamp that glows at night.
  const ceilingLampMat = new THREE.MeshStandardMaterial({ color: "#f4f7fd", emissive: "#eaf1ff", emissiveIntensity: 0 });
  const ceilingLamp = mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 40), ceilingLampMat, { cast: false, receive: false });
  ceilingLamp.position.set(0, H - 0.02, 0.4);
  root.add(ceilingLamp);

  // ---------- The desk (with monitor, lamp, plant, books, disk drive) ----------
  const desk = buildDesk();
  desk.root.position.z = DESK_Z;
  root.add(desk.root);
  const deskSpot = { screen: "monitor", drive: "drive", lamp: "lamp", plant: "plant", books: "books" };
  for (const obj of desk.interactives) {
    obj.userData.spot = deskSpot[obj.userData.action];
    pickables.push(obj);
  }

  const chair = new THREE.Group();
  const fabric = std("#2f4f94", { roughness: 0.9 });
  const steel = std("#8fa6cf", { roughness: 0.35, metalness: 0.6 });
  chair.add(rbox(0.48, 0.07, 0.46, 0.03, fabric, 0, 0.48, 0));
  chair.add(rbox(0.46, 0.5, 0.06, 0.03, fabric, 0, 0.82, 0.22));
  chair.add(box(0.04, 0.3, 0.03, steel, 0, 0.6, 0.2));
  const pole = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.36, 16), steel);
  pole.position.y = 0.27;
  chair.add(pole);
  for (let i = 0; i < 5; i++) {
    const leg = box(0.3, 0.03, 0.04, steel, 0, 0.06, 0);
    const a = (i / 5) * Math.PI * 2;
    leg.position.set(Math.cos(a) * 0.15, 0.06, Math.sin(a) * 0.15);
    leg.rotation.y = -a;
    chair.add(leg);
  }
  // Pushed back and turned aside, as if she just got up.
  chair.position.set(0.88, 0, -0.08);
  chair.rotation.y = -0.95;
  root.add(chair);

  // A letter on the desk: write to Yara.
  const letter = tag(new THREE.Group(), "contact");
  const paperMat = std("#f4f7fd", { roughness: 0.9 });
  letter.add(box(0.19, 0.004, 0.12, paperMat, 0, 0.002, 0, { receive: false }));
  const flapShape = new THREE.Shape();
  flapShape.moveTo(-0.095, 0);
  flapShape.lineTo(0.095, 0);
  flapShape.lineTo(0, 0.06);
  flapShape.closePath();
  const flap = mesh(new THREE.ShapeGeometry(flapShape), std("#dbe6ff", { roughness: 0.9, side: THREE.DoubleSide }), { cast: false });
  flap.rotation.x = -Math.PI / 2;
  flap.position.set(0, 0.0045, -0.06);
  letter.add(flap);
  const waxSeal = mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.004, 24), std("#2347c5", { roughness: 0.4 }), { cast: false });
  waxSeal.position.set(0, 0.006, -0.002);
  letter.add(waxSeal);
  letter.position.set(-0.6, 0.751, DESK_Z + 0.27);
  letter.rotation.y = 0.22;
  root.add(letter);
  pickables.push(letter);

  // Her diary of what went wrong, closed with an elastic band.
  const diary = tag(new THREE.Group(), "diary");
  diary.add(rbox(0.13, 0.024, 0.18, 0.006, std("#2347c5", { roughness: 0.85 }), 0, 0.012, 0));
  diary.add(box(0.122, 0.018, 0.004, std("#f4f7fd"), 0, 0.012, 0.089, { cast: false }));
  diary.add(box(0.012, 0.026, 0.182, std("#0e2240", { roughness: 0.6 }), 0.042, 0.012, 0, { cast: false }));
  diary.position.set(0.37, 0.751, DESK_Z + 0.24);
  diary.rotation.y = -0.18;
  root.add(diary);
  pickables.push(diary);

  // ---------- Next to the desk: a record cabinet with a turntable ----------
  const records = tag(new THREE.Group(), "records");
  const cab = std("#e9eef8", { roughness: 0.55 });
  const navyMat = std("#0e2240", { roughness: 0.5 });
  const steelBright = std("#c9d3e6", { roughness: 0.25, metalness: 0.85 });
  const CW = 0.86;
  const CD = 0.42;
  records.add(box(CW, 0.03, CD, cab, 0, 0.605, 0));
  records.add(box(CW, 0.03, CD, cab, 0, 0.115, 0));
  records.add(box(0.03, 0.49, CD, cab, -CW / 2 + 0.015, 0.36, 0));
  records.add(box(0.03, 0.49, CD, cab, CW / 2 - 0.015, 0.36, 0));
  records.add(box(CW, 0.49, 0.02, cab, 0, 0.36, -CD / 2 + 0.01));
  records.add(box(0.02, 0.46, CD - 0.02, cab, 0.02, 0.36, 0));
  records.add(box(0.39, 0.45, 0.02, std("#c9d6ef", { roughness: 0.5 }), 0.225, 0.36, CD / 2 - 0.01));
  const knob2 = mesh(new THREE.SphereGeometry(0.014, 12, 10), steelBright);
  knob2.position.set(0.06, 0.36, CD / 2 + 0.008);
  records.add(knob2);
  for (const [lx, lz] of [[-0.38, -0.17], [0.38, -0.17], [-0.38, 0.17], [0.38, 0.17]]) {
    const leg = mesh(new THREE.CylinderGeometry(0.014, 0.01, 0.1, 10), navyMat);
    leg.position.set(lx, 0.05, lz);
    records.add(leg);
  }
  // Record sleeves standing in the open shelf.
  const sleeveColors = ["#2347c5", "#0e2240", "#8fb0ff", "#3d63b3", "#dbe6ff", "#2f4f94", "#c9d6ef"];
  for (let k = 0; k < 15; k++) {
    const sleeve = box(0.011, 0.31, 0.31, std(sleeveColors[k % sleeveColors.length], { roughness: 0.8 }), -0.37 + k * 0.024, 0.285, 0.02, { cast: false });
    sleeve.rotation.z = (k % 3 === 0 ? -1 : 1) * 0.05 * ((k * 7) % 3);
    records.add(sleeve);
  }
  // Two small speakers.
  for (const sx of [-0.35, 0.35]) {
    records.add(rbox(0.13, 0.2, 0.14, 0.01, navyMat, sx, 0.72, -0.02));
    for (const [cy, r] of [[0.765, 0.022], [0.69, 0.04]]) {
      const cone = mesh(new THREE.CylinderGeometry(r, r, 0.006, 24), std("#3d63b3", { roughness: 0.7 }), { cast: false });
      cone.rotation.x = Math.PI / 2;
      cone.position.set(sx, cy, 0.052);
      records.add(cone);
    }
  }
  // The turntable.
  const deck = new THREE.Group();
  deck.add(rbox(0.44, 0.06, 0.34, 0.012, navyMat, 0, 0.65, 0));
  const platter = new THREE.Group();
  platter.position.set(-0.04, 0.683, 0.01);
  const platterBase = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.012, 48), steelBright);
  platter.add(platterBase);
  const recordTex = paint(512, 512, T.paintRecord(fonts));
  const vinylSide = std("#0b1a33", { roughness: 0.35 });
  const vinyl = mesh(new THREE.CylinderGeometry(0.148, 0.148, 0.003, 64), [vinylSide, new THREE.MeshStandardMaterial({ map: recordTex, roughness: 0.3 }), vinylSide]);
  vinyl.position.y = 0.0075;
  platter.add(vinyl);
  const spindle = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.02, 12), steelBright);
  spindle.position.y = 0.012;
  platter.add(spindle);
  deck.add(platter);
  // Tonearm: rests beside the record, swings over it while the record plays.
  const arm = new THREE.Group();
  arm.position.set(0.15, 0.695, -0.11);
  arm.add(mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.03, 20), steelBright));
  const rod2 = box(0.007, 0.007, 0.22, steelBright, 0, 0.022, 0.105);
  arm.add(rod2);
  arm.add(box(0.022, 0.01, 0.03, navyMat, 0, 0.018, 0.22));
  const weight = mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.03, 16), navyMat);
  weight.rotation.x = Math.PI / 2;
  weight.position.set(0, 0.022, -0.03);
  arm.add(weight);
  deck.add(arm);
  // The record player sits on the desk, where the plant used to be.
  const player = tag(new THREE.Group(), "records");
  const S = 0.8;
  deck.scale.setScalar(S);
  deck.position.set(0, 0.75 - 0.62 * S, 0);
  player.add(deck);
  player.position.set(-0.58, 0, DESK_Z - 0.19);
  player.rotation.y = 0.12;
  root.add(player);
  pickables.push(player);

  // ...and the plant moved to the record cabinet, between the speakers.
  const plantGroup = desk.interactives.find((o) => o.userData.action === "plant");
  desk.root.remove(plantGroup);
  plantGroup.position.set(0.64, -0.75, 0.16);
  const plantHolder = new THREE.Group();
  plantHolder.position.set(0, 0.62, -0.02);
  plantHolder.scale.setScalar(1.2);
  plantHolder.add(plantGroup);
  records.add(plantHolder);
  records.position.set(-1.42, 0, -1.28);
  root.add(records);
  pickables.push(records);

  let spin = 0;
  const turntable = {
    // Called every frame: spin up to 33⅓ rpm and move the arm onto the record.
    update(dt, playing) {
      spin += ((playing ? 3.49 : 0) - spin) * Math.min(1, dt * (playing ? 2.2 : 1.4));
      platter.rotation.y -= spin * dt;
      const target = playing ? -0.45 : 0;
      arm.rotation.y += (target - arm.rotation.y) * Math.min(1, dt * 3);
    },
  };

  // ---------- Back wall: degrees, then two rows of certifications ----------
  const degrees = tag(new THREE.Group(), "degrees");
  [...cv.education].reverse().forEach((edu, i) => {
    const tex = paint(512, 384, T.paintDegree(edu, fonts));
    degrees.add(hang(framed(0.42, 0.315, tex, "#0e2240", 0.03, 0.025), "back", -0.75 + i * 0.5, 1.62));
  });
  root.add(degrees);
  pickables.push(degrees);

  // Oldest at the top left, the newest at the bottom right, then the empty CSAP frame.
  const certs = tag(new THREE.Group(), "certificates");
  const ordered = [...cv.certifications].reverse();
  const inProgress = ordered.filter((c) => c.status === "inProgress");
  const earned = ordered.filter((c) => c.status !== "inProgress");
  [...earned, ...inProgress].forEach((cert, i) => {
    const row = i < 10 ? 0 : 1;
    const col = i % 10;
    const tex = paint(384, 288, T.paintCert(cert, fonts));
    const color = cert.status === "expired" ? "#7f97c9" : "#3d63b3";
    certs.add(hang(framed(0.24, 0.18, tex, color, 0.018, 0.014), "back", -1.305 + col * 0.29, row === 0 ? 2.36 : 2.06));
  });
  root.add(certs);
  pickables.push(certs);

  // ---------- Right wall: three floating shelves ----------
  const shelfMat = std("#f4f7fd", { roughness: 0.6 });
  const SX = X1 - 0.13;
  const SZ = -0.35;
  const shelfY = [0.95, 1.35, 1.75];
  for (const y of shelfY) root.add(box(0.26, 0.03, 1.8, shelfMat, SX, y, SZ));

  // Ten awards, newest on the top shelf.
  const crystal = new THREE.MeshStandardMaterial({
    color: "#a9c4ff",
    roughness: 0.05,
    metalness: 0.25,
    transparent: true,
    opacity: 0.78,
    emissive: "#2347c5",
    emissiveIntensity: 0.32,
  });
  const silver = std("#e3eaf6", { roughness: 0.32, metalness: 0.7 });
  const navy = std("#0e2240", { roughness: 0.4, metalness: 0.3 });
  const awards = tag(new THREE.Group(), "awards");
  cv.awards.forEach((aw, i) => {
    const g = new THREE.Group();
    const shelf = i < 5 ? 2 : 1;
    const z = -1.02 + (i % 5) * 0.33;
    const y = shelfY[shelf] + 0.015;
    g.add(box(0.1, 0.04, 0.1, navy, 0, 0.02, 0));
    const kind = aw.id === "web-craft-2014" ? "silver" : ["obelisk", "star", "disc", "drop"][i % 4];
    if (kind === "obelisk") {
      const o = mesh(new THREE.CylinderGeometry(0.022, 0.045, 0.26, 4), crystal);
      o.rotation.y = Math.PI / 4;
      o.position.y = 0.17;
      g.add(o);
    } else if (kind === "star") {
      const s = mesh(new THREE.CylinderGeometry(0.012, 0.02, 0.16, 12), crystal);
      s.position.y = 0.12;
      g.add(s);
      const o = mesh(new THREE.OctahedronGeometry(0.06), crystal);
      o.position.y = 0.24;
      g.add(o);
    } else if (kind === "disc" || kind === "silver") {
      const d = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 40), kind === "silver" ? silver : crystal);
      d.rotation.z = Math.PI / 2;
      d.position.y = 0.12;
      g.add(d);
    } else {
      const d = mesh(new THREE.SphereGeometry(1, 24, 16), crystal);
      d.scale.set(0.05, 0.12, 0.05);
      d.position.y = 0.16;
      g.add(d);
    }
    g.position.set(SX, y, z);
    awards.add(g);
  });
  root.add(awards);
  pickables.push(awards);

  // Bottom shelf: three restored film cameras, then the two patents leaning on the wall.
  const cameras = tag(new THREE.Group(), "cameras");
  const leather = std("#0e2240", { roughness: 0.85 });
  const chrome = std("#c9d3e6", { roughness: 0.25, metalness: 0.85 });
  const glass = std("#071631", { roughness: 0.1, metalness: 0.4 });
  [-1.05, -0.8, -0.56].forEach((z, i) => {
    const c = new THREE.Group();
    const y0 = shelfY[0] + 0.015;
    if (i === 1) {
      // A twin-lens reflex: a tall box with two lenses, one above the other.
      c.add(rbox(0.07, 0.13, 0.08, 0.008, leather, 0, y0 + 0.065, 0));
      c.add(box(0.072, 0.03, 0.082, chrome, 0, y0 + 0.14, 0));
      for (const ly of [0.05, 0.1]) {
        const lens = mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.03, 24), glass);
        lens.rotation.z = Math.PI / 2;
        lens.position.set(-0.05, y0 + ly, 0);
        c.add(lens);
      }
    } else {
      c.add(rbox(0.05, 0.05, 0.13, 0.008, leather, 0, y0 + 0.025, 0));
      c.add(rbox(0.052, 0.03, 0.132, 0.006, chrome, 0, y0 + 0.064, 0));
      c.add(box(0.03, 0.022, 0.035, chrome, 0, y0 + 0.088, 0));
      const lens = mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.045, 24), glass);
      lens.rotation.z = Math.PI / 2;
      lens.position.set(-0.045, y0 + 0.04, 0);
      c.add(lens);
    }
    c.position.set(SX, 0, z);
    c.rotation.y = 0.15 - i * 0.1;
    cameras.add(c);
  });
  root.add(cameras);
  pickables.push(cameras);

  const patents = tag(new THREE.Group(), "patents");
  cv.patents.forEach((p, i) => {
    const tex = paint(256, 320, T.paintPatent(p, fonts));
    const f = framed(0.15, 0.1875, tex, "#3d63b3", 0.015, 0.012);
    f.rotation.set(0, -Math.PI / 2, 0);
    f.rotateX(-0.12);
    f.position.set(X1 - 0.07, shelfY[0] + 0.12, -0.12 + i * 0.24);
    patents.add(f);
  });
  root.add(patents);
  pickables.push(patents);

  // Three half-marathon medals hanging from the front of the bottom shelf.
  const medals = tag(new THREE.Group(), "medals");
  const ribbonMat = std("#2347c5", { roughness: 0.9, side: THREE.DoubleSide });
  const ribbonStripe = std("#dbe6ff", { roughness: 0.9, side: THREE.DoubleSide });
  const medalMat = std("#dbe6ff", { roughness: 0.3, metalness: 0.65, emissive: "#3d63b3", emissiveIntensity: 0.12 });
  [0.12, 0.3, 0.48].forEach((z, i) => {
    const m = new THREE.Group();
    for (const side of [-1, 1]) {
      const r = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.2), i === 1 ? ribbonStripe : ribbonMat);
      r.rotation.set(0, -Math.PI / 2, -side * 0.18);
      r.position.set(0, -0.1, side * 0.018);
      m.add(r);
    }
    const disc = mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.008, 32), medalMat);
    disc.rotation.z = Math.PI / 2;
    disc.position.set(0, -0.23, 0);
    m.add(disc);
    m.position.set(X1 - 0.27, shelfY[0] - 0.02, z);
    m.rotation.x = (i - 1) * 0.06;
    medals.add(m);
  });
  root.add(medals);
  pickables.push(medals);

  // ---------- Side table with a chess game in progress ----------
  const chess = tag(new THREE.Group(), "chess");
  const tableMat = std("#cfdaf0", { roughness: 0.6 });
  chess.add(box(0.56, 0.03, 0.56, tableMat, 0, 0.6, 0));
  for (const [lx, lz] of [[-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24]]) chess.add(box(0.03, 0.6, 0.03, tableMat, lx, 0.3, lz));
  const boardTex = paint(256, 256, T.paintChess);
  const side = std("#0e2240", { roughness: 0.5 });
  const top = new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.5 });
  const board = mesh(new THREE.BoxGeometry(0.4, 0.02, 0.4), [side, side, top, side, side, side]);
  board.position.y = 0.625;
  chess.add(board);
  const light = std("#f4f7fd", { roughness: 0.4 });
  const dark = std("#0e2240", { roughness: 0.4 });
  const sq = 0.05;
  const at = (c, r) => [-0.175 + c * sq, 0.635, -0.175 + r * sq];
  const piece = (kind, mat, c, r) => {
    const g = new THREE.Group();
    const base = mesh(new THREE.CylinderGeometry(0.014, 0.017, 0.012, 16), mat);
    base.position.y = 0.006;
    g.add(base);
    const hgt = { p: 0.03, r: 0.04, n: 0.045, b: 0.05, q: 0.06, k: 0.065 }[kind];
    const body = mesh(new THREE.CylinderGeometry(kind === "r" ? 0.012 : 0.007, 0.012, hgt, 12), mat);
    body.position.y = 0.012 + hgt / 2;
    g.add(body);
    if (kind === "n") {
      const head = box(0.012, 0.022, 0.026, mat, 0, 0.012 + hgt, 0.004);
      head.rotation.x = -0.4;
      g.add(head);
    } else if (kind !== "r") {
      const head = mesh(new THREE.SphereGeometry(kind === "p" ? 0.011 : 0.009, 12, 10), mat);
      head.position.y = 0.012 + hgt + 0.006;
      g.add(head);
    }
    g.position.set(...at(c, r));
    chess.add(g);
  };
  // A middlegame position.
  [["k", 6, 7], ["r", 5, 7], ["q", 3, 5], ["b", 2, 4], ["n", 5, 5], ["p", 0, 6], ["p", 1, 6], ["p", 5, 6], ["p", 6, 6], ["p", 4, 4]].forEach(([k, c, r]) =>
    piece(k, light, c, r)
  );
  [["k", 6, 0], ["r", 3, 0], ["q", 4, 2], ["n", 2, 2], ["b", 6, 3], ["p", 0, 1], ["p", 5, 1], ["p", 6, 1], ["p", 7, 2], ["p", 3, 3]].forEach(([k, c, r]) =>
    piece(k, dark, c, r)
  );
  chess.position.set(1.48, 0, -1.08);
  chess.rotation.y = 0.2;
  root.add(chess);
  pickables.push(chess);

  // ---------- Left wall: window and two pieces of her calligraphy ----------
  const dayTex = paint(512, 512, T.paintWindow(false));
  const nightTex = paint(512, 512, T.paintWindow(true));
  const windowMat = new THREE.MeshBasicMaterial({ map: dayTex, toneMapped: false });
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.0), windowMat);
  hang(pane, "left", -0.3, 1.52, 0.004);
  root.add(pane);
  const trim = std("#f4f7fd", { roughness: 0.5 });
  const win = new THREE.Group();
  win.add(box(1.3, 0.05, 0.08, trim, 0, 0.525, 0.04));
  win.add(box(1.3, 0.05, 0.08, trim, 0, -0.525, 0.04));
  win.add(box(0.05, 1.1, 0.08, trim, -0.625, 0, 0.04));
  win.add(box(0.05, 1.1, 0.08, trim, 0.625, 0, 0.04));
  win.add(box(0.03, 1.0, 0.04, trim, 0, 0, 0.02));
  win.add(box(1.4, 0.04, 0.16, trim, 0, -0.57, 0.08));
  hang(win, "left", -0.3, 1.52);
  root.add(win);

  const callig = tag(new THREE.Group(), "calligraphy");
  [
    ["خط", 0.85],
    ["قلم", 1.55],
  ].forEach(([word, z]) => {
    const tex = paint(384, 512, T.paintCalligraphy(word, fonts));
    callig.add(hang(framed(0.42, 0.56, tex, "#0e2240", 0.03, 0.03), "left", z, 1.5));
  });
  root.add(callig);
  pickables.push(callig);

  // Right wall, past the shelves: her name from Type Garden, framed.
  root.add(hang(framed(0.78, 0.55, gardenPrint(), "#0e2240", 0.03, 0.03), "right", 1.55, 1.55));

  // ---------- Front wall: door and pinboard ----------
  const door = new THREE.Group();
  door.add(box(0.92, 2.06, 0.05, std("#c9d6ef", { roughness: 0.6 }), 0, 1.03, 0.025));
  door.add(box(1.02, 0.05, 0.07, trim, 0, 2.085, 0.035));
  door.add(box(0.05, 2.11, 0.07, trim, -0.485, 1.055, 0.035));
  door.add(box(0.05, 2.11, 0.07, trim, 0.485, 1.055, 0.035));
  const knob = mesh(new THREE.SphereGeometry(0.03, 16, 12), chrome);
  knob.position.set(0.36, 1.0, 0.08);
  door.add(knob);
  hang(door, "front", 1.3, 0);
  root.add(door);

  const boardGroup = tag(new THREE.Group(), "board");
  const boardTex2 = paint(560, 380, T.paintBoard(fonts));
  boardGroup.add(framed(0.9, 0.61, boardTex2, "#8fa6cf", 0.02, 0.02));
  hang(boardGroup, "front", -0.95, 1.45);
  root.add(boardGroup);
  pickables.push(boardGroup);

  // Where each spot is (for the dots) and where you stand to look at it.
  const anchors = Object.fromEntries(Object.entries(ANCHORS).map(([k, a]) => [k, v(...a)]));
  const views = Object.fromEntries(Object.entries(VIEWS).map(([k, w]) => [k, { pos: v(...w.pos), target: v(...w.target) }]));

  // Shadows only where they help (and only when the device can afford them).
  root.traverse((o) => {
    if (!shadows && o.isMesh) {
      o.castShadow = false;
      o.receiveShadow = false;
    }
  });

  function setNight(night) {
    windowMat.map = night ? nightTex : dayTex;
    windowMat.needsUpdate = true;
    ceilingLampMat.emissiveIntensity = night ? 1.4 : 0;
  }

  return { root, screen: desk.screen, pickables, anchors, views, lamp: desk.lamp, setNight, repaint, turntable };
}
