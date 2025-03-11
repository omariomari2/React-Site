import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem;
  min-height: 100vh;
  background: radial-gradient(circle at center, rgba(0, 0, 20, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%);
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  letter-spacing: 2px;
  
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

const ContactCard = styled.div`
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
  
  &:hover {
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 15px 30px rgba(65, 105, 225, 0.2);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    width: 95%;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(65, 105, 225, 0.1);
  transition: all 0.3s ease;
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    color: #4169E1;
    letter-spacing: 1px;
  }
  
  &:hover {
    background: rgba(65, 105, 225, 0.2);
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
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &:hover {
    background: rgba(65, 105, 225, 0.4);
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const Contact = () => {
  const contactInfo = [
    {
      type: 'GitHub',
      value: 'github.com/omariomari2',
      link: 'https://github.com/omariomari2'
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/owusuomaribright',
      link: 'http://www.linkedin.com/in/owusuomaribright'
    },
    {
      type: 'Email',
      value: 'owusuomaribright@gmail.com',
      link: 'mailto:owusuomaribright@gmail.com'
    },
    {
      type: 'Address',
      value: '403 Main Street, Grambling, LA',
      link: 'https://maps.google.com/?q=403+Main+Street,+Grambling,+LA'
    }
  ];

  return (
    <ContactContainer>
      <Title>Let's Connect</Title>
      <ContactCard>
        <ContactInfo>
          {contactInfo.map((info, index) => (
            <ContactItem key={index}>
              <h3>{info.type}</h3>
              <ContactLink href={info.link} target="_blank" rel="noopener noreferrer">
                {info.value}
              </ContactLink>
            </ContactItem>
          ))}
        </ContactInfo>
      </ContactCard>
    </ContactContainer>
  );
};

export default Contact;
