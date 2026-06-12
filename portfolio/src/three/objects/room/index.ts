import { resources } from "../../../utils/resources";
import { scene } from "../../core/scene";
import {
  Box3,
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  Euler,
  Group,
  LinearSRGBColorSpace,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
} from "three";
import { getRoomMaterial } from "../../common/materials";
import { sceneWeights } from "../../../animations/scenes";
import gsap from "gsap";
import { shadow } from "./shadow";
import { desktops } from "./desktops";
import { mouse } from "./mouse";
import { messagePopup } from "./message-popup";
import { music } from "./music";

import type { Object3D } from "three";

const group = new Group();
const chairScrollRotation = new Euler();

let objects: {
  blackboard: Mesh;
  carpet: Mesh;
  chair: Mesh;
  frame: Mesh;
  mouse: Mesh;
  music: Mesh;
  plant: Mesh;
  room: Mesh;
  shelf: Mesh;
} | null = null;

const init = () => {
  gsap.ticker.add(tick);
  initObjects();
  shadow.init();
  desktops.init();
  messagePopup.init();
  if (objects?.mouse) mouse.init(objects.mouse);

  if (objects?.music) music.init(objects.music);
};

const createMedal = () => {
  const medalGroup = new Group();

  const whiteMatcap = resources.items["matcap-white"];
  whiteMatcap.colorSpace = LinearSRGBColorSpace;
  whiteMatcap.generateMipmaps = false;

  const goldMaterial = new MeshMatcapMaterial({
    matcap: whiteMatcap,
    color: new Color("#f5c542"),
  });

  const darkGoldMaterial = new MeshMatcapMaterial({
    matcap: whiteMatcap,
    color: new Color("#b97818"),
  });

  const cordMaterial = new MeshMatcapMaterial({
    matcap: whiteMatcap,
    color: new Color("#2f2a24"),
  });

  const ribbonMaterial = new MeshMatcapMaterial({
    matcap: whiteMatcap,
    color: new Color("#2452b8"),
  });

  const ribbonAccentMaterial = new MeshMatcapMaterial({
    matcap: whiteMatcap,
    color: new Color("#c72d43"),
  });

  const pinGeo = new CylinderGeometry(0.035, 0.035, 0.012, 24);
  const pin = new Mesh(pinGeo, darkGoldMaterial);
  pin.rotation.x = Math.PI / 2;
  pin.position.set(0, 0.42, 0.006);
  medalGroup.add(pin);

  const cordGeo = new BoxGeometry(0.012, 0.34, 0.004);
  const cordL = new Mesh(cordGeo, cordMaterial);
  cordL.position.set(-0.03, 0.24, 0);
  cordL.rotation.z = -0.12;
  medalGroup.add(cordL);

  const cordR = new Mesh(cordGeo, cordMaterial);
  cordR.position.set(0.03, 0.24, 0);
  cordR.rotation.z = 0.12;
  medalGroup.add(cordR);

  const ring = new Mesh(new TorusGeometry(0.042, 0.008, 8, 28), darkGoldMaterial);
  ring.position.set(0, 0.07, 0.008);
  medalGroup.add(ring);

  const ribbonLGeo = new BoxGeometry(0.042, 0.28, 0.006);
  const ribbonL = new Mesh(ribbonLGeo, ribbonMaterial);
  ribbonL.position.set(-0.04, -0.065, 0);
  ribbonL.rotation.z = -0.24;
  medalGroup.add(ribbonL);

  const ribbonRGeo = new BoxGeometry(0.042, 0.28, 0.006);
  const ribbonR = new Mesh(ribbonRGeo, ribbonMaterial);
  ribbonR.position.set(0.04, -0.065, 0);
  ribbonR.rotation.z = 0.24;
  medalGroup.add(ribbonR);

  const accentGeo = new BoxGeometry(0.028, 0.24, 0.008);
  const accent = new Mesh(accentGeo, ribbonAccentMaterial);
  accent.position.set(0, -0.065, 0.004);
  medalGroup.add(accent);

  const coinGeo = new CylinderGeometry(0.085, 0.085, 0.018, 40);
  const coin = new Mesh(coinGeo, goldMaterial);
  coin.rotation.x = Math.PI / 2;
  coin.position.set(0, -0.245, 0.014);
  medalGroup.add(coin);

  const innerCoin = new Mesh(new CylinderGeometry(0.058, 0.058, 0.012, 40), darkGoldMaterial);
  innerCoin.rotation.x = Math.PI / 2;
  innerCoin.position.set(0, -0.245, 0.028);
  medalGroup.add(innerCoin);

  const numberStem = new Mesh(new BoxGeometry(0.018, 0.068, 0.01), goldMaterial);
  numberStem.position.set(0.004, -0.243, 0.038);
  medalGroup.add(numberStem);

  const numberBase = new Mesh(new BoxGeometry(0.054, 0.014, 0.01), goldMaterial);
  numberBase.position.set(0, -0.282, 0.038);
  medalGroup.add(numberBase);

  return medalGroup;
};

const createSoftBridgePosterTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;

  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = "#fff2a6";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#ff4f79";
  context.beginPath();
  context.moveTo(512, 42);
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const radius = i % 2 === 0 ? 440 : 190;
    context.lineTo(512 + Math.cos(angle) * radius, 320 + Math.sin(angle) * radius);
  }
  context.closePath();
  context.fill();

  context.fillStyle = "#ffe761";
  for (let y = 34; y < canvas.height; y += 48) {
    for (let x = 34; x < canvas.width; x += 48) {
      context.beginPath();
      context.arc(x, y, 9, 0, Math.PI * 2);
      context.fill();
    }
  }

  context.lineWidth = 18;
  context.strokeStyle = "#111111";
  context.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";

  context.font = '900 132px "Comic Sans MS", Impact, sans-serif';
  context.lineWidth = 18;
  context.strokeStyle = "#111111";
  context.fillStyle = "#ffffff";
  context.shadowColor = "#1c73ff";
  context.shadowBlur = 0;
  context.shadowOffsetX = 16;
  context.shadowOffsetY = 16;
  context.strokeText("SoftBridge", 512, 268);
  context.fillText("SoftBridge", 512, 268);

  context.font = '900 104px "Comic Sans MS", Impact, sans-serif';
  context.fillStyle = "#2bffe4";
  context.strokeText("Solutions", 512, 404);
  context.fillText("Solutions", 512, 404);

  context.shadowColor = "transparent";
  context.font = '900 42px "Comic Sans MS", Impact, sans-serif';
  context.lineWidth = 8;
  context.fillStyle = "#111111";
  context.strokeStyle = "#ffffff";
  context.strokeText("BAM!", 186, 126);
  context.fillText("BAM!", 186, 126);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
};

const createSoftBridgeFrame = (sourceFrame?: Mesh) => {
  const poster = new Group();
  const whiteMatcap = resources.items["matcap-white"];
  whiteMatcap.colorSpace = LinearSRGBColorSpace;
  whiteMatcap.generateMipmaps = false;

  const bounds = sourceFrame ? new Box3().setFromObject(sourceFrame) : null;
  const center = new Vector3(-2.58, 3.26, -2.88);
  const size = new Vector3(0.1, 1.2, 1.38);

  if (bounds) {
    bounds.getCenter(center);
    bounds.getSize(size);
  }

  const width = Math.max(size.z * 0.82, 1);
  const height = Math.max(size.y * 0.78, 0.82);
  const depth = 0.08;
  const faceX = bounds ? bounds.max.x + 0.008 : center.x + depth * 0.5;

  const frameMaterial = new MeshMatcapMaterial({
    matcap: whiteMatcap,
    color: new Color("#12131a"),
  });

  const frame = new Mesh(new BoxGeometry(depth, height + 0.18, width + 0.18), frameMaterial);
  frame.position.set(faceX - depth * 0.5, center.y, center.z);
  poster.add(frame);

  const texture = createSoftBridgePosterTexture();
  if (texture) {
    const art = new Mesh(
      new PlaneGeometry(width, height),
      new MeshBasicMaterial({
        map: texture,
        side: DoubleSide,
      }),
    );
    art.rotation.y = Math.PI / 2;
    art.position.set(faceX + 0.003, center.y, center.z);
    poster.add(art);
  }

  return poster;
};

const initObjects = () => {
  if (objects) return;
  const resource = resources.items["room-model"];

  objects = {
    blackboard: resource.scene.children.find((child: Object3D) => child.name === "blackboard"),
    carpet: resource.scene.children.find((child: Object3D) => child.name === "carpet"),
    chair: resource.scene.children.find((child: Object3D) => child.name === "chair"),
    frame: resource.scene.children.find((child: Object3D) => child.name === "frame"),
    mouse: resource.scene.children.find((child: Object3D) => child.name === "mouse"),
    music: resource.scene.children.find((child: Object3D) => child.name === "music"),
    plant: resource.scene.children.find((child: Object3D) => child.name === "plant"),
    room: resource.scene.children.find((child: Object3D) => child.name === "room"),
    shelf: resource.scene.children.find((child: Object3D) => child.name === "shelf"),
  };

  Object.entries(objects).forEach(([key, object]) => {
    if (!object) return;
    if (key === "frame") return;
    const mat = getRoomMaterial();
    object.material = mat;
    group.add(object);

    if (object.name === "carpet") {
      object.renderOrder = -10;
      object.onBeforeRender = () => {
        mat.depthWrite = false;
      };

      object.onAfterRender = () => {
        mat.depthWrite = true;
      };
    }
  });

  group.add(createSoftBridgeFrame(objects.frame));

  const medal = createMedal();
  medal.position.set(-2.625, 4.1, 2.32);
  medal.rotation.y = Math.PI / 2;
  group.add(medal);

  scene.instance.add(group);
};

const tick = () => {
  group.visible = sceneWeights.hero > 0.001;

  if (objects?.chair) {
    objects.chair.rotation.copy(chairScrollRotation);
  }

  music.tick();
};

const destroy = () => {
  gsap.ticker.remove(tick);
  shadow.destroy();
  //group.clear();
  //objects = null;
  desktops.destroy();
  mouse.destroy();
  music.destroy();
};

export const room = { init, destroy, group, chairScrollRotation };
