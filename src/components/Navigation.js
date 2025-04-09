import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-scroll';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const NavToggle = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(65, 105, 225, 0.8);
    transform: scale(1.1);
  }
`;

const NavMenu = styled.div`
  position: fixed;
  top: 70px;
  left: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 10px;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: 0.5rem;
  animation: ${slideIn} 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 150px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(65, 105, 225, 0.3);
    color: #4169E1;
  }

  &.active {
    background: #4169E1;
    color: white;
  }
`;

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      <NavToggle onClick={toggleNav} aria-label="Toggle navigation menu">
        {isNavOpen ? '×' : '☰'}
      </NavToggle>
      
      <NavMenu isOpen={isNavOpen}>
        <NavItem 
          to="header" 
          smooth={true} 
          duration={800} 
          spy={true}
          offset={0}
          onClick={() => setIsNavOpen(false)}
        >
          🏠 Home
        </NavItem>
        <NavItem 
          to="about" 
          smooth={true} 
          duration={800} 
          spy={true}
          offset={-70}
          onClick={() => setIsNavOpen(false)}
        >
          👤 About Me
        </NavItem>
        <NavItem 
          to="experience" 
          smooth={true} 
          duration={800} 
          spy={true}
          offset={-70}
          onClick={() => setIsNavOpen(false)}
        >
          💼 Experience
        </NavItem>
        <NavItem 
          to="projects" 
          smooth={true} 
          duration={800} 
          spy={true}
          offset={-70}
          onClick={() => setIsNavOpen(false)}
        >
          🚀 Projects
        </NavItem>
        <NavItem 
          to="contact" 
          smooth={true} 
          duration={800} 
          spy={true}
          offset={-70}
          onClick={() => setIsNavOpen(false)}
        >
          📧 Contact
        </NavItem>
      </NavMenu>
    </>
  );
};

export default Navigation;
