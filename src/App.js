import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SolarSystem from './components/SolarSystem';
import Navigation from './components/Navigation';
import Rocket from './components/Rocket';
import Footer from './components/Footer';
import Education from './components/Education';
import Research from './components/Research';
import Skills from './components/Skills';

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

const StarsAnimation = keyframes`
  from { transform: translate(0, 0); }
  to { transform: translate(-50px, -50px); }
`;

const StarsBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ${StarsAnimation} 60s linear infinite;
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
    <AppContainer>
      <Navigation />
      <StarsBackground />
      <Rocket />
      <section id="home">
        <Header />
      </section>
      <section id="about">
        <Section>
          <SectionTitle>About Me</SectionTitle>
          <SectionContent>
            <AboutMe />
          </SectionContent>
        </Section>
      </section>
      <section id="experience">
        <Section>
          <SectionTitle>Experience</SectionTitle>
          <SectionContent>
            <Experience />
          </SectionContent>
        </Section>
      </section>
      <section id="projects">
        <Section>
          <SectionTitle>Projects</SectionTitle>
          <SectionContent>
            <Projects />
          </SectionContent>
        </Section>
      </section>
      <section id="skills">
        <Section>
          <SectionTitle>Skills</SectionTitle>
          <SectionContent>
            <Skills />
          </SectionContent>
        </Section>
      </section>
      <section id="education">
        <Section>
          <SectionTitle>Education</SectionTitle>
          <SectionContent>
            <Education />
          </SectionContent>
        </Section>
      </section>
      <section id="research">
        <Section>
          <SectionTitle>Research</SectionTitle>
          <SectionContent>
            <Research />
          </SectionContent>
        </Section>
      </section>
      <section id="contact">
        <Section>
          <SectionTitle>Contact</SectionTitle>
          <SectionContent>
            <Contact />
          </SectionContent>
        </Section>
      </section>
      <Footer />
    </AppContainer>
  );
}

export default App;
