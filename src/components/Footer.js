import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  background: rgba(0, 0, 20, 0.9);
  padding: 30px 20px;
  border-top: 1px solid rgba(65, 105, 225, 0.3);
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.5);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Copyright = styled.div`
  color: #B0B0D0;
  
  p {
    margin: 5px 0;
  }
  
  .name {
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 10px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(65, 105, 225, 0.2);
  color: #fff;
  font-size: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(65, 105, 225, 0.3);
  
  &:hover {
    background: rgba(65, 105, 225, 0.5);
    transform: translateY(-3px);
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          <p className="name">Bright Owusu Omari</p>
          <p>© {currentYear} All Rights Reserved</p>
          <p>Computer Science Student & Developer</p>
        </Copyright>
        <SocialLinks>
          <SocialIcon href="https://github.com/omariomari2" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="http://www.linkedin.com/in/owusuomaribright" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon href="mailto:owusuomaribright@gmail.com">
            <FaEnvelope />
          </SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIcon>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
