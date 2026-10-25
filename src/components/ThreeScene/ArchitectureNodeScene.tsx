import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Layers, Eye, RefreshCw, Sliders, ChevronDown, ChevronUp, Box, Play, Pause, Sparkles } from 'lucide-react';

interface ArchitectureNodeSceneProps {
  onClose?: () => void;
  isFullBleed?: boolean;
}

export function ArchitectureNodeScene({ onClose, isFullBleed = false }: ArchitectureNodeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [explodedAmount, setExplodedAmount] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'core' | 'rings' | 'pods' | 'mesh'>('all');
  const [isWireframe, setIsWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  // Mutable refs for render loop
  const stateRef = useRef({
    explodedAmount: 0,
    rotationSpeed: 1,
    isRotating: true,
    isWireframe: false,
    selectedLayer: 'all',
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.explodedAmount = explodedAmount;
    stateRef.current.rotationSpeed = rotationSpeed;
    stateRef.current.isRotating = isRotating;
    stateRef.current.isWireframe = isWireframe;
    stateRef.current.selectedLayer = selectedLayer;
  }, [explodedAmount, rotationSpeed, isRotating, isWireframe, selectedLayer]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09122b);
    scene.fog = new THREE.FogExp2(0x09122b, 0.04);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Camera & Damped Orbit Controls
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 9);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent flipping below ground
    controls.minDistance = 3;
    controls.maxDistance = 18;

    // 4. Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const dirLight = new THREE.DirectionalLight(0xfff3e0, 2.2);
    dirLight.position.set(5, 10, 6);
    dirLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 25;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.normalBias = 0.02;
    }
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0x8aebff, 0x09122b, 1.4);
    scene.add(hemiLight);

    const cyanRimLight = new THREE.PointLight(0x22d3ee, 3.5, 15);
    cyanRimLight.position.set(-5, 2, -4);
    scene.add(cyanRimLight);

    // 6. Procedural Circuit Texture for Ground Bus Plate
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0B1020';
    ctx.fillRect(0, 0, 512, 512);

    // Draw concentric telemetry circuit rings
    ctx.strokeStyle = '#22D3EE';
    ctx.lineWidth = 2;
    for (let r = 40; r < 240; r += 35) {
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Crosshair ticks
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(angle) * 30, 256 + Math.sin(angle) * 30);
      ctx.lineTo(256 + Math.cos(angle) * 230, 256 + Math.sin(angle) * 230);
      ctx.stroke();
    }

    const groundTex = new THREE.CanvasTexture(canvas);
    groundTex.colorSpace = THREE.SRGBColorSpace;
    groundTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Ground Plate
    const groundGeo = new THREE.CylinderGeometry(5.2, 5.2, 0.1, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      metalness: 0.8,
      roughness: 0.25,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.05;
    groundMesh.receiveShadow = !isSoftwareGl;
    scene.add(groundMesh);

    // Soft Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(11, 11);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(4, 13, 38, 0.85)');
    grad.addColorStop(0.5, 'rgba(4, 13, 38, 0.4)');
    grad.addColorStop(1, 'rgba(4, 13, 38, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.02;
    scene.add(shadowPlane);

    // 7. COMPOSITE PROCEDURAL HERO MODEL (THREE.Group with 8 distinct parts)
    const heroModelGroup = new THREE.Group();
    heroModelGroup.position.set(0, 1.8, 0); // Center height
    scene.add(heroModelGroup);

    // PART 1: Central Quantum Core (Faceted Dodecahedron)
    const coreGeo = new THREE.DodecahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1428,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.35,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = !isSoftwareGl;
    heroModelGroup.add(coreMesh);

    // Inner glowing sphere inside core
    const innerLightGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const innerLightMat = new THREE.MeshBasicMaterial({
      color: 0x8aebff,
      wireframe: true,
    });
    const innerLightMesh = new THREE.Mesh(innerLightGeo, innerLightMat);
    coreMesh.add(innerLightMesh);

    // PART 2: Primary Gyroscopic Ring (Torus)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.08, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x9fc2ff,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.castShadow = !isSoftwareGl;
    heroModelGroup.add(ring1Mesh);

    // PART 3: Secondary Counter-Rotating Ring (Torus with Amber Accents)
    const ring2Geo = new THREE.TorusGeometry(2.1, 0.06, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.3,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = Math.PI / 3;
    ring2Mesh.castShadow = !isSoftwareGl;
    heroModelGroup.add(ring2Mesh);

    // PART 4: 4x Peripheral Agent Sensor Pods (LatheGeometry)
    const podsGroup = new THREE.Group();
    heroModelGroup.add(podsGroup);

    const podPoints: THREE.Vector2[] = [];
    podPoints.push(new THREE.Vector2(0, 0));
    podPoints.push(new THREE.Vector2(0.2, 0.1));
    podPoints.push(new THREE.Vector2(0.25, 0.35));
    podPoints.push(new THREE.Vector2(0.18, 0.6));
    podPoints.push(new THREE.Vector2(0, 0.7));

    const podGeo = new THREE.LatheGeometry(podPoints, 16);
    const podMat = new THREE.MeshStandardMaterial({
      color: 0x1a2447,
      metalness: 0.8,
      roughness: 0.25,
    });

    const lensGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });

    const podAngles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
    const podMeshes: THREE.Mesh[] = [];

    podAngles.forEach((angle) => {
      const pMesh = new THREE.Mesh(podGeo, podMat);
      pMesh.position.set(Math.cos(angle) * 2.7, 0, Math.sin(angle) * 2.7);
      pMesh.rotation.z = Math.PI / 2;
      pMesh.rotation.y = -angle;

      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.y = 0.68;
      pMesh.add(lens);

      podsGroup.add(pMesh);
      podMeshes.push(pMesh);
    });

    // PART 5: 8x Distributed Microservices Mesh Nodes (InstancedMesh / Tubes)
    const meshGroup = new THREE.Group();
    heroModelGroup.add(meshGroup);

    const nodeBoxGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const nodeBoxMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      metalness: 0.7,
      roughness: 0.3,
    });

    const serviceNodes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.6;
      const sMesh = new THREE.Mesh(nodeBoxGeo, nodeBoxMat);
      sMesh.position.set(Math.cos(angle) * radius, (i % 2 === 0 ? 0.3 : -0.3), Math.sin(angle) * radius);
      meshGroup.add(sMesh);
      serviceNodes.push(sMesh);

      // Connecting spline tube to core
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * radius * 0.5, (i % 2 === 0 ? 0.5 : -0.5), Math.sin(angle) * radius * 0.5),
        sMesh.position.clone(),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.025, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x22d3ee : 0x9fc2ff,
        transparent: true,
        opacity: 0.6,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      meshGroup.add(tubeMesh);
    }

    // PART 6: Instanced Floating Data Packet Nodes (InstancedMesh for 40 particles)
    const particleGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x8aebff });
    const instancedParticles = new THREE.InstancedMesh(particleGeo, particleMat, 40);

    const dummy = new THREE.Object3D();
    const particleAngles: number[] = [];
    const particleRadii: number[] = [];
    const particleSpeeds: number[] = [];
    const particleY: number[] = [];

    for (let i = 0; i < 40; i++) {
      particleAngles.push(Math.random() * Math.PI * 2);
      particleRadii.push(1.2 + Math.random() * 2.8);
      particleSpeeds.push(0.5 + Math.random() * 1.5);
      particleY.push(-0.8 + Math.random() * 2.2);
    }
    heroModelGroup.add(instancedParticles);

    // 8. ANIMATION LOOP & KINEMATICS
    let frameId = 0;
    let clock = new THREE.Clock();

    // Pre-allocated scratch vectors
    const _scratchVec = new THREE.Vector3();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function animate() {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Read mutable states
      const { rotationSpeed: rSpeed, isRotating: rotating, explodedAmount: expAmt, isWireframe: wire, selectedLayer: layer } = stateRef.current;

      // Update wireframe state
      coreMat.wireframe = wire;
      ring1Mat.wireframe = wire;
      ring2Mat.wireframe = wire;
      podMat.wireframe = wire;
      nodeBoxMat.wireframe = wire;

      // Layer visibility
      coreMesh.visible = layer === 'all' || layer === 'core';
      ring1Mesh.visible = layer === 'all' || layer === 'rings';
      ring2Mesh.visible = layer === 'all' || layer === 'rings';
      podsGroup.visible = layer === 'all' || layer === 'pods';
      meshGroup.visible = layer === 'all' || layer === 'mesh';

      // Smooth kinematics & rotations
      if (rotating) {
        const speedMultiplier = rSpeed * delta;
        coreMesh.rotation.y += 0.8 * speedMultiplier;
        coreMesh.rotation.x += 0.4 * speedMultiplier;

        ring1Mesh.rotation.z += 1.2 * speedMultiplier;
        ring1Mesh.rotation.y += 0.6 * speedMultiplier;

        ring2Mesh.rotation.x -= 0.9 * speedMultiplier;
        ring2Mesh.rotation.z -= 0.7 * speedMultiplier;

        heroModelGroup.rotation.y += 0.25 * speedMultiplier;
      }

      // Exploded View kinematics with exponential damping
      const targetExp = expAmt; // 0 to 1
      coreMesh.position.y = THREE.MathUtils.damp(coreMesh.position.y, targetExp * 0.8, 4, delta);
      ring1Mesh.scale.setScalar(THREE.MathUtils.damp(ring1Mesh.scale.x, 1 + targetExp * 0.6, 4, delta));
      ring2Mesh.scale.setScalar(THREE.MathUtils.damp(ring2Mesh.scale.x, 1 + targetExp * 0.9, 4, delta));
      podsGroup.position.y = THREE.MathUtils.damp(podsGroup.position.y, targetExp * -0.6, 4, delta);
      meshGroup.scale.setScalar(THREE.MathUtils.damp(meshGroup.scale.x, 1 + targetExp * 0.7, 4, delta));

      // Update particle positions
      for (let i = 0; i < 40; i++) {
        particleAngles[i] += particleSpeeds[i] * delta * 0.6;
        const a = particleAngles[i];
        const r = particleRadii[i] * (1 + targetExp * 0.4);
        const y = particleY[i] + Math.sin(time * 2 + i) * 0.15;
        dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      }
      instancedParticles.instanceMatrix.needsUpdate = true;

      // Update camera damping
      controls.update();

      // Render
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    }

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden bg-[#09122B] ${isFullBleed ? 'h-[85vh] sm:h-[90vh]' : 'h-[500px] rounded-2xl border border-cyan-500/30'}`}>
      {/* Three.js canvas container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top minimal spec badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-2.5 rounded-xl bg-[#0B1020]/90 border border-slate-800 text-xs font-mono text-slate-200">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <div>
          <span className="font-bold text-cyan-300">AUTONOMOUS 3D ARCHITECTURE</span>
          <span className="hidden sm:inline text-slate-400 ml-2">Procedural 8-Part PBR Node</span>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close 3D Viewport"
          className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-[#0B1020]/90 border border-slate-800 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
        >
          ✕ Close 3D View
        </button>
      )}

      {/* Unified Bottom Control Dock (<= 15% viewport footprint) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-[840px] flex flex-col items-center">
        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={() => setControlsCollapsed(!controlsCollapsed)}
          aria-label={controlsCollapsed ? 'Expand 3D Controls' : 'Collapse 3D Controls'}
          className="mb-1.5 px-3 py-1 rounded-t-lg bg-[#0E162E] border-t border-x border-slate-700/80 text-[11px] font-mono font-medium text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 shadow-md"
        >
          {controlsCollapsed ? (
            <>
              <span>▴ Show Controls</span>
            </>
          ) : (
            <>
              <span>▾ Hide Controls (Zen Mode)</span>
            </>
          )}
        </button>

        {/* Collapsible Dock Container */}
        {!controlsCollapsed && (
          <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#0E162E] border border-slate-700/80 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              
              {/* Exploded View Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-cyan-400" />
                    <span>Exploded Architecture</span>
                  </span>
                  <span className="text-cyan-300 font-bold">{Math.round(explodedAmount * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedAmount}
                  onChange={(e) => setExplodedAmount(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-[#0B1020] rounded-lg cursor-pointer"
                />
              </div>

              {/* Rotation & Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-cyan-400" />
                    <span>Kinematics Speed</span>
                  </span>
                  <span className="text-cyan-300 font-bold">{rotationSpeed.toFixed(1)}x</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRotating(!isRotating)}
                    aria-label={isRotating ? 'Pause rotation' : 'Resume rotation'}
                    className="p-1 rounded bg-[#1A2447] text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    {isRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-[#0B1020] rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Layer Filter Pills */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>Inspect Layer</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(['all', 'core', 'rings', 'pods', 'mesh'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setSelectedLayer(l)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold transition-all ${
                        selectedLayer === l
                          ? 'bg-cyan-400 text-slate-950 shadow-sm'
                          : 'bg-[#1A2447] text-slate-300 hover:text-cyan-300 border border-slate-700'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all ${
                      isWireframe
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-[#1A2447] text-slate-300 hover:text-amber-300 border border-slate-700'
                    }`}
                  >
                    Wire
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
