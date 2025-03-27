import React, { useState } from 'react';
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

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
  position: relative;
  color: #fff;
`;

const ProfileSection = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
  overflow: hidden;
  border-radius: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/background_image.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.3);
    z-index: -1;
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
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: rgba(65, 105, 225, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(65, 105, 225, 0.3);
  transform-origin: center;
  animation: ${float} 6s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  width: 100%;
  
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
    animation: ${shimmer} 3s infinite;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  margin: 0.25rem 0;
  position: relative;
`;

const SkillTag = styled.span`
  padding: 0.25rem 0.5rem;
  background: rgba(65, 105, 225, 0.1);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  animation: ${float} ${props => props.delay}s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
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

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1rem;
  background: rgba(65, 105, 225, 0.1);
  border-radius: 10px;
  margin-bottom: ${props => props.isOpen ? '1rem' : '0'};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(65, 105, 225, 0.2);
  }

  h3 {
    margin: 0;
  }
`;

const Arrow = styled.span`
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
  font-size: 1.2rem;
`;

const SectionContent = styled.div`
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.6s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  align-items: center;
  margin: 1rem 0;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/background_image.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    z-index: -1;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ProfileDescription = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #fff;
  padding: 1.5rem;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
`;

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <SectionHeader isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <Arrow isOpen={isOpen}>▼</Arrow>
      </SectionHeader>
      <SectionContent isOpen={isOpen}>
        {children}
      </SectionContent>
    </div>
  );
};

const AboutMe = () => {
  const languages = ['Python', 'C', 'C++', 'JavaScript', 'TypeScript'];
  const tools = ['Git/GitHub', 'Replit', 'Firebase', 'RESTFUL APIs', 'Netlify', 'React', 'Tailwind', 'Figma'];
  const specialties = ['UI/UX Design', 'Web Design', 'API Integration', 'Project Management', 'Vulnerability Assessment'];

  return (
    <AboutContainer>
      <ProfileSection>
        <InfoSection>
          <Name>BRIGHT OMARI OWUSU</Name>
          
          <CollapsibleSection title="Profile">
            <ProfileGrid>
              <ProfileDescription>
                Let's Collaborate!
              </ProfileDescription>
              <ProfileImageContainer>
                <ProfileImage src="/profile_picture.jpg" alt="Bright Omari Owusu" />
              </ProfileImageContainer>
            </ProfileGrid>
          </CollapsibleSection>
          
          <CollapsibleSection title="Education & Background">
            <Education>
              <p>Grambling State University — Grambling, LA, USA</p>
              <p>Bachelor of Science in Cybersecurity Defense Strategy/Policy</p>
              <p>Expected: May 2028</p><br></br>
              <p>I am a dedicated Cybersecurity student at Grambling State University with a strong passion for securing web data and integrating software engineering principles into cybersecurity solutions. 
                <br />With proficiency in Python and JavaScript, I actively work on projects that enhance my technical expertise.
                I have a strong affinity for web development, and I achieve excellent work done using TailwindCSS, Figma, and React!.
                I also enjoy 3d rendering using Three.Js . <br /><br />Currently, I am seeking research, internships and other opportunities that will broaden my knowledge and professional network!. 
                My long term goal however is to leverage my skills to create innovative cybersecurity solutions while mentoring and supporting underprivileged individuals in tech.</p>
              <ResumeButton href="/owusuomaribright_resume.docx.pdf" target="_blank">
                Resume
              </ResumeButton>
            </Education>
          </CollapsibleSection>

          <CollapsibleSection title="Technical Expertise">
            <div>
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

              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#4169E1' }}>Tools & Frameworks</h4>
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

              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#4169E1' }}>Specialties</h4>
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
          </CollapsibleSection>
        </InfoSection>
      </ProfileSection>
    </AboutContainer>
  );
};

export default AboutMe;
