import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 1rem;
  min-height: 100vh;
  background: radial-gradient(circle at center, rgba(0, 0, 20, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 4rem 0.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #4169E1, transparent);
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(10, 10, 40, 0.5);
  border-radius: 25px;
  padding: 3rem;
  max-width: 800px;
  width: 90%;
  border: 1px solid rgba(65, 105, 225, 0.3);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:hover {
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 15px 30px rgba(65, 105, 225, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: 95%;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(65, 105, 225, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  
  .icon {
    font-size: 2.5rem;
    color: #4169E1;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: #4169E1;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    .icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }
  }
  
  &:hover {
    background: rgba(65, 105, 225, 0.2);
    transform: translateY(-5px);
    
    .icon {
      transform: scale(1.1);
      color: #fff;
    }
  }
`;

const ContactLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 30px;
  background: rgba(65, 105, 225, 0.2);
  border: 1px solid rgba(65, 105, 225, 0.3);
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(65, 105, 225, 0.4);
    border-color: rgba(65, 105, 225, 0.8);
    transform: translateY(-2px);
  }
`;

const Contact = () => {
  return (
    <ContactContainer id="contact">
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let's Connect
      </Title>
      <ContactCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ContactInfo>
          <ContactItem
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaEnvelope className="icon" />
            <h3>Email</h3>
            <ContactLink href="mailto:owusuomaribright@gmail.com">
              owusuomaribright@gmail.com
            </ContactLink>
          </ContactItem>
          <ContactItem
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaGithub className="icon" />
            <h3>GitHub</h3>
            <ContactLink href="https://github.com/omariomari2" target="_blank" rel="noopener noreferrer">
              <FaGithub /> @omariomari2
            </ContactLink>
          </ContactItem>
          <ContactItem
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaLinkedin className="icon" />
            <h3>LinkedIn</h3>
            <ContactLink href="http://www.linkedin.com/in/owusuomaribright" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> Connect with me
            </ContactLink>
          </ContactItem>
          <ContactItem
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPhone className="icon" />
            <h3>Address</h3>
            <ContactLink href="https://maps.google.com/?q=403+Main+Street,+Grambling,+LA">
              403 Main Street, Grambling, LA
            </ContactLink>
          </ContactItem>
        </ContactInfo>
      </ContactCard>
    </ContactContainer>
  );
};

export default Contact;
