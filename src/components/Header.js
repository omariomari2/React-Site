import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  justify-content: center;
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

const WelcomeMessage = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1;
  margin-top: 2vh;
  animation: ${float} 6s ease-in-out infinite;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  z-index: 1;
  padding: 1rem 0;
  transition: all 0.3s ease;
  
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
    z-index: -1;
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

const ExploreButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  background: transparent;
  border: 2px solid #4169E1;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &:hover {
    background: rgba(65, 105, 225, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(65, 105, 225, 0.4);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(65, 105, 225, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem 1.6rem;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/solar-system');
  };

  return (
    <HeaderContainer>
      <WelcomeMessage>Welcome</WelcomeMessage>
      <ExploreButton onClick={handleExplore}>
        Explore Solar System
      </ExploreButton>
    </HeaderContainer>
  );
};

export default Header;
