import React from 'react';
import styled, { keyframes } from 'styled-components';

const fly = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(50%) translateY(-20px); }
  100% { transform: translateX(100%); }
`;

const RocketWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100px;
  height: 100px;
  animation: ${fly} 5s linear infinite;
`;

const RocketImage = styled.img`
  width: 100%;
  height: auto;
`;

const Rocket = () => (
  <RocketWrapper>
    <RocketImage src="/rocket.png" alt="Rocket" />
  </RocketWrapper>
);

export default Rocket;
