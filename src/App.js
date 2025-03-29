import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header';
import SolarSystem from './components/SolarSystem';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Research from './components/Research';
import Rocket from './components/Rocket';
import Footer from './components/Footer';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  background-image: 
    radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
    radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
    radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
    radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
  background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
  background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
  color: #fff;
  overflow-x: hidden;
  position: relative;
  z-index: 2;
`;

const StarsBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: black;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${keyframes`
      from { transform: translate(0, 0); }
      to { transform: translate(-50px, -50px); }
    `} 60s linear infinite;
  }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 2;
  
  &#about {
    padding-top: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #4169E1;
  text-shadow: 0 0 10px rgba(65, 105, 225, 0.7);
  position: relative;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #4169E1, transparent);
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  background-color: rgba(0, 0, 20, 0.7);
  border-radius: 15px;
  padding: 15px;
  border: 1px solid rgba(65, 105, 225, 0.3);
  box-shadow: 0 0 20px rgba(65, 105, 225, 0.2);
  position: relative;
  z-index: 2;
`;

function App() {
  return (
    <div className="App">
      <StarsBackground />
      <Rocket />
      <AppContainer>
        <Header />
        <SolarSystem />
        
        <Section id="about">
          <SectionTitle>About Me</SectionTitle>
          <SectionContent>
            <AboutMe />
          </SectionContent>
        </Section>
        
        <Section id="projects">
          <SectionTitle>Projects</SectionTitle>
          <SectionContent>
            <Projects />
          </SectionContent>
        </Section>
        
        <Section id="skills">
          <SectionTitle>Skills</SectionTitle>
          <SectionContent>
            <Skills />
          </SectionContent>
        </Section>
        
        <Section id="experience">
          <SectionTitle>Experience</SectionTitle>
          <SectionContent>
            <Experience />
          </SectionContent>
        </Section>
        
        <Section id="education">
          <SectionTitle>Education</SectionTitle>
          <SectionContent>
            <Education />
          </SectionContent>
        </Section>
        
        <Section id="research">
          <SectionTitle>Research</SectionTitle>
          <SectionContent>
            <Research />
          </SectionContent>
        </Section>
        
        <Section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <SectionContent>
            <Contact />
          </SectionContent>
        </Section>
        
        <Footer />
      </AppContainer>
    </div>
  );
}

export default App;
