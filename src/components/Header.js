import React, { useEffect, useState, useMemo, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #4169E1 }
`;


const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('/project_images/headerbackground.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

const SpaceshipModel = () => {
  const { scene } = useGLTF('project_images/cute_astronaut1.glb');
  const isMobile = window.innerWidth <= 768;
  
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material.emissiveIntensity = 1;
          node.material.toneMapped = false;
        }
      }
    });
  }, [scene]);

  const position = isMobile ? [0, -6, 2] : [0, -7, 0];
  const scale = isMobile ? 75 : 90;

  return <primitive object={scene} scale={scale} position={position} rotation={[0, Math.PI / 20, 0]} />;
};

const ResumeButtonContainer = styled.a`
  position: relative;
  width: 400px;
  height: 800px;
  margin-bottom: 10vh;
  cursor: pointer;
  animation: ${float} 4s ease-in-out infinite;
  display: block;
`;

const ModelCanvas = styled(Canvas)`
  width: 100% !important;
  max-width: 400px !important;
  height: auto !important;
  position: relative;
  z-index: 2;
  touch-action: none;
  
  canvas {
    touch-action: none;
    width: 100% !important;
    height: auto !important;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    max-width: 300px !important;
    height: auto !important;
  }
`;

const WelcomeMessage = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1;
  margin-top: 2vh;
  animation: ${float} 6s ease-in-out infinite;
  font-family: 'Orbitron', sans-serif;
  position: fixed;
  top: 25vh;
  left: 0;
  width: 100%;
  z-index: -9999;
  padding: 1rem 0;
  transition: all 0.3s ease;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 100%;
    top: 0;
    left: -10%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(65, 105, 225, 0.1) 25%, 
      rgba(65, 105, 225, 0.1) 75%, 
      transparent 100%
    );
    animation: shimmer 3s linear infinite;
    transform: skewX(-20deg);
    z-index: -999;
  }
  
  &::after {
    animation-delay: 1.5s;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-150%) skewX(-20deg);
    }
    100% {
      transform: translateX(150%) skewX(-20deg);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 4.5rem;
  }
`;

const TypewriterContainer = styled.div`
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  margin-top: 1vh;
  max-width: 600px;
`;

const TypewriterText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 5px #4169E1, 0 0 10px #4169E1;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  position: relative;
  animation: 
    ${typewriter} 2s steps(50, end) forwards,
    ${props => props.isWaiting ? 'none' : 'none'} 0.5s ease forwards,
    ${blink} 0.75s step-end infinite;
  border-right: 3px solid #4169E1;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
  padding-top: calc(25vh + 8rem); /* Add space for the fixed welcome message */
`;

const Header = () => {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const typewriterTexts = useMemo(() => [
    "Full Stack Development 💻",
    "Cybersecurity🔒",
    "Software Engineering 🧩",
    "Cloud Security 🌐"
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(true);
      setTimeout(() => {
        setTypewriterIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsWaiting(false);
      }, 3000); // Wait 3 seconds before showing next text
    }, 3000); // Wait 3 seconds after typing is complete

    return () => clearTimeout(timer);
  }, [typewriterIndex, typewriterTexts]);

  return (
    <HeaderContainer>
      <ContentContainer>
        <ResumeButtonContainer target="_blank" rel="noopener noreferrer">
          <ModelCanvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            shadows
          >
            <ambientLight intensity={1.5} />
            <directionalLight
              position={[0, 5, 5]}
              intensity={2.5}
              castShadow
              color="#ffffff"
            />
            <pointLight position={[-3, 0, 3]} intensity={1.5} color="#4169E1" />
            <pointLight position={[3, 0, 3]} intensity={1.5} color="#ff69b4" />
            <spotLight
              position={[0, 10, 0]}
              angle={0.5}
              penumbra={1}
              intensity={2}
              castShadow
            />
            <Suspense fallback={null}>
              <SpaceshipModel />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={3}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                rotateSpeed={5}
                dampingFactor={0.05}
                enableDamping
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
              />
            </Suspense>
          </ModelCanvas>
        </ResumeButtonContainer>
        <WelcomeMessage>Dive Into & Explore My Universe</WelcomeMessage>
        <TypewriterContainer>
          <TypewriterText key={typewriterIndex} isWaiting={isWaiting}>
            {typewriterTexts[typewriterIndex]}
          </TypewriterText>
        </TypewriterContainer>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;
