import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

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

const twinkle = keyframes`
  0%, 100% {
    opacity: var(--base-opacity);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
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

const ufoHover = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 0 5px rgba(65, 105, 225, 0.3);
  }
  25% {
    transform: translateY(-10px) rotate(-5deg);
    box-shadow: 0 0 15px rgba(65, 105, 225, 0.5);
  }
  50% {
    transform: translateY(-15px) rotate(0deg);
    box-shadow: 0 0 25px rgba(65, 105, 225, 0.7);
  }
  75% {
    transform: translateY(-10px) rotate(5deg);
    box-shadow: 0 0 15px rgba(65, 105, 225, 0.5);
  }
  100% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 0 5px rgba(65, 105, 225, 0.3);
  }
`;

const ufoBeam = keyframes`
  0%, 100% {
    opacity: 0;
    height: 0;
  }
  50% {
    opacity: 0.7;
    height: 100px;
  }
`;

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(0, 0, 20, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const WelcomeMessage = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1;
  margin-bottom: 2vh;
  animation: ${float} 6s ease-in-out infinite;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  z-index: 2;
  
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
    font-size: 3.5rem;
  }
`;

const TypewriterContainer = styled.div`
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  margin-top: 1vh;
  max-width: 600px;
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
  font-size: 5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  z-index: 3;
  animation: ${ufoHover} 3s ease-in-out infinite;
  text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1;
  
  &:hover {
    text-shadow: 0 0 20px #4169E1, 0 0 40px #4169E1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 0;
    background: linear-gradient(to bottom, rgba(65, 105, 225, 0.8), transparent);
    opacity: 0;
    border-radius: 50% 50% 0 0;
    z-index: -1;
    animation: ${ufoBeam} 4s ease-in-out infinite;
  }
  
  &:hover::before {
    animation: ${ufoBeam} 2s ease-in-out infinite;
  }
  
  &::after {
    content: 'Resume';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    color: #fff;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
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
  animation: ${typewriter} 2.5s steps(40, end) forwards, ${blink} 0.75s step-end infinite;
  border-right: 3px solid #4169E1;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: #fff;
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  opacity: var(--base-opacity);
  animation: ${twinkle} ${props => props.duration}s ease-in-out infinite;
  box-shadow: 0 0 ${props => props.size * 2}px rgba(255, 255, 255, 0.8);
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.size * 3}px;
    height: ${props => props.size * 3}px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
`;

const Constellation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Header = () => {
  const [stars, setStars] = useState([]);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const typewriterTexts = useMemo(() => [
    "Full Stack Developer",
    "Software Engineer",
    "Problem Solver",
    "Tech Enthusiast"
  ], []);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 50 }, () => ({
        id: Math.random(),
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        baseOpacity: Math.random() * 0.5 + 0.3
      }));
    };

    setStars(generateStars());

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * stars.length);
      setStars(prevStars => {
        const newStars = [...prevStars];
        newStars[randomIndex] = {
          ...newStars[randomIndex],
          duration: Math.random() * 3 + 2,
          baseOpacity: Math.random() * 0.5 + 0.3
        };
        return newStars;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [stars]);

  useEffect(() => {
    const typewriterInterval = setInterval(() => {
      setTypewriterIndex(prevIndex => (prevIndex + 1) % typewriterTexts.length);
    }, 6000); // Change text every 6 seconds

    return () => clearInterval(typewriterInterval);
  }, [typewriterTexts]);

  return (
    <HeaderContainer>
      <Constellation>
        {stars.map(star => (
          <Star
            key={star.id}
            size={star.size}
            top={star.top}
            left={star.left}
            duration={star.duration}
            style={{ '--base-opacity': star.baseOpacity }}
          />
        ))}
      </Constellation>
      <ContentContainer>
        <WelcomeMessage>Welcome Into My Universe</WelcomeMessage>
        <TypewriterContainer>
          <TypewriterText key={typewriterIndex}>
            {typewriterTexts[typewriterIndex]}
          </TypewriterText>
        </TypewriterContainer>
        <ResumeButton href="/owusuomaribright_resume.docx.pdf" target="_blank">
          🛸
        </ResumeButton>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;
