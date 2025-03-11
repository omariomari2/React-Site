import React from 'react';
import styled from 'styled-components';

const ResearchContainer = styled.div`
  width: 100%;
`;

const ResearchCard = styled.div`
  background: rgba(10, 10, 40, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(65, 105, 225, 0.3);
  margin-bottom: 30px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(65, 105, 225, 0.2);
  }
`;

const ResearchImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 20, 0.7));
  }
`;

const ResearchImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a1a4a;
  background-image: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px);
  background-size: 550px 550px;
  position: relative;
  
  &::before {
    content: '🔬';
    position: absolute;
    font-size: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ResearchContent = styled.div`
  padding: 30px;
`;

const ResearchTitle = styled.h3`
  color: #4169E1;
  margin-bottom: 15px;
  font-size: 1.6rem;
`;

const ResearchStatus = styled.div`
  display: inline-block;
  background: rgba(65, 105, 225, 0.2);
  color: #4169E1;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  border: 1px solid rgba(65, 105, 225, 0.5);
`;

const ResearchDescription = styled.p`
  color: #E0E0FF;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 25px;
  text-align: justify;
`;

const ResearchObjectives = styled.div`
  margin-top: 20px;
`;

const ObjectiveTitle = styled.h4`
  color: #A0A0FF;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const ObjectivesList = styled.ul`
  padding-left: 20px;
`;

const ObjectiveItem = styled.li`
  color: #E0E0FF;
  margin-bottom: 10px;
  line-height: 1.6;
  
  &::marker {
    color: #4169E1;
  }
`;

const FollowButton = styled.a`
  display: block;
  width: 90%;
  margin: 20px auto;
  padding: 10px 20px;
  background: #4169E1;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #375a9e;
  }
`;

const Research = () => {
  const researchProject = {
    id: 1,
    title: 'Remote Working and Monitoring Technology',
    status: 'Ongoing Research',
    description: 'This research investigates the impact of workplace monitoring technologies on employee productivity, satisfaction, and well-being. It gathers insights through surveys and interviews with both employers and employees, while also exploring the legal and ethical dimensions of these monitoring systems. The study aims to provide a balanced view of workplace monitoring\'s effects and contribute to the development of a comprehensive solution that promotes transparency, employee trust, and compliance with ethical and legal standards, all while ensuring productivity and organizational efficiency. The resulting product solution will offer a responsible and effective approach to monitoring in modern workplaces.',
    objectives: [
      'Analyze the effects of monitoring technologies on employee productivity and well-being',
      'Explore legal and ethical considerations in workplace monitoring',
      'Gather perspectives from both employers and employees through surveys and interviews',
      'Develop a balanced monitoring solution that respects privacy while maintaining productivity',
      'Create guidelines for transparent and ethical implementation of monitoring systems'
    ],
    team: 'Other Side Research Team',
    startDate: 'January 2025'
  };

  return (
    <ResearchContainer>
      <ResearchCard>
        <ResearchImageContainer>
          <ResearchImage />
        </ResearchImageContainer>
        <ResearchContent>
          <ResearchTitle>{researchProject.title}</ResearchTitle>
          <ResearchStatus>{researchProject.status}</ResearchStatus>
          <ResearchDescription>{researchProject.description}</ResearchDescription>
          
          <ResearchObjectives>
            <ObjectiveTitle>Research Objectives</ObjectiveTitle>
            <ObjectivesList>
              {researchProject.objectives.map((objective, index) => (
                <ObjectiveItem key={index}>{objective}</ObjectiveItem>
              ))}
            </ObjectivesList>
          </ResearchObjectives>
          
          <div style={{ marginTop: '20px', color: '#A0A0FF' }}>
            <p><strong>Research Team:</strong> {researchProject.team}</p>
            <p><strong>Started:</strong> {researchProject.startDate}</p>
          </div>

          <FollowButton href="https://omariomari2.github.io/The-Research-Team/" target="_blank">
            Follow Research Process
          </FollowButton>
        </ResearchContent>
      </ResearchCard>
    </ResearchContainer>
  );
};

export default Research;
