import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 20, 0.95));
  padding: 40px 20px;
`;

const meteorMove = keyframes`
  0% {
    transform: translate(var(--start-x), var(--start-y));
    opacity: 0;
  }
  2% {
    opacity: 1;
  }
  98% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--end-x), var(--end-y));
    opacity: 0;
  }
`;

const Comet = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  filter: blur(0.5px);
  z-index: 1;
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: ${props => props.trailLength || 150}px;
    height: 1px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.95), transparent);
    left: ${props => -(props.trailLength || 150) + 2}px;
  }
  
  animation: ${meteorMove} var(--duration) linear infinite;
  animation-delay: var(--delay);
`;

const ProjectCard = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  min-height: 450px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(65, 105, 225, 0.3);
  z-index: 2;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    opacity: 1;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 10, 40, 0.2);
    z-index: -1;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  
  @media (hover: hover) and (pointer: fine) {
    &:hover::after {
      opacity: 0;
    }
    
    &:hover .project-content {
      opacity: 1;
      transform: translateY(0);
    }
    
    &:hover .project-title-overlay {
      opacity: 0;
    }
  }
`;

const ProjectTitleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: opacity 0.5s ease;
  
  h2 {
    font-size: 2.5rem;
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7);
    font-weight: 700;
    text-align: center;
    padding: 0 20px;
  }
  
  @media (max-width: 768px) {
    opacity: 0;
  }
`;

const ProjectContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(10, 10, 40, 0.7);
  backdrop-filter: blur(3px);
  z-index: 2;
  
  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }
  
  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProjectType = styled.div`
  font-size: 0.9rem;
  color: #4169E1;
  margin-bottom: 10px;
  opacity: 0.8;
  transition: all 0.3s ease;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 15px;
  transition: all 0.3s ease;
`;

const ProjectDescription = styled.p`
  color: #B0B0D0;
  margin-bottom: 20px;
  line-height: 1.6;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    max-height: 100px;
    overflow-y: hidden;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
`;

const TechTag = styled.span`
  padding: 4px 12px;
  background: rgba(65, 105, 225, 0.2);
  border-radius: 15px;
  font-size: 0.8rem;
  color: #B0B0FF;
  border: 1px solid rgba(65, 105, 225, 0.3);
  transition: all 0.3s ease;
`;

const ProjectLink = styled.a`
  display: inline-block;
  padding: 8px 20px;
  background: rgba(65, 105, 225, 0.2);
  color: #fff;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(65, 105, 225, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover {
    background: rgba(65, 105, 225, 0.4);
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const Projects = () => {
  const [comets, setComets] = useState([]);

  useEffect(() => {
    const generateComet = () => {
      const directions = [
        { startX: -100, startY: Math.random() * 80 + 10, endX: '120%', endY: Math.random() * 80 + 10 },
        { startX: '120%', startY: Math.random() * 80 + 10, endX: -100, endY: Math.random() * 80 + 10 },
        { startX: Math.random() * 80 + 10, startY: -100, endX: Math.random() * 80 + 10, endY: '120%' },
        { startX: Math.random() * 80 + 10, startY: '120%', endX: Math.random() * 80 + 10, endY: -100 }
      ];

      const direction = directions[Math.floor(Math.random() * directions.length)];
      const speed = Math.random() * 1.5 + 0.8;
      
      return {
        id: Math.random(),
        startX: direction.startX,
        startY: direction.startY,
        endX: direction.endX,
        endY: direction.endY,
        duration: speed,
        delay: Math.random() * 3,
        trailLength: Math.floor(Math.random() * 100) + 100
      };
    };

    setComets(Array.from({ length: 12 }, generateComet));

    const addNewComet = () => {
      setComets(prev => [...prev.slice(-11), generateComet()]);
      setTimeout(addNewComet, Math.random() * 500 + 200);
    };

    const timeout = setTimeout(addNewComet, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Map project titles to their corresponding image files
  const projectImages = {
    "Pomodoro Play": "/project_images/pomodoro.png",
    "Website Vulnerability Scanner": "/project_images/website_vulnerabitlity_scanner.jpg",
    "Church Website": "/project_images/church_website.png",
    "Research Team Platform": "/project_images/research_team.png",
    "Typing Speed Game": "/project_images/typing_speed_game.jpg",
    "Collaborate": "" // No specific image for this one
  };

  const projects = [
    {
      id: 1,
      type: "Chrome Extension",
      title: "Pomodoro Play",
      description: "An all-in-one Chrome extension leveraging the Pomodoro Technique, integrating timers, ambient music, mini-games and features like tab tracking, video bookmarking, to-do lists to create an engaging work-break balance and enhance productivity",
      tech: ["JavaScript", "JSON", "Chrome API"],
      link: "https://github.com/omariomari2/Pomodoro-Play.git"
    },
    {
      id: 2,
      type: "Security Tool",
      title: "Website Vulnerability Scanner",
      description: "Python-based scanner utilizing asynchronous programming to detect vulnerabilities, with Gemini API integration for simplified reporting.",
      tech: ["Python", "Asyncio", "Gemini API"],
      link: "https://github.com/omariomari2/Website-Vulnerability-Scanner.git"
    },
    {
      id: 3,
      type: "Web Development",
      title: "Church Website",
      description: "Dynamic website for a local church featuring responsive design and modern UI/UX principles.",
      tech: ["React", "Tailwind", "Node.js", "Netlify"],
      link: "https://welcome-to-church.netlify.app/"
    },
    {
      id: 4,
      type: "Collaboration Platform",
      title: "Research Team Platform",
      description: "Centralized platform for research team collaboration with secure Firebase authentication, task sharing, and dynamic content management.",
      tech: ["HTML/CSS", "JavaScript", "Firebase"],
      link: "https://omariomari2.github.io/The-Research-Team/"
    },
    {
      id: 5,
      type: "Game Development",
      title: "Typing Speed Game",
      description: "Interactive Python-based typing speed game that tracks and analyzes users' typing performance within a set time limit.",
      tech: ["Python", "UI/UX", "Real-time Processing"],
      link: "https://github.com/omariomari2/Words-Per-Minute-"
    },
    {
      id: 6,
      type: "Collaboration",
      title: "Collaborate",
      description: "Connect with me on LinkedIn or via email to discuss potential collaborations or opportunities.",
      tech: ["Networking", "Communication"],
      links: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/your-linkedin-profile" },
        { name: "Email", url: "mailto:your-email@example.com" }
      ]
    }
  ];

  return (
    <ProjectsContainer>
      {comets.map(comet => (
        <Comet
          key={comet.id}
          trailLength={comet.trailLength}
          style={{
            '--start-x': typeof comet.startX === 'number' ? `${comet.startX}%` : comet.startX,
            '--start-y': typeof comet.startY === 'number' ? `${comet.startY}%` : comet.startY,
            '--end-x': typeof comet.endX === 'number' ? `${comet.endX}%` : comet.endX,
            '--end-y': typeof comet.endY === 'number' ? `${comet.endY}%` : comet.endY,
            '--duration': `${comet.duration}s`,
            '--delay': `${comet.delay}s`
          }}
        />
      ))}
      
      {projects.map(project => (
        <ProjectCard 
          key={project.id}
          style={{
            '--bg-image': project.title in projectImages && projectImages[project.title] 
              ? `url(${projectImages[project.title]})` 
              : 'none'
          }}
        >
          <ProjectTitleOverlay className="project-title-overlay">
            <h2>{project.title}</h2>
          </ProjectTitleOverlay>
          
          <ProjectContent className="project-content">
            <ProjectType>{project.type}</ProjectType>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.tech.map((tech, index) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </TechStack>
            {project.links ? (
              project.links.map(link => (
                <ProjectLink key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </ProjectLink>
              ))
            ) : (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </ProjectLink>
            )}
          </ProjectContent>
        </ProjectCard>
      ))}
    </ProjectsContainer>
  );
};

export default Projects;
