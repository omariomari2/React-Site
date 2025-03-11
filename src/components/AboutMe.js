import React from 'react';
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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  color: #fff;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  position: relative;
`;

const Name = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #4169E1, #9370DB, #20B2AA, #4169E1);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${shimmer} 6s linear infinite;
`;

const Education = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: rgba(65, 105, 225, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(65, 105, 225, 0.3);
  transform-origin: center;
  animation: ${float} 6s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(65, 105, 225, 0.2),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmerEffect 3s infinite;
  }
  
  @keyframes shimmerEffect {
    100% {
      transform: translateX(100%);
    }
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  position: relative;
`;

const SkillTag = styled.span`
  padding: 0.5rem 1rem;
  background: rgba(65, 105, 225, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(65, 105, 225, 0.3);
  transition: all 0.3s ease;
  animation: ${float} ${props => props.delay}s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.1);
    background: rgba(65, 105, 225, 0.4);
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 0 15px rgba(65, 105, 225, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.3s ease;
    opacity: 0;
  }
  
  &:hover::after {
    opacity: 1;
    transform: rotate(45deg) translate(50%, 50%);
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContactLink = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(65, 105, 225, 0.2);
  border: 1px solid rgba(65, 105, 225, 0.3);
  transition: all 0.3s ease;
  animation: ${float} ${props => props.delay}s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(65, 105, 225, 0.4);
    transform: translateY(-5px);
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.4);
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ResumeButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(65, 105, 225, 0.2);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background: rgba(65, 105, 225, 0.4);
    transform: translateY(-5px);
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.4);
  }
`;

const AboutMe = () => {
  const languages = ['Python', 'C', 'C++', 'JavaScript', 'TypeScript'];
  const tools = ['Git/GitHub', 'Replit', 'Firebase', 'RESTFUL APIs', 'Netlify', 'React', 'Tailwind'];
  const specialties = ['UI/UX Design', 'API Integration', 'Project Management', 'Vulnerability Assessment'];

  return (
    <AboutContainer>
      <ProfileSection>
        <InfoSection>
          <Name>BRIGHT OMARI OWUSU</Name>
          
          <Education>
            <h3>Education</h3>
            <p>Grambling State University — Grambling, LA, USA</p>
            <p>Bachelor of Science in Cybersecurity Defense Strategy/Policy</p>
            <p>Expected: May 2028</p><br></br>
            <p>I am a dedicated Cybersecurity student at Grambling State University with a strong passion for securing web data and integrating software engineering principles into cybersecurity solutions. With proficiency in Python and JavaScript, I actively work on projects that enhance my technical expertise. My goal is to leverage my skills to create innovative cybersecurity solutions while mentoring and supporting underprivileged individuals in tech.</p>
            <ResumeButton href="/owusuomaribright_resume.docx.pdf" target="_blank">
              Resume
            </ResumeButton>
          </Education>

          <div>
            <h3>Technical Expertise</h3>
            
            <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#4169E1' }}>Languages</h4>
            <SkillsContainer>
              {languages.map((skill, index) => (
                <SkillTag 
                  key={skill}
                  delay={4 + (index % 3)}
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillsContainer>
            
            <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#4169E1' }}>Tools/Technology</h4>
            <SkillsContainer>
              {tools.map((skill, index) => (
                <SkillTag 
                  key={skill}
                  delay={4 + (index % 3)}
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillsContainer>
            
            <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#4169E1' }}>Skills</h4>
            <SkillsContainer>
              {specialties.map((skill, index) => (
                <SkillTag 
                  key={skill}
                  delay={4 + (index % 3)}
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillsContainer>
          </div>

        </InfoSection>
      </ProfileSection>
    </AboutContainer>
  );
};

export default AboutMe;
