import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RefreshCw, Cpu, Activity, Zap, Eye, Database, Radio, Sparkles } from 'lucide-react';
import { cyberAudio } from '../../utils/cyberAudio';

interface SystemNodeData {
  id: string;
  name: string;
  category: string;
  status: 'OPTIMAL' | 'STREAMING' | 'ENFORCED' | 'SYNCED';
  color: number;
  hex: string;
  metric: string;
  position: [number, number, number];
}

const SYSTEM_NODES: SystemNodeData[] = [
  {
    id: 'tma-agent',
    name: 'TMA Autonomous Agent Architect',
    category: 'AI-First Multi-Agent Engine',
    status: 'OPTIMAL',
    color: 0x38bdf8,
    hex: '#38bdf8',
    metric: 'GraphRAG · MCP · Harness · Self-Learning',
    position: [2.6, 1.2, 0.8],
  },
  {
    id: 'graphrag-mem',
    name: 'GraphRAG Knowledge Graph',
    category: 'Persistent Codebase Memory',
    status: 'STREAMING',
    color: 0xa855f7,
    hex: '#a855f7',
    metric: '12,480 entities indexed',
    position: [-2.4, 1.6, -1.0],
  },
  {
    id: 'bestmed-auth',
    name: 'BESTMED Aged-Care Compliance',
    category: 'Victorian Medication Law',
    status: 'ENFORCED',
    color: 0x2dd4bf,
    hex: '#2dd4bf',
    metric: 'PIN + Dual-Sign Enforcement',
    position: [1.8, -2.1, 1.4],
  },
  {
    id: 'sisense-sync',
    name: 'Sisense BI Sync Pipeline',
    category: 'Healthcare Data Security',
    status: 'SYNCED',
    color: 0x10b981,
    hex: '#10b981',
    metric: 'ElastiCube & Live RLS',
    position: [-2.2, -1.5, 1.2],
  },
  {
    id: 'aws-aurora',
    name: 'AWS Serverless Reporting',
    category: 'Zero-Idle Distributed DB',
    status: 'OPTIMAL',
    color: 0xf59e0b,
    hex: '#f59e0b',
    metric: 'Lambda + Aurora Auto-Scale',
    position: [0.2, 2.5, -2.0],
  },
  {
    id: 'event-bus',
    name: 'Azure Service Bus & Worker',
    category: 'Asynchronous Event Hub',
    status: 'STREAMING',
    color: 0x818cf8,
    hex: '#818cf8',
    metric: '0 backlog · Hourly trigger',
    position: [-0.6, -2.7, -1.5],
  },
];

export default function CyberHoloCore3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<SystemNodeData>(SYSTEM_NODES[0]);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(true);
  const [fps, setFps] = useState(60);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const isRotatingRef = useRef(true);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Master Rotational Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // 3. Central Hologram Reactor (Icosahedron + Inner Core)
    const icoGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // Glowing Inner Plasma Sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 4. Gimbal Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.015, 8, 48);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.015, 8, 48);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ringGeo3 = new THREE.TorusGeometry(2.7, 0.012, 8, 54);
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 2.5;
    coreGroup.add(ring3);

    // 5. Ambient Stardust Particles
    const starCount = 200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const colorPalette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x2dd4bf),
    ];

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.5 + Math.random() * 2.8;

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    coreGroup.add(starField);

    // 6. System Microservice Nodes (Interactive 3D Meshes)
    const nodeMeshes: { mesh: THREE.Mesh; data: SystemNodeData }[] = [];
    const splineLines: { line: THREE.Line; curve: THREE.CatmullRomCurve3; packet: THREE.Mesh }[] = [];

    SYSTEM_NODES.forEach((nodeData) => {
      // Node Node Mesh
      const nodeGeo = new THREE.OctahedronGeometry(0.24, 0);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
        wireframe: true,
        transparent: true,
        opacity: 0.95,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(...nodeData.position);
      nodeMesh.userData = { id: nodeData.id };
      coreGroup.add(nodeMesh);

      // Inner glowing core
      const innerDotGeo = new THREE.SphereGeometry(0.1, 12, 12);
      const innerDotMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
      });
      const innerDot = new THREE.Mesh(innerDotGeo, innerDotMat);
      nodeMesh.add(innerDot);

      // Outer satellite ring
      const satRingGeo = new THREE.RingGeometry(0.32, 0.35, 16);
      const satRingMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const satRing = new THREE.Mesh(satRingGeo, satRingMat);
      nodeMesh.add(satRing);

      nodeMeshes.push({ mesh: nodeMesh, data: nodeData });

      // Curved Spline connecting center core to this node
      const center = new THREE.Vector3(0, 0, 0);
      const target = new THREE.Vector3(...nodeData.position);
      const mid = new THREE.Vector3().addVectors(center, target).multiplyScalar(0.5);
      mid.y += (Math.random() - 0.5) * 0.8;
      mid.x += (Math.random() - 0.5) * 0.8;

      const curve = new THREE.CatmullRomCurve3([center, mid, target]);
      const points = curve.getPoints(32);
      const splineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const splineMat = new THREE.LineBasicMaterial({
        color: nodeData.color,
        transparent: true,
        opacity: 0.35,
      });
      const splineLine = new THREE.Line(splineGeo, splineMat);
      coreGroup.add(splineLine);

      // Moving Data Packet along the curve
      const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      coreGroup.add(packetMesh);

      splineLines.push({ line: splineLine, curve, packet: packetMesh });
    });

    // 7. Interactive Controls & Mouse Raycasting
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2(-10, -10);

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      cyberAudio.playClick();
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        rotVelY = deltaX * 0.006;
        rotVelX = deltaY * 0.006;
        coreGroup.rotation.y += rotVelY;
        coreGroup.rotation.x += rotVelX;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh), true);

      if (intersects.length > 0) {
        let topObj: THREE.Object3D | null = intersects[0].object;
        while (topObj && !topObj.userData?.id && topObj.parent) {
          topObj = topObj.parent;
        }
        if (topObj && topObj.userData?.id) {
          const match = SYSTEM_NODES.find((n) => n.id === topObj!.userData.id);
          if (match) {
            setActiveNode(match);
            cyberAudio.playClick();
            cyberAudio.playPulse();
          }
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.min(Math.max(camera.position.z + e.deltaY * 0.005, 5), 13);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 460;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop with FPS & Packet Movement
    let animationId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // FPS Calculation
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Auto Rotation
      if (isRotatingRef.current && !isDragging) {
        coreGroup.rotation.y += 0.005;
        coreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
      } else if (!isDragging) {
        rotVelX *= 0.95;
        rotVelY *= 0.95;
        coreGroup.rotation.x += rotVelX;
        coreGroup.rotation.y += rotVelY;
      }

      // Gimbal ring internal counter-rotations
      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.y = elapsed * -0.3;
      ring3.rotation.x = elapsed * 0.25;

      // Pulse reactor sphere
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.08;
      icoMesh.scale.set(scale, scale, scale);
      innerMesh.rotation.y = elapsed * 0.8;

      // Pulse nodes and rotate satellites
      nodeMeshes.forEach(({ mesh }, idx) => {
        mesh.rotation.y = elapsed * (1 + idx * 0.2);
        mesh.rotation.x = elapsed * 0.7;
      });

      // Move data packets along splines
      splineLines.forEach(({ curve, packet }, idx) => {
        const t = (elapsed * 0.35 + idx * 0.16) % 1;
        const pt = curve.getPoint(t);
        packet.position.copy(pt);
      });

      // Hover check
      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh), true);
      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
      } else {
        container.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
    };
  }, []);

  const triggerPulse = () => {
    cyberAudio.playPulse();
    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y += 0.8;
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-slate-900/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-white tracking-wider">3D DISTRIBUTED MESH TOPOLOGY</span>
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            WebGL 3D
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-[11px] text-emerald-400 font-bold">{fps} FPS</span>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] text-cyan-400">6 NODES ACTIVE</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[360px] sm:h-[400px]">
        {/* Reticle HUD Grid Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-3 opacity-60">
          <div className="flex justify-between text-[9px] font-mono text-cyan-400/80">
            <span>[SYS.TOPOLOGY_VIEW: 360°]</span>
            <span>POLYGONS: 1,840</span>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-cyan-400/80">
            <span>LAT: 10.8231° N · LON: 106.6297° E</span>
            <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
          </div>
        </div>

        {/* The Three.js canvas mount point */}
        <div ref={containerRef} className="w-full h-full" />

        {/* Selected Node Telemetry HUD Overlay (Floating bottom) */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-auto">
          <div
            className="p-3 rounded-2xl border backdrop-blur-xl transition-all shadow-xl"
            style={{
              backgroundColor: 'rgba(7, 10, 30, 0.85)',
              borderColor: `${activeNode.hex}60`,
              boxShadow: `0 0 20px ${activeNode.hex}25`,
            }}
          >
            <div className="flex items-center justify-between mb-1 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeNode.hex }}
                />
                <span className="font-bold text-white tracking-wide">{activeNode.name}</span>
              </div>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-bold"
                style={{
                  backgroundColor: `${activeNode.hex}20`,
                  color: activeNode.hex,
                  border: `1px solid ${activeNode.hex}50`,
                }}
              >
                {activeNode.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
              <span className="text-slate-400">{activeNode.category}</span>
              <span style={{ color: activeNode.hex }} className="font-bold">
                {activeNode.metric}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HUD Interactive Controls Toolbar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsRotating(!isRotating);
              cyberAudio.playClick();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all text-[11px]"
            title="Toggle 3D Orbit Rotation"
          >
            {isRotating ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-amber-400" />}
            <span>{isRotating ? 'Orbit: ON' : 'Orbit: OFF'}</span>
          </button>

          <button
            onClick={triggerPulse}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all text-[11px]"
            title="Trigger Neural Pulse"
          >
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Pulse Mesh</span>
          </button>
        </div>

        {/* Quick Node Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {SYSTEM_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => {
                setActiveNode(node);
                cyberAudio.playClick();
              }}
              className={`px-2 py-0.5 rounded text-[10px] transition-all whitespace-nowrap ${
                activeNode.id === node.id
                  ? 'bg-white/20 text-white font-bold border border-white/40'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {node.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
