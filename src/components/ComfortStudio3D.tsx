import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Layers, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

type ViewMode = 'assembled' | 'exploded';
type CameraPreset = 'quarter' | 'cutaway' | 'overhead';

const CAMERA_PRESETS: Record<
  CameraPreset,
  { pos: [number, number, number]; look: [number, number, number]; label: string }
> = {
  quarter: {
    pos: [3.65, 2.35, 4.15],
    look: [0, 0.72, -0.1],
    label: 'Showroom Angle',
  },
  cutaway: {
    pos: [4.45, 1.75, 0.85],
    look: [0, 0.88, -0.1],
    label: 'Side Layer Profile',
  },
  overhead: {
    pos: [0.05, 4.35, 3.1],
    look: [0, 0.55, -0.15],
    label: 'Bedding Proportions',
  },
};

function createQuiltedFabricTexture(maxAnisotropy: number): {
  colorMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const size = 256;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const cCtx = colorCanvas.getContext('2d')!;

  cCtx.fillStyle = '#F7F2E8';
  cCtx.fillRect(0, 0, size, size);

  cCtx.strokeStyle = '#DFD5C3';
  cCtx.lineWidth = 2;
  const step = 32;
  for (let i = -size; i < size * 2; i += step) {
    cCtx.beginPath();
    cCtx.moveTo(i, 0);
    cCtx.lineTo(i + size, size);
    cCtx.stroke();

    cCtx.beginPath();
    cCtx.moveTo(i + size, 0);
    cCtx.lineTo(i, size);
    cCtx.stroke();
  }

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;
  bCtx.fillStyle = '#EAEAEA';
  bCtx.fillRect(0, 0, size, size);
  bCtx.strokeStyle = '#888888';
  bCtx.lineWidth = 3;
  for (let i = -size; i < size * 2; i += step) {
    bCtx.beginPath();
    bCtx.moveTo(i, 0);
    bCtx.lineTo(i + size, size);
    bCtx.stroke();

    bCtx.beginPath();
    bCtx.moveTo(i + size, 0);
    bCtx.lineTo(i, size);
    bCtx.stroke();
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(5, 6);
  colorMap.anisotropy = maxAnisotropy;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(5, 6);
  bumpMap.anisotropy = maxAnisotropy;

  return { colorMap, bumpMap };
}

function createWalnutTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#4A3323';
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 3) {
    const shade = Math.sin(y * 0.14) * 10 + (y % 7 === 0 ? -8 : 4);
    const r = Math.min(255, Math.max(0, 74 + shade));
    const g = Math.min(255, Math.max(0, 51 + shade * 0.7));
    const b = Math.min(255, Math.max(0, 35 + shade * 0.5));
    ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    ctx.fillRect(0, y, 256, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.12,
    size / 2,
    size / 2,
    size * 0.48
  );
  grad.addColorStop(0, 'rgba(31, 25, 20, 0.42)');
  grad.addColorStop(0.65, 'rgba(31, 25, 20, 0.16)');
  grad.addColorStop(1, 'rgba(31, 25, 20, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function createRoundedSlabGeometry(
  width: number,
  height: number,
  depth: number,
  bevel = 0.035
): THREE.ExtrudeGeometry {
  const w = width - bevel * 2;
  const d = depth - bevel * 2;
  const r = Math.min(0.08, w * 0.08, d * 0.08);
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;

  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.quadraticCurveTo(hw, hd, hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.02, height - bevel * 2),
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

export const ComfortStudio3D: React.FC = () => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('exploded');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('quarter');
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const stateRef = useRef<{
    viewMode: ViewMode;
    cameraPreset: CameraPreset;
    userYawOffset: number;
    requestRender: (() => void) | null;
  }>({
    viewMode: 'exploded',
    cameraPreset: 'quarter',
    userYawOffset: 0,
    requestRender: null,
  });

  useEffect(() => {
    stateRef.current.viewMode = viewMode;
    stateRef.current.requestRender?.();
  }, [viewMode]);

  useEffect(() => {
    stateRef.current.cameraPreset = cameraPreset;
    stateRef.current.userYawOffset = 0;
    stateRef.current.requestRender?.();
  }, [cameraPreset]);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let glProbe: WebGL2RenderingContext | WebGLRenderingContext | null = null;
    try {
      const probeCanvas = document.createElement('canvas');
      glProbe =
        probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    } catch {
      glProbe = null;
    }

    if (!glProbe) {
      setWebglSupported(false);
      return;
    }

    const isSoftwareGl = (() => {
      const ext = glProbe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glProbe.RENDERER;
      const gpu = String(glProbe.getParameter(param));
      glProbe.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const initialW = Math.max(mount.clientWidth, 300);
    const initialH = Math.max(mount.clientHeight, 360);
    renderer.setSize(initialW, initialH);
    renderer.domElement.className = 'w-full h-full block touch-pan-y cursor-grab active:cursor-grabbing';
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const bgHex = 0xf3ede2;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.Fog(bgHex, 10, 24);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envMap = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(36, initialW / initialH, 0.1, 45);
    camera.position.set(...CAMERA_PRESETS.quarter.pos);
    camera.lookAt(...CAMERA_PRESETS.quarter.look);

    // Balanced 3-point warm/cool studio lighting
    const hemiLight = new THREE.HemisphereLight(0xfaf6ef, 0xc9bba6, 0.72);
    hemiLight.position.set(0, 8, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.45);
    keyLight.position.set(4.5, 6.2, 4.2);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      const d = 3.2;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 16;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe5eef7, 0.52);
    rimLight.position.set(-4.2, 3.8, -3.6);
    scene.add(rimLight);

    // Procedural Textures & Materials
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const walnutTex = createWalnutTexture(maxAniso);
    const { colorMap: quiltColor, bumpMap: quiltBump } =
      createQuiltedFabricTexture(maxAniso);
    const shadowTex = createContactShadowTexture();

    const disposables: Array<{ dispose: () => void }> = [
      envMap,
      walnutTex,
      quiltColor,
      quiltBump,
      shadowTex,
    ];

    const floorGeo = new THREE.PlaneGeometry(36, 36);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf3ede2,
      roughness: 0.95,
      metalness: 0.0,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Grounded Contact Shadow Plane (disjoint Y = 0.015)
    const contactGeo = new THREE.PlaneGeometry(3.5, 4.1);
    contactGeo.rotateX(-Math.PI / 2);
    const contactMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const contactShadow = new THREE.Mesh(contactGeo, contactMat);
    contactShadow.position.set(0, 0.015, 0);
    scene.add(contactShadow);
    disposables.push(contactGeo, contactMat);

    // Composite 10-Part Bed & Layered Mattress Architecture Group
    const sanctuaryGroup = new THREE.Group();
    scene.add(sanctuaryGroup);

    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: walnutTex,
      roughness: 0.42,
      metalness: 0.06,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4b680,
      roughness: 0.2,
      metalness: 0.86,
    });
    const boucleHeadboardMat = new THREE.MeshStandardMaterial({
      color: 0xe5dccd,
      roughness: 0.88,
      metalness: 0.02,
    });
    const coreSupportMat = new THREE.MeshStandardMaterial({
      color: 0xd7cbb8,
      roughness: 0.78,
      metalness: 0.02,
    });
    const transitionFoamMat = new THREE.MeshStandardMaterial({
      color: 0xede5d7,
      roughness: 0.72,
      metalness: 0.02,
    });
    const quiltedTopMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: quiltColor,
      bumpMap: quiltBump,
      bumpScale: 0.012,
      roughness: 0.68,
      metalness: 0.02,
    });
    const pipingMat = new THREE.MeshStandardMaterial({
      color: 0x3b2d23,
      roughness: 0.5,
      metalness: 0.1,
    });
    const linenThrowMat = new THREE.MeshStandardMaterial({
      color: 0xcab99f,
      roughness: 0.86,
      metalness: 0.02,
    });
    const pillowIvoryMat = new THREE.MeshStandardMaterial({
      color: 0xfaf7f0,
      roughness: 0.76,
      metalness: 0.01,
    });
    const cushionAccentMat = new THREE.MeshStandardMaterial({
      color: 0xb69c78,
      roughness: 0.82,
      metalness: 0.04,
    });

    disposables.push(
      walnutMat,
      brassMat,
      boucleHeadboardMat,
      coreSupportMat,
      transitionFoamMat,
      quiltedTopMat,
      pipingMat,
      linenThrowMat,
      pillowIvoryMat,
      cushionAccentMat
    );

    // 1. Tapered Walnut Legs + Brushed Champagne Brass Ferrules (Grounded at y=0)
    const legGeo = new THREE.CylinderGeometry(0.048, 0.032, 0.22, 16);
    const ferruleGeo = new THREE.CylinderGeometry(0.034, 0.031, 0.045, 16);
    disposables.push(legGeo, ferruleGeo);

    const legOffsets: Array<[number, number]> = [
      [-0.96, -1.22],
      [0.96, -1.22],
      [-0.96, 1.22],
      [0.96, 1.22],
    ];
    legOffsets.forEach(([lx, lz]) => {
      const ferrule = new THREE.Mesh(ferruleGeo, brassMat);
      ferrule.position.set(lx, 0.0225, lz);
      sanctuaryGroup.add(ferrule);

      const leg = new THREE.Mesh(legGeo, walnutMat);
      leg.position.set(lx, 0.13, lz);
      leg.castShadow = !isSoftwareGl;
      sanctuaryGroup.add(leg);
    });

    // 2. Beveled Dark Walnut Platform Frame
    const frameGeo = createRoundedSlabGeometry(2.14, 0.16, 2.66, 0.025);
    disposables.push(frameGeo);
    const frameMesh = new THREE.Mesh(frameGeo, walnutMat);
    frameMesh.position.set(0, 0.24, 0);
    frameMesh.castShadow = !isSoftwareGl;
    frameMesh.receiveShadow = !isSoftwareGl;
    sanctuaryGroup.add(frameMesh);

    // 3. Channel-Tufted Oatmeal Headboard + Walnut Outer Trim
    const headboardGroup = new THREE.Group();
    headboardGroup.position.set(0, 0.24, -1.28);
    sanctuaryGroup.add(headboardGroup);

    const hbBackingGeo = createRoundedSlabGeometry(2.22, 1.28, 0.11, 0.02);
    disposables.push(hbBackingGeo);
    const hbBacking = new THREE.Mesh(hbBackingGeo, walnutMat);
    hbBacking.castShadow = !isSoftwareGl;
    headboardGroup.add(hbBacking);

    const channelGeo = createRoundedSlabGeometry(0.28, 1.12, 0.08, 0.022);
    disposables.push(channelGeo);
    for (let i = -3; i <= 3; i++) {
      const panel = new THREE.Mesh(channelGeo, boucleHeadboardMat);
      panel.position.set(i * 0.295, 0.08, 0.048);
      panel.castShadow = !isSoftwareGl;
      headboardGroup.add(panel);
    }

    // 4. Layer 1: Orthopedic Support Foundation Core
    const coreGroup = new THREE.Group();
    const coreGeo = createRoundedSlabGeometry(1.98, 0.2, 2.46, 0.03);
    disposables.push(coreGeo);
    const coreMesh = new THREE.Mesh(coreGeo, coreSupportMat);
    coreMesh.castShadow = !isSoftwareGl;
    coreMesh.receiveShadow = !isSoftwareGl;
    coreGroup.add(coreMesh);
    sanctuaryGroup.add(coreGroup);

    // 5. Layer 2: Adaptive Comfort Transition Layer
    const comfortGroup = new THREE.Group();
    const comfortGeo = createRoundedSlabGeometry(1.98, 0.13, 2.46, 0.028);
    disposables.push(comfortGeo);
    const comfortMesh = new THREE.Mesh(comfortGeo, transitionFoamMat);
    comfortMesh.castShadow = !isSoftwareGl;
    comfortMesh.receiveShadow = !isSoftwareGl;
    comfortGroup.add(comfortMesh);
    sanctuaryGroup.add(comfortGroup);

    // 6. Layer 3: Quilted Organic Knit Euro-Top + Tailored Piping
    const euroTopGroup = new THREE.Group();
    const euroGeo = createRoundedSlabGeometry(1.99, 0.11, 2.47, 0.032);
    const pipingGeo = createRoundedSlabGeometry(2.005, 0.022, 2.485, 0.008);
    disposables.push(euroGeo, pipingGeo);

    const pipingBottom = new THREE.Mesh(pipingGeo, pipingMat);
    pipingBottom.position.y = 0.002;
    euroTopGroup.add(pipingBottom);

    const euroMesh = new THREE.Mesh(euroGeo, quiltedTopMat);
    euroMesh.position.y = 0.015;
    euroMesh.castShadow = !isSoftwareGl;
    euroMesh.receiveShadow = !isSoftwareGl;
    euroTopGroup.add(euroMesh);
    sanctuaryGroup.add(euroTopGroup);

    // 7. Layer 4: Draped Foot Throw + Plush Sleeping Pillows & Accent Cushions
    const beddingTopGroup = new THREE.Group();
    const throwGeo = createRoundedSlabGeometry(2.03, 0.055, 0.78, 0.022);
    const pillowGeo = createRoundedSlabGeometry(0.76, 0.15, 0.44, 0.048);
    const accentCushionGeo = createRoundedSlabGeometry(0.52, 0.14, 0.32, 0.042);
    disposables.push(throwGeo, pillowGeo, accentCushionGeo);

    const throwSideGeo = createRoundedSlabGeometry(0.06, 0.22, 0.78, 0.018);
    disposables.push(throwSideGeo);

    const throwMesh = new THREE.Mesh(throwGeo, linenThrowMat);
    throwMesh.position.set(0, 0.01, 0.76);
    throwMesh.castShadow = !isSoftwareGl;
    beddingTopGroup.add(throwMesh);

    const throwLeftDrape = new THREE.Mesh(throwSideGeo, linenThrowMat);
    throwLeftDrape.position.set(-1.005, -0.18, 0.76);
    beddingTopGroup.add(throwLeftDrape);

    const throwRightDrape = new THREE.Mesh(throwSideGeo, linenThrowMat);
    throwRightDrape.position.set(1.005, -0.18, 0.76);
    beddingTopGroup.add(throwRightDrape);

    const leftPillow = new THREE.Mesh(pillowGeo, pillowIvoryMat);
    leftPillow.position.set(-0.46, 0.06, -0.88);
    leftPillow.rotation.x = 0.18;
    leftPillow.castShadow = !isSoftwareGl;
    beddingTopGroup.add(leftPillow);

    const rightPillow = new THREE.Mesh(pillowGeo, pillowIvoryMat);
    rightPillow.position.set(0.46, 0.06, -0.88);
    rightPillow.rotation.x = 0.18;
    rightPillow.castShadow = !isSoftwareGl;
    beddingTopGroup.add(rightPillow);

    const centerCushion = new THREE.Mesh(accentCushionGeo, cushionAccentMat);
    centerCushion.position.set(0, 0.075, -0.62);
    centerCushion.rotation.x = 0.24;
    centerCushion.castShadow = !isSoftwareGl;
    beddingTopGroup.add(centerCushion);

    sanctuaryGroup.add(beddingTopGroup);

    // Layer Y Coordinates (Assembled vs Exploded)
    const ASSEMBLED_Y = {
      core: 0.395,
      comfort: 0.585,
      euro: 0.705,
      bedding: 0.815,
    };
    const EXPLODED_Y = {
      core: 0.45,
      comfort: 0.82,
      euro: 1.15,
      bedding: 1.48,
    };

    const initialTargets =
      stateRef.current.viewMode === 'exploded' ? EXPLODED_Y : ASSEMBLED_Y;
    coreGroup.position.y = initialTargets.core;
    comfortGroup.position.y = initialTargets.comfort;
    euroTopGroup.position.y = initialTargets.euro;
    beddingTopGroup.position.y = initialTargets.bedding;

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Reusable scratch vectors (Zero GC inside render loop)
    const currentCamPos = new THREE.Vector3(...CAMERA_PRESETS.quarter.pos);
    const currentLookAt = new THREE.Vector3(...CAMERA_PRESETS.quarter.look);
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    let frameId = 0;
    let timeoutId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTimestamp = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            timeoutId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            timeoutId = window.setTimeout(cb, 80);
          }
        };
        timeoutId = window.setTimeout(poll, 5);
      } else {
        timeoutId = window.setTimeout(cb, 80);
      }
    }

    function stepSimulation(dt: number): boolean {
      const targets =
        stateRef.current.viewMode === 'exploded' ? EXPLODED_Y : ASSEMBLED_Y;
      const preset = CAMERA_PRESETS[stateRef.current.cameraPreset];

      const baseVec = targetCamPos.set(...preset.pos);
      const yaw = stateRef.current.userYawOffset;
      if (Math.abs(yaw) > 0.0001) {
        const cos = Math.cos(yaw);
        const sin = Math.sin(yaw);
        const rx = baseVec.x * cos - baseVec.z * sin;
        const rz = baseVec.x * sin + baseVec.z * cos;
        targetCamPos.set(rx, baseVec.y, rz);
      }
      targetLookAt.set(...preset.look);

      if (prefersReducedMotion) {
        coreGroup.position.y = targets.core;
        comfortGroup.position.y = targets.comfort;
        euroTopGroup.position.y = targets.euro;
        beddingTopGroup.position.y = targets.bedding;
        currentCamPos.copy(targetCamPos);
        currentLookAt.copy(targetLookAt);
        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);
        return false;
      }

      const lambda = 7.5;
      coreGroup.position.y = THREE.MathUtils.damp(
        coreGroup.position.y,
        targets.core,
        lambda,
        dt
      );
      comfortGroup.position.y = THREE.MathUtils.damp(
        comfortGroup.position.y,
        targets.comfort,
        lambda,
        dt
      );
      euroTopGroup.position.y = THREE.MathUtils.damp(
        euroTopGroup.position.y,
        targets.euro,
        lambda,
        dt
      );
      beddingTopGroup.position.y = THREE.MathUtils.damp(
        beddingTopGroup.position.y,
        targets.bedding,
        lambda,
        dt
      );

      currentCamPos.x = THREE.MathUtils.damp(
        currentCamPos.x,
        targetCamPos.x,
        lambda,
        dt
      );
      currentCamPos.y = THREE.MathUtils.damp(
        currentCamPos.y,
        targetCamPos.y,
        lambda,
        dt
      );
      currentCamPos.z = THREE.MathUtils.damp(
        currentCamPos.z,
        targetCamPos.z,
        lambda,
        dt
      );

      currentLookAt.x = THREE.MathUtils.damp(
        currentLookAt.x,
        targetLookAt.x,
        lambda,
        dt
      );
      currentLookAt.y = THREE.MathUtils.damp(
        currentLookAt.y,
        targetLookAt.y,
        lambda,
        dt
      );
      currentLookAt.z = THREE.MathUtils.damp(
        currentLookAt.z,
        targetLookAt.z,
        lambda,
        dt
      );

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      const remaining =
        Math.abs(coreGroup.position.y - targets.core) +
        Math.abs(euroTopGroup.position.y - targets.euro) +
        Math.abs(beddingTopGroup.position.y - targets.bedding) +
        currentCamPos.distanceTo(targetCamPos);

      return remaining > 0.004;
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        const dt = Math.min(0.22, Math.max(0.012, (now - lastTimestamp) / 1000));
        lastTimestamp = now;

        const stillMoving = stepSimulation(dt);
        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty || stillMoving) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    stateRef.current.requestRender = requestRender;
    requestRender();

    // Pointer horizontal drag rotation
    let dragging = false;
    let lastClientX = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastClientX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastClientX;
      lastClientX = e.clientX;
      stateRef.current.userYawOffset = THREE.MathUtils.clamp(
        stateRef.current.userYawOffset - dx * 0.006,
        -0.85,
        0.85
      );
      requestRender();
    };
    const onPointerUp = () => {
      dragging = false;
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglSupported(false);
    };
    canvasEl.addEventListener('webglcontextlost', onContextLost);

    const onResize = () => {
      if (!mount) return;
      const w = Math.max(mount.clientWidth, 280);
      const h = Math.max(mount.clientHeight, 320);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };
    window.addEventListener('resize', onResize);

    return () => {
      stateRef.current.requestRender = null;
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      canvasEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvasEl.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('resize', onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <section
      aria-labelledby="comfort-studio-heading"
      className="py-20 sm:py-24 bg-[#FAF7F2]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
              <span>INTERACTIVE 3D STUDIO</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>LAYERED ARCHITECTURE</span>
            </p>
            <h2
              id="comfort-studio-heading"
              className="font-editorial text-3xl sm:text-4xl text-[#1F1C1A]"
            >
              Anatomy of a Restful Sanctuary
            </h2>
          </div>

          <p className="text-sm text-[#5A514A] max-w-md leading-[1.65]">
            Inspect how a solid bed frame, supportive mattress core, quilted comfort
            layers, and breathable bed linen work together in harmony. Drag horizontally
            to rotate.
          </p>
        </div>

        {/* 3D Viewport Container */}
        <div
          data-testid="comfort-3d-studio"
          data-view-mode={viewMode}
          className="relative w-full h-[430px] sm:h-[500px] rounded-xl overflow-hidden border border-[#1F1C1A]/10 bg-[#F3EDE2] shadow-[0_18px_44px_rgba(31,28,26,0.06)]"
        >
          {webglSupported ? (
            <div ref={canvasMountRef} className="w-full h-full" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F3EDE2]">
              <Layers className="w-10 h-10 text-[#8C6F41] mb-3" strokeWidth={1.4} />
              <p className="font-editorial text-2xl text-[#1F1C1A] mb-2">
                Multi-Layer Bedroom Comfort System
              </p>
              <p className="text-sm text-[#5A514A] max-w-md">
                Combining supportive mattress foundations, plush quilted surfaces,
                breathable cotton bedsheets, and soft sleeping pillows.
              </p>
            </div>
          )}

          {/* Minimal Unboxed Top-Left Spec Kicker */}
          <div className="pointer-events-none absolute top-4 left-5 sm:top-5 sm:left-6">
            <p className="text-xs tracking-[0.12em] font-medium text-[#5A514A]">
              {viewMode === 'exploded'
                ? 'EXPLODED VIEW · 4 COMFORT LAYERS'
                : 'ASSEMBLED VIEW · COMPLETE BED ENSEMBLE'}
            </p>
          </div>

          {/* Unified Collapsible Bottom Control Dock (Zero backdrop-filter over WebGL) */}
          {webglSupported && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[780px] flex flex-col items-center z-10">
              <button
                type="button"
                onClick={() => setDockCollapsed((prev) => !prev)}
                aria-expanded={!dockCollapsed}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#231F1D] bg-[#FAF7F2] border border-[#1F1C1A]/12 rounded-t-md hover:bg-[#FFFFFF] transition-colors whitespace-nowrap"
              >
                {dockCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Show Studio Controls</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Hide Controls</span>
                  </>
                )}
              </button>

              {!dockCollapsed && (
                <div className="w-full bg-[#FAF7F2] border border-[#1F1C1A]/12 rounded-lg p-2.5 sm:px-4 sm:py-3 shadow-[0_12px_30px_rgba(31,28,26,0.12)] flex flex-wrap items-center justify-between gap-2.5">
                  {/* Layer Separation Toggle */}
                  <div
                    role="group"
                    aria-label="Mattress layer view mode"
                    className="flex items-center gap-1 p-1 bg-[#EAE2D4] rounded-md"
                  >
                    <button
                      type="button"
                      onClick={() => setViewMode('exploded')}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                        viewMode === 'exploded'
                          ? 'bg-[#231F1D] text-[#FAF7F2]'
                          : 'text-[#3F3934] hover:text-[#1F1C1A]'
                      }`}
                    >
                      Exploded Layers
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('assembled')}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                        viewMode === 'assembled'
                          ? 'bg-[#231F1D] text-[#FAF7F2]'
                          : 'text-[#3F3934] hover:text-[#1F1C1A]'
                      }`}
                    >
                      Assembled Bed
                    </button>
                  </div>

                  {/* Camera Presets */}
                  <div
                    role="group"
                    aria-label="Camera perspective presets"
                    className="flex items-center gap-1.5 flex-wrap"
                  >
                    {(Object.keys(CAMERA_PRESETS) as CameraPreset[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCameraPreset(key)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                          cameraPreset === key
                            ? 'bg-[#FFFFFF] border-[#8C6F41] text-[#1F1C1A]'
                            : 'bg-transparent border-[#1F1C1A]/12 text-[#5A514A] hover:text-[#1F1C1A]'
                        }`}
                      >
                        {CAMERA_PRESETS[key].label}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        stateRef.current.userYawOffset = 0;
                        setCameraPreset('quarter');
                        setViewMode('exploded');
                        stateRef.current.requestRender?.();
                      }}
                      aria-label="Reset 3D camera view"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#1F1C1A]/12 text-[#3F3934] hover:bg-[#FFFFFF] transition-colors shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clean 4-Column Layer Legend Below Viewport */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          <div className="p-4 rounded-lg bg-[#F5EFE5] border border-[#1F1C1A]/6">
            <p className="text-xs text-[#8C6F41] font-medium mb-1 tabular-nums">
              01 · Top Ensemble
            </p>
            <p className="text-sm font-semibold text-[#1F1C1A] mb-1">
              Pillows, Linen &amp; Throws
            </p>
            <p className="text-xs leading-relaxed text-[#5A514A]">
              Breathable sheets, supportive sleeping pillows, and seasonal comforters.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#F5EFE5] border border-[#1F1C1A]/6">
            <p className="text-xs text-[#8C6F41] font-medium mb-1 tabular-nums">
              02 · Surface Comfort
            </p>
            <p className="text-sm font-semibold text-[#1F1C1A] mb-1">
              Quilted Knit Top Layer
            </p>
            <p className="text-xs leading-relaxed text-[#5A514A]">
              Soft-touch quilted top cushioning designed for gentle surface feel.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#F5EFE5] border border-[#1F1C1A]/6">
            <p className="text-xs text-[#8C6F41] font-medium mb-1 tabular-nums">
              03 · Support Core
            </p>
            <p className="text-sm font-semibold text-[#1F1C1A] mb-1">
              Mattress Foundation
            </p>
            <p className="text-xs leading-relaxed text-[#5A514A]">
              Balanced body support across plush, medium, or firm mattress constructions.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#F5EFE5] border border-[#1F1C1A]/6">
            <p className="text-xs text-[#8C6F41] font-medium mb-1 tabular-nums">
              04 · Architectural Base
            </p>
            <p className="text-sm font-semibold text-[#1F1C1A] mb-1">
              Tailored Bed Frame
            </p>
            <p className="text-xs leading-relaxed text-[#5A514A]">
              Elegant queen-size bed proportions with warm upholstery and timber tones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
