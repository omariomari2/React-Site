import React from 'react';
import styled from 'styled-components';
import SolarSystem from './SolarSystem';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0a0a0a;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  background: transparent;
  border: 2px solid #4169E1;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(65, 105, 225, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(65, 105, 225, 0.4);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const SolarSystemPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>Back to Home</BackButton>
      <SolarSystem />
    </PageContainer>
  );
};

export default SolarSystemPage; 