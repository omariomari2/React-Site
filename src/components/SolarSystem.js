import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';

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
  height: 100vh;
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

function SaturnRings({ position, planetSize }) {
  const innerRadius = planetSize * 1.2;
  const outerRadius = planetSize * 2.2;
  
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial
          color="#E2D4B7"
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.7}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function RotatingPlanet({ position, size, color, name, section, onClick, isActive, hasRings = false }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  
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
    <group>
      <mesh 
        ref={meshRef} 
        position={position}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          setHovered(false);
        }}
      >
        {/* Glow effect */}
        <mesh ref={glowRef} position={[0, 0, 0]}>
          <sphereGeometry args={[size * 1.2, 16, 16]} />
          <meshBasicMaterial 
            color={glowColor} 
            transparent 
            opacity={0.3}
            blending={THREE.AdditiveBlending}
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
      </mesh>
      
      {/* Hover title */}
      {hovered && (
        <Html
          position={[position[0], position[1] + size + 0.5, position[2]]}
          center
          style={{
            pointerEvents: 'none',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            fontFamily: 'sans-serif',
          }}
        >
          {name}
        </Html>
      )}
    </group>
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

function AsteroidBelt({ innerRadius, outerRadius, count = 500 }) {
  const beltRef = useRef();
  
  // Asteroid belt facts
  const asteroidFacts = {
    name: 'Asteroid Belt',
    section: 'Between Mars & Jupiter',
    details: 'The asteroid belt contains millions of rocky bodies, ranging in size from tiny dust particles to the dwarf planet Ceres. Despite popular belief, the asteroids are spread over such a large area that a spacecraft can pass through the belt without any risk of collision.',
    tech: [
      '4.6 Billion Years Old',
      'Millions of Asteroids',
      'Mostly Empty Space',
      'Ceres: 950km Diameter'
    ]
  };
  
  // Rotate the entire belt in the opposite direction of the planets
  useFrame((state) => {
    if (beltRef.current) {
      beltRef.current.rotation.y = state.clock.getElapsedTime() * -0.02; // Slow rotation
    }
  });

  // Create a more realistic asteroid distribution with varying sizes and rotations
  const asteroids = useMemo(() => {
    const temp = [];
    const thickness = 2; // Thickness of the asteroid belt
    
    for (let i = 0; i < count; i++) {
      // Position in polar coordinates
      const angle = Math.random() * Math.PI * 2;
      const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
      const spread = (outerRadius - innerRadius) * 0.5; // How much spread from the main orbit
      const r = distance + (Math.random() - 0.5) * spread;
      
      // Random position within the belt
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * thickness;
      
      // Random size and rotation
      const size = 0.1 + Math.random() * 0.4; // Vary the size
      const rotation = {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2
      };
      
      // Slightly vary the color
      const grayValue = 0.4 + Math.random() * 0.4;
      const color = new THREE.Color(grayValue, grayValue, grayValue);
      
      temp.push({ position: [x, y, z], size, rotation, color });
    }
    return temp;
  }, [count, innerRadius, outerRadius]);

  return (
    <group ref={beltRef}>
      {/* Small asteroids */}
      {Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const y = (Math.random() - 0.5) * 1.5;
        const size = 0.1 + Math.random() * 0.3;
        const isBox = Math.random() > 0.7;
        
        return (
          <mesh
            key={`small-${i}`}
            position={[x, y, z]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            {isBox ? (
              <boxGeometry args={[size, size, size]} />
            ) : (
              <dodecahedronGeometry args={[size, 0]} />
            )}
            <meshStandardMaterial 
              color={`hsl(${Math.random() * 60 + 20}, 10%, ${Math.random() * 20 + 40}%)`}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Add some larger, more detailed asteroids */}
      {Array.from({ length: Math.floor(count / 20) }).map((_, i) => {
        const angle = (i / (count / 20)) * Math.PI * 2;
        const distance = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const y = (Math.random() - 0.5) * 1.5;
        const size = 0.5 + Math.random() * 0.8;
        
        return (
          <mesh
            key={`large-${i}`}
            position={[x, y, z]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <dodecahedronGeometry args={[size, 1]} />
            <meshStandardMaterial 
              color={`hsl(${Math.random() * 60 + 20}, 15%, ${Math.random() * 15 + 30}%)`}
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
        );
      })}
      

      
      {/* Dust particles for visual effect */}
      <group ref={beltRef}>
        {Array.from({ length: count * 1.5 }).map((_, i) => {
          const angle = (i / (count * 1.5)) * Math.PI * 2;
          const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          const y = (Math.random() - 0.5) * 2;
          const size = 0.05 + Math.random() * 0.1;
          
          return (
            <mesh
              key={`dust-${i}`}
              position={[x, y, z]}
            >
              <sphereGeometry args={[size, 4, 4]} />
              <meshBasicMaterial 
                color={`hsl(0, 0%, ${Math.random() * 30 + 30}%)`}
                transparent
                opacity={0.5}
              />
            </mesh>
          );
        })}
      </group>
    </group>
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

function Moon({ earthPosition }) {
  const moonRef = useRef();
  const [hovered, setHovered] = useState(false);
  const orbitRadius = 3; // Distance from Earth
  const orbitSpeed = 1.5; // Speed of orbit
  const moonSize = 0.4; // Size of the Moon
  
  useFrame((state) => {
    if (moonRef.current) {
      const time = state.clock.getElapsedTime() * orbitSpeed;
      // Orbit around Earth
      moonRef.current.position.x = earthPosition[0] + Math.cos(time) * orbitRadius;
      moonRef.current.position.z = earthPosition[2] + Math.sin(time) * orbitRadius;
      // Slight vertical offset for more natural look
      moonRef.current.position.y = earthPosition[1] + Math.sin(time * 1.5) * 0.5;
      
      // Rotate the Moon
      moonRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh 
        ref={moonRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[moonSize, 16, 16]} />
        <meshStandardMaterial 
          color="#cccccc"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hover title for Moon */}
      {hovered && (
        <Html
          position={[
            moonRef.current?.position.x || 0,
            (moonRef.current?.position.y || 0) + moonSize + 0.3,
            moonRef.current?.position.z || 0
          ]}
          center
          style={{
            pointerEvents: 'none',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            fontFamily: 'sans-serif',
          }}
        >
          The Moon
        </Html>
      )}
    </group>
  );
}

function RotatingSystem({ planets, activePlanet, handlePlanetClick }) {
  const systemRef = useRef();
  const [earthPosition, setEarthPosition] = useState([0, 0, 0]);
  const rotationSpeed = useRef(0.002); // Slower, more controlled rotation speed
  const lastTime = useRef(0);
  
  useFrame((state) => {
    if (systemRef.current && !activePlanet) {
      // Use requestAnimationFrame's timestamp for smoother animation
      const time = state.clock.getElapsedTime();
      if (lastTime.current === 0) {
        lastTime.current = time;
      }
      const delta = time - lastTime.current;
      lastTime.current = time;
      
      // Apply smooth rotation
      systemRef.current.rotation.y += rotationSpeed.current * Math.min(delta * 60, 2);
    }
  });

  // Find Earth's position
  useEffect(() => {
    const earth = planets.find(p => p.name === 'Earth');
    if (earth) {
      setEarthPosition(earth.position);
    }
  }, [planets]);

  return (
    <group ref={systemRef}>
      {/* Core - Sun */}
      <RotatingPlanet
        position={[0, 0, 0]}
        size={3}
        color="#FFD700"
        name="Sun"
        section="The Star"
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
        <group key={`planet-${index}`}>
          <RotatingPlanet
            {...planet}
            onClick={(e) => {
              e.stopPropagation();
              handlePlanetClick(planet);
            }}
            isActive={activePlanet?.id === planet.id}
            hasRings={planet.name === 'Saturn'}
          />
          {/* Add Moon if this is Earth */}
          {planet.name === 'Earth' && <Moon earthPosition={earthPosition} />}
          {/* Add rings if this is Saturn */}
          {planet.name === 'Saturn' && (
            <SaturnRings position={planet.position} planetSize={planet.size} />
          )}
        </group>
      ))}
    </group>
  );
}

function CometManager() {
  const [showComet, setShowComet] = useState(false);
  const [cometKey, setCometKey] = useState(0);
  
  // Show a new comet at random intervals
  useEffect(() => {
    const showCometTimer = () => {
      // Random delay between 5 and 15 seconds
      const delay = 5000 + Math.random() * 10000;
      const timer = setTimeout(() => {
        setShowComet(true);
        setCometKey(prev => prev + 1);
        
        // Hide the comet after it crosses the screen
        const hideTimer = setTimeout(() => {
          setShowComet(false);
          showCometTimer(); // Schedule next comet
        }, 10000); // Comet takes about 10 seconds to cross
        
        return () => clearTimeout(hideTimer);
      }, delay);
      
      return () => clearTimeout(timer);
    };
    
    const timer = showCometTimer();
    return () => clearTimeout(timer);
  }, []);
  
  if (!showComet) return null;
  
  return <Comet key={cometKey} />;
}

function Comet() {
  const ref = useRef();
  const spread = 300;
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState(() => {
    const side = Math.floor(Math.random() * 4);
    const pos = new THREE.Vector3();
    
    switch(side) {
      case 0: // Left
        pos.set(-spread, Math.random() * spread - spread/2, Math.random() * 50 - 25);
        break;
      case 1: // Right
        pos.set(spread, Math.random() * spread - spread/2, Math.random() * 50 - 25);
        break;
      case 2: // Top
        pos.set(Math.random() * spread - spread/2, spread, Math.random() * 50 - 25);
        break;
      case 3: // Bottom
        pos.set(Math.random() * spread - spread/2, -spread, Math.random() * 50 - 25);
        break;
    }
    
    return pos;
  });
  
  // Direction towards center with some randomness
  const [direction] = useState(() => {
    const dir = new THREE.Vector3(-position.x, -position.y, (Math.random() - 0.5) * 0.5).normalize();
    return dir;
  });
  
  // Store tail positions
  const [tail, setTail] = useState([]);
  const tailLength = 10;
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Move the comet
    const speed = 0.5 + Math.random() * 0.5;
    const newPosition = position.clone().add(direction.clone().multiplyScalar(speed));
    
    // Update tail
    setTail(prev => {
      const newTail = [[newPosition.x, newPosition.y, newPosition.z], ...prev];
      return newTail.slice(0, tailLength);
    });
    
    // Reset if out of bounds
    if (Math.abs(newPosition.x) > 500 || Math.abs(newPosition.y) > 500) {
      const spread = 300;
      const side = Math.floor(Math.random() * 4);
      
      let resetPos;
      switch(side) {
        case 0: resetPos = new THREE.Vector3(-spread, Math.random() * spread - spread/2, Math.random() * 100 - 50); break;
        case 1: resetPos = new THREE.Vector3(spread, Math.random() * spread - spread/2, Math.random() * 100 - 50); break;
        case 2: resetPos = new THREE.Vector3(Math.random() * spread - spread/2, -spread, Math.random() * 100 - 50); break;
        case 3: resetPos = new THREE.Vector3(Math.random() * spread - spread/2, spread, Math.random() * 100 - 50); break;
        default: resetPos = new THREE.Vector3(0, 0, 0);
      }
      
      setPosition(resetPos);
      setTail([]);
    } else {
      setPosition(newPosition);
    }
  });

  return (
    <group>
      <group 
        ref={ref} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Comet head */}
        <mesh>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial 
            color={`hsl(0.12, 30%, 80%)`} 
            transparent 
            opacity={1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Comet tail - line of fading dots */}
        <group>
          {tail.map((pos, i) => {
            const opacity = 1 - (i / tailLength);
            return (
              <mesh key={i} position={new THREE.Vector3(pos[0], pos[1], pos[2]).sub(position)}>
                <sphereGeometry args={[0.1, 4, 4]} />
                <meshBasicMaterial 
                  color={`hsl(0.12, 30%, 80%)`} 
                  transparent 
                  opacity={opacity * 0.4} 
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            );
          })}
        </group>
      </group>
      
      {/* Hover title */}
      {hovered && ref.current && (
        <Html
          position={[position.x, position.y + 0.5, position.z]}
          center
          style={{
            pointerEvents: 'none',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            fontFamily: 'sans-serif',
          }}
        >
          Comet
        </Html>
      )}
    </group>
  );
}

function SpaceEnvironment({ orbitBase, orbitSpacing }) {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <SpaceDebris count={200} />
      
      {/* Asteroid belt between Mars and Jupiter with clear separation */}
      <AsteroidBelt 
        innerRadius={orbitBase + (orbitSpacing * 3) + 2}  // Start after Mars' orbit with 2 units gap
        outerRadius={orbitBase + (orbitSpacing * 4) - 2}  // End before Jupiter's orbit with 2 units gap
        count={1000}  // Increased count for better density
      />
      
      {/* Security grid for high-tech feel */}
      <SecurityGrid size={200} divisions={20} />
    </>
  );
}

function SolarSystem() {
  const [activePlanet, setActivePlanet] = useState(null);
  
  const handlePlanetClick = (planet) => {
    setActivePlanet(activePlanet?.id === planet?.id ? null : planet);
  };

  // Orbit configuration with proper spacing for asteroid belt
  const orbitBase = 12;
  const orbitSpacing = 10;  // Increased to ensure clear separation for asteroid belt

  const planets = [
    { 
      id: 1,
      name: 'Mercury',
      section: 'First Planet',
      position: [
        (orbitBase) * Math.cos(Math.PI * 0.5), 
        0,
        (orbitBase) * Math.sin(Math.PI * 0.5)
      ],
      orbitRadius: orbitBase,
      size: 0.7,  // Scaled down from 0.38 for better visibility
      color: '#A9A9A9',  // Dark gray, rocky surface
      details: 'Mercury is the smallest and innermost planet in our solar system. It has no atmosphere and experiences extreme temperature variations, from -180°C to 430°C. A year on Mercury is just 88 Earth days!',
      tech: ['Smallest Planet', 'No Atmosphere', 'Fastest Orbit']
    },
    { 
      id: 2,
      name: 'Venus',
      section: 'Second Planet',
      position: [
        (orbitBase + orbitSpacing) * Math.cos(Math.PI * 1.7), 
        0,
        (orbitBase + orbitSpacing) * Math.sin(Math.PI * 1.7)
      ],
      orbitRadius: orbitBase + orbitSpacing,
      size: 0.9,  // Slightly smaller than Earth
      color: '#E6E6FA',  // Pale yellow with white clouds
      details: 'Venus is often called Earth\'s "sister planet" due to similar size. It has a thick atmosphere of carbon dioxide and sulfuric acid clouds. Surface temperatures reach 462°C, making it the hottest planet in our solar system!',
      tech: ['Earth\'s Twin', 'Hottest Planet', 'Acid Rain']
    },
    { 
      id: 3,
      name: 'Earth',
      section: 'Third Planet',
      position: [
        (orbitBase + orbitSpacing * 2) * Math.cos(Math.PI * 0.3), 
        0,
        (orbitBase + orbitSpacing * 2) * Math.sin(Math.PI * 0.3)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 2),
      size: 1.0,  // Reference size
      color: '#1E88E5',  // Blue with white clouds
      details: 'Earth is the only known planet to harbor life. It\'s covered 71% by water and has a protective atmosphere. The Earth\'s rotation is gradually slowing down, making days slightly longer each year.',
      tech: ['Blue Planet', 'Only Life', 'Water World']
    },
    {
      id: 4,
      name: 'Mars',
      section: 'Fourth Planet',
      position: [
        (orbitBase + orbitSpacing * 3) * Math.cos(Math.PI * 1.2), 
        0,
        (orbitBase + orbitSpacing * 3) * Math.sin(Math.PI * 1.2)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 3),
      size: 0.6,  // Scaled up from 0.53 for better visibility
      color: '#C1440E',  // Reddish-brown
      details: 'Mars is known as the "Red Planet" due to iron oxide on its surface. It has the largest volcano in the solar system, Olympus Mons, and the deepest canyon, Valles Marineris. Mars has two small moons, Phobos and Deimos.',
      tech: ['Red Planet', 'Olympus Mons', 'Two Moons']
    },
    {
      id: 5,
      name: 'Jupiter',
      section: 'Fifth Planet',
      position: [
        (orbitBase + orbitSpacing * 4) * Math.cos(Math.PI * 2.2), 
        0,
        (orbitBase + orbitSpacing * 4) * Math.sin(Math.PI * 2.2)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 4),
      size: 2.5,  // Scaled down from 11.2 to fit better
      color: '#E1AA74',  // Beige with red/brown bands
      details: 'Jupiter is the largest planet in our solar system. Its Great Red Spot is a storm that has been raging for over 400 years. Jupiter has 79 known moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto.',
      tech: ['Largest Planet', 'Great Red Spot', '79 Moons']
    },
    {
      id: 6,
      name: 'Saturn',
      section: 'Sixth Planet',
      position: [
        (orbitBase + orbitSpacing * 5) * Math.cos(Math.PI * 0.8), 
        0,
        (orbitBase + orbitSpacing * 5) * Math.sin(Math.PI * 0.8)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 5),
      size: 2.1,  // Scaled down from 9.45 to fit better
      color: '#F4E5C2',  // Pale gold
      details: 'Saturn is famous for its spectacular ring system made of ice particles and rocky debris. It\'s the least dense planet in our solar system - it would float in water! Saturn\'s rings are only about 10 meters thick but span 282,000 kilometers.',
      tech: ['Ringed Planet', 'Ice Rings', 'Low Density']
    },
    {
      id: 7,
      name: 'Uranus',
      section: 'Seventh Planet',
      position: [
        (orbitBase + orbitSpacing * 6) * Math.cos(Math.PI * 1.5), 
        0,
        (orbitBase + orbitSpacing * 6) * Math.sin(Math.PI * 1.5)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 6),
      size: 1.5,  // Scaled down from 4.01 to fit better
      color: '#C1E3E3',  // Pale cyan
      details: 'Uranus is unique as it rotates on its side, with an axial tilt of 98 degrees. It has a pale blue color due to methane in its atmosphere. Uranus has 27 known moons and a system of 13 rings.',
      tech: ['Sideways Planet', 'Ice Giant', '13 Rings']
    },
    {
      id: 8,
      name: 'Neptune',
      section: 'Eighth Planet',
      position: [
        (orbitBase + orbitSpacing * 7) * Math.cos(Math.PI * 2.5), 
        0,
        (orbitBase + orbitSpacing * 7) * Math.sin(Math.PI * 2.5)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 7),
      size: 1.4,  // Scaled down from 3.88 to fit better
      color: '#5B5DDF',  // Deep blue
      details: 'Neptune is the windiest planet in our solar system, with winds reaching up to 2,100 km/h. It has 14 known moons and a system of six rings. Neptune\'s Great Dark Spot is a storm system similar to Jupiter\'s Great Red Spot.',
      tech: ['Windiest Planet', 'Ice Giant', '14 Moons']
    },
    {
      id: 9,
      name: 'Pluto',
      section: 'Dwarf Planet',
      position: [
        (orbitBase + orbitSpacing * 8) * Math.cos(Math.PI * 0.9), 
        0,
        (orbitBase + orbitSpacing * 8) * Math.sin(Math.PI * 0.9)
      ],
      orbitRadius: orbitBase + (orbitSpacing * 8),
      size: 0.35,  // Scaled up from 0.19 for better visibility
      color: '#C1A779',  // Light brown
      details: 'Pluto is a dwarf planet in the Kuiper Belt. It has a heart-shaped glacier called Tombaugh Regio and five known moons. Pluto\'s orbit is highly elliptical and tilted compared to the other planets.',
      tech: ['Dwarf Planet', 'Kuiper Belt', 'Heart Glacier']
    }
  ];

  return (
    <SolarSystemContainer>
      <InfoPanel show={activePlanet !== null}>
        {activePlanet ? (
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
        ) : (
          <>
            <InfoTitle>
              <a 
                href="#sun" 
                style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => e.target.style.color = '#FFD700'}
                onMouseOut={(e) => e.target.style.color = 'inherit'}
              >
                Sun
              </a>
            </InfoTitle>
            <InfoDescription>
              The Sun is the star at the center of our Solar System. It's a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field. The Sun's diameter is about 1.39 million kilometers, and its mass is about 330,000 times that of Earth.
            </InfoDescription>
            <div style={{ marginTop: '10px' }}>
              <TechTag>Yellow Dwarf</TechTag>
              <TechTag>4.6 Billion Years Old</TechTag>
              <TechTag>Surface: 5,500°C</TechTag>
            </div>
          </>
        )}
      </InfoPanel>

      <ManualPanel>
        <ManualTitle><span>🚀</span>Solar System Explorer</ManualTitle>
        <ManualInstruction><span>🖱️</span>Click celestial body</ManualInstruction>
        <ManualInstruction><span>👆</span>Drag to rotate</ManualInstruction>
        <ManualInstruction><span>🤏</span>Pinch to zoom</ManualInstruction>
      </ManualPanel>

      <CanvasWrapper>
        <Canvas 
          camera={{ position: [0, 60, 150], fov: 45 }}
          gl={{ antialias: true }}
          onWheel={(e) => e.stopPropagation()}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
          <hemisphereLight intensity={0.3} groundColor="#000066" />
          <fog attach="fog" args={['#000033', 120, 220]} />
          
          {/* Comets */}
          <CometManager />
          
          {/* Simple stars background */}
          <Stars 
            radius={200}
            depth={100}
            count={2000}
            factor={6}
            saturation={0}
            fade
            speed={2}
          />
          
          {/* Space environment */}
          <SpaceEnvironment orbitBase={orbitBase} orbitSpacing={orbitSpacing} />
          
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
