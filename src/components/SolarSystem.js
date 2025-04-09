import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-scroll';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const SolarSystemContainer = styled.div`
  width: 100%;
  height: 85vh;
  background: linear-gradient(to bottom, #000000, #000033);
  position: relative;
  z-index: 1;
  
  canvas {
    touch-action: none;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  touch-action: none; /* Prevents touch gestures from interfering with webpage scroll */
  
  canvas {
    touch-action: none; /* Prevents OrbitControls from hijacking touch gestures */
  }
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 8px;
  padding: 20px;
  color: white;
  font-family: 'Orbitron', sans-serif;
  width: 300px;
  backdrop-filter: blur(10px);
  transform: translateY(${props => props.show ? '0' : '-120%'});
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
`;

const ManualPanel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 8px;
  padding: 8px 15px;
  color: white;
  font-family: 'Orbitron', sans-serif;
  width: auto;
  backdrop-filter: blur(10px);
  z-index: 5;
  transition: opacity 0.3s ease;
  opacity: 0.7;
  display: flex;
  flex-direction: row;
  align-items: center;
  pointer-events: none;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ManualTitle = styled.h4`
  margin: 0 15px 0 0;
  color: #4169E1;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  
  & > span {
    margin-right: 5px;
  }
`;

const ManualInstruction = styled.div`
  margin: 0 10px 0 0;
  font-size: 0.7rem;
  color: #B0B0D0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  
  & > span:first-child {
    margin-right: 5px;
    color: #4169E1;
  }
`;

const InfoTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #4169E1;
  font-size: 1.2rem;
`;

const InfoDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #B0B0D0;
`;

const TechTag = styled.span`
  display: inline-block;
  background: rgba(65, 105, 225, 0.2);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 12px;
  padding: 4px 8px;
  margin: 4px;
  font-size: 0.8rem;
  color: #B0B0FF;
`;

const PlanetLabel = styled.div`
  color: white;
  font-size: 12px;
  font-family: 'Orbitron', sans-serif;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(65, 105, 225, 0.3);
  white-space: nowrap;
  pointer-events: none;
  transform: translate3d(-50%, -50%, 0);
  opacity: ${props => props.isActive ? '1' : '0.8'};
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const ScrollArrow = styled(Link)`
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: #fff;
  cursor: pointer;
  animation: ${bounce} 3s ease-in-out infinite;
  z-index: 2;
  text-decoration: none;
  transition: color 0.3s ease;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  
  &:hover {
    color: #4169E1;
    text-shadow: 0 0 10px rgba(65, 105, 225, 0.5);
  }
`;

function RotatingPlanet({ position, size, color, name, section, onClick, isActive }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.3;
    }
  });

  const glowIntensity = isActive ? 1 : 0.4;
  const glowColor = isActive ? '#4169E1' : color;

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onClick={onClick}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer';
        e.stopPropagation();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {/* Outer glow sphere - cybersecurity shield effect */}
      <mesh ref={glowRef} scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.05}
          wireframe={true}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Main planet sphere */}
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={glowIntensity}
      />
      <pointLight 
        intensity={1} 
        distance={15} 
        color={color}
        decay={2}
      />
      <Html center distanceFactor={15}>
        <PlanetLabel isActive={isActive}>
          {name}
          <br />
          <small style={{ opacity: 0.7 }}>{section}</small>
        </PlanetLabel>
      </Html>
    </mesh>
  );
}

function Orbit({ radius, isActive }) {
  const points = [];
  const segments = 256; 
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(theta) * radius,
      0,
      Math.sin(theta) * radius
    ));
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial 
        attach="material" 
        color={isActive ? "#4169E1" : "#1E90FF"}
        opacity={isActive ? 0.8 : 0.5} 
        transparent 
        linewidth={2}
      />
    </line>
  );
}

function SpaceDebris({ count = 100 }) {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const spread = 150;
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * spread;
      temp.push(
        Math.cos(angle) * radius, // x
        (Math.random() - 0.5) * spread * 0.2, // y
        Math.sin(angle) * radius  // z
      );
    }
    return new Float32Array(temp);
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#4169E1"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Nebula({ position, color, scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0003;
      meshRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function AsteroidBelt({ radius, count = 100 }) {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spread = 2;
      const r = radius + (Math.random() - 0.5) * spread;
      temp.push(
        Math.cos(angle) * r,
        (Math.random() - 0.5) * 0.5,
        Math.sin(angle) * r
      );
    }
    return new Float32Array(temp);
  }, [count, radius]);

  useFrame((state) => {
    state.camera.updateProjectionMatrix();
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#808080"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function DataStream({ count = 50 }) {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 100;
      const height = (Math.random() - 0.5) * 60;
      temp.push(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
    }
    return new Float32Array(temp);
  }, [count]);

  const positions = useRef(points);
  const velocities = useRef(new Float32Array(points.length).fill(0));

  useFrame(() => {
    for (let i = 0; i < points.length; i += 3) {
      velocities.current[i + 1] -= 0.01;
      positions.current[i + 1] += velocities.current[i + 1];
      
      if (positions.current[i + 1] < -30) {
        positions.current[i + 1] = 30;
        velocities.current[i + 1] = 0;
      }
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={positions.current}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#00ff00"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function SecurityGrid({ size = 100, divisions = 10 }) {
  const points = useMemo(() => {
    const temp = [];
    const step = size / divisions;
    for (let i = -size/2; i <= size/2; i += step) {
      // X lines
      temp.push(i, -size/4, -size/2);
      temp.push(i, -size/4, size/2);
      // Z lines
      temp.push(-size/2, -size/4, i);
      temp.push(size/2, -size/4, i);
    }
    return new Float32Array(temp);
  }, [size, divisions]);

  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.opacity = (Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 0.4);
    }
  });

  return (
    <line ref={gridRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#4169E1"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

function RotatingSystem({ planets, activePlanet, handlePlanetClick }) {
  const systemRef = useRef();
  
  useFrame((state, delta) => {
    if (systemRef.current && !activePlanet) {
      systemRef.current.rotation.y += delta * 0.05; // Slow rotation
    }
  });

  return (
    <group ref={systemRef}>
      {/* Core - Cybersecurity Focus */}
      <RotatingPlanet
        position={[0, 0, 0]}
        size={3}
        color="#4169E1"
        name="Cybersecurity"
        section="Defense Strategy & Policy"
        onClick={() => handlePlanetClick(null)}
        isActive={!activePlanet}
      />

      {/* Individual orbits for each section */}
      {planets.map((planet) => (
        <Orbit 
          key={`orbit-${planet.id}`}
          radius={planet.orbitRadius}
          isActive={activePlanet?.id === planet.id}
        />
      ))}

      {/* Section planets */}
      {planets.map((planet, index) => (
        <RotatingPlanet
          key={`planet-${index}`}
          {...planet}
          onClick={(e) => {
            e.stopPropagation();
            handlePlanetClick(planet);
          }}
          isActive={activePlanet?.id === planet.id}
        />
      ))}
    </group>
  );
}

function SolarSystem() {
  const [activePlanet, setActivePlanet] = useState(null);
  
  const handlePlanetClick = (planet) => {
    setActivePlanet(activePlanet?.id === planet?.id ? null : planet);
  };

  const planets = [
    { 
      id: 1,
      name: 'Education',
      section: 'Cybersecurity Major',
      position: [
        8 * Math.cos(Math.PI * 0.5), 
        0,
        8 * Math.sin(Math.PI * 0.5)
      ],
      orbitRadius: 8,
      size: 1.3,
      color: '#9C27B0',
      details: 'B.S. in Cybersecurity Defense Strategy/Policy at Grambling State University. Coursework: Data Structures, Cybersecurity Fundamentals, Operating Systems, Networks.',
      tech: ['Data Structures', 'Operating Systems', 'Networks'],
      link: '#Contact'
    },
    { 
      id: 2,
      name: 'Projects',
      section: 'Security & Development',
      position: [
        12 * Math.cos(Math.PI * 1.7), 
        0,
        12 * Math.sin(Math.PI * 1.7)
      ],
      orbitRadius: 12,
      size: 1.2,
      color: '#F44336',
      details: 'Security-focused projects including a vulnerability scanner, productivity tools, and web applications.',
      tech: ['WVS Scanner', 'Pomodoro Plus', 'Church Website']
    },
    { 
      id: 3,
      name: 'Skills',
      section: 'Technical Expertise',
      position: [
        16 * Math.cos(Math.PI * 0.3), 
        0,
        16 * Math.sin(Math.PI * 0.3)
      ],
      orbitRadius: 16,
      size: 1.1,
      color: '#4CAF50',
      details: 'Proficient in Python, JavaScript, C/C++, with expertise in security tools, web development, and UI/UX design.',
      tech: ['Python', 'JavaScript', 'React', 'C/C++']
    },
    {
      id: 4,
      name: 'Experience',
      section: 'Professional Journey',
      position: [
        20 * Math.cos(Math.PI * 1.2), 
        0,
        20 * Math.sin(Math.PI * 1.2)
      ],
      orbitRadius: 20,
      size: 1.0,
      color: '#2196F3',
      details: 'Professional experience including Junior Intern at Citizens Bank, Assistant Tutor at MGY Consult, and IT Support at NHIS.',
      tech: ['Citizens Bank', 'MGY Consult', 'NHIS']
    },
    {
      id: 5,
      name: 'Research',
      section: 'Ongoing Studies',
      position: [
        24 * Math.cos(Math.PI * 2.2), 
        0,
        24 * Math.sin(Math.PI * 2.2)
      ],
      orbitRadius: 24,
      size: 1.1,
      color: '#673AB7',
      details: 'Ongoing research on Remote Working and Monitoring Technology, investigating the impact of workplace monitoring on productivity, satisfaction, and well-being.',
      tech: ['Workplace Monitoring', 'Employee Well-being', 'Ethical Standards']
    },
    {
      id: 6,
      name: 'Contact',
      section: 'Get in Touch',
      position: [
        28 * Math.cos(Math.PI * 0.8), 
        0,
        28 * Math.sin(Math.PI * 0.8)
      ],
      orbitRadius: 28,
      size: 0.9,
      color: '#FFC107',
      details: 'Let\'s connect! Find me on GitHub, LinkedIn, or reach out via email at owusuomaribright@gmail.com',
      tech: ['GitHub', 'LinkedIn', 'Email']
    }
  ];

  return (
    <SolarSystemContainer>
      <InfoPanel show={activePlanet !== null}>
        {activePlanet && (
          <>
            <InfoTitle>
              <a 
                href={activePlanet.link ? activePlanet.link : `#${activePlanet.name.toLowerCase()}`} 
                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => e.target.style.color = activePlanet.color}
                onMouseOut={(e) => e.target.style.color = 'inherit'}
              >
                {activePlanet.name}
              </a>
            </InfoTitle>
            <InfoDescription>{activePlanet.details}</InfoDescription>
            <div style={{ marginTop: '10px' }}>
              {activePlanet.tech.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </div>
          </>
        )}
      </InfoPanel>

      <ManualPanel>
        <ManualTitle><span>🚀</span>Manual</ManualTitle>
        <ManualInstruction><span>🖱️</span>Click planet</ManualInstruction>
        <ManualInstruction><span>👆</span>Drag to rotate</ManualInstruction>
        <ManualInstruction><span>🤏</span>Pinch to zoom</ManualInstruction>
      </ManualPanel>

      <ScrollArrow
        to="about"
        smooth={true}
        duration={800}
        spy={true}
        offset={-70}
      >
        ▼
      </ScrollArrow>

      <CanvasWrapper>
        <Canvas 
          camera={{ position: [0, 45, 100], fov: 45 }}
          gl={{ antialias: true }}
          onWheel={(e) => e.stopPropagation()}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={4} color="#4169E1" />
          <hemisphereLight intensity={0.3} groundColor="#000066" />
          <fog attach="fog" args={['#000033', 120, 220]} />
          
          {/* Enhanced space background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={8000}
            factor={6}
            saturation={1}
            fade={true}
            speed={0.5}
          />
          <Stars 
            radius={120} 
            depth={70} 
            count={4000} 
            factor={4} 
            saturation={0.8}
            fade={true}
            speed={0.2}
          />
          <SpaceDebris count={300} />
          
          {/* Cybersecurity-themed elements */}
          <DataStream count={150} />
          <SecurityGrid size={150} divisions={15} />
          
          {/* Enhanced nebula clouds */}
          <Nebula position={[50, 20, -80]} color="#4169E1" scale={35} />
          <Nebula position={[-60, -10, -100]} color="#9C27B0" scale={45} />
          <Nebula position={[0, -30, -60]} color="#2196F3" scale={30} />
          <Nebula position={[80, 0, -90]} color="#673AB7" scale={40} />

          {/* Asteroid belts */}
          <AsteroidBelt radius={28} count={200} />
          <AsteroidBelt radius={32} count={180} />
          
          {/* Rotating system with all planets */}
          <RotatingSystem 
            planets={planets}
            activePlanet={activePlanet}
            handlePlanetClick={handlePlanetClick}
          />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.5}
            minDistance={30}
            maxDistance={180}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.PAN,
              RIGHT: THREE.MOUSE.PAN
            }}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
            enableZoomWithWheel={false}
            enableDamping={true}
            dampingFactor={0.05}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
          />
        </Canvas>
      </CanvasWrapper>
    </SolarSystemContainer>
  );
}

export default SolarSystem;
