import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const SkillCategory = styled.div`
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h3`
  color: #4169E1;
  margin-bottom: 20px;
  font-size: 1.4rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #4169E1, transparent);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const SkillItem = styled.div`
  background: rgba(10, 10, 40, 0.5);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(65, 105, 225, 0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #4169E1;
`;

const SkillName = styled.p`
  color: #E0E0FF;
  font-size: 1rem;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.level}%;
    background: linear-gradient(90deg, #4169E1, #00BFFF);
    border-radius: 10px;
  }
`;

const ProjectCard = styled.div`
  width: 100%;
  min-height: 700px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  margin-bottom: 30px;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.6);
  }
`;

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  perspective: 1000px;
  
  @media (max-width: 960px) {
    gap: 20px;
  }
`;

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      title: 'Languages',
      skills: [
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'C', level: 75, icon: '©️' },
        { name: 'C++', level: 80, icon: '➕' },
        { name: 'JavaScript', level: 90, icon: '📜' },
        { name: 'TypeScript', level: 85, icon: '🔷' }
      ]
    },
    {
      id: 2,
      title: 'Tools/Technology',
      skills: [
        { name: 'Git/GitHub', level: 85, icon: '📊' },
        { name: 'Replit', level: 80, icon: '🔄' },
        { name: 'Firebase', level: 80, icon: '🔥' },
        { name: 'RESTFUL APIs', level: 85, icon: '🔌' },
        { name: 'Netlify', level: 75, icon: '🌐' },
        { name: 'React', level: 85, icon: '⚛️' },
        { name: 'Tailwind', level: 80, icon: '🎨' }
      ]
    },
    {
      id: 3,
      title: 'Skills',
      skills: [
        { name: 'UI/UX Design', level: 80, icon: '🎭' },
        { name: 'API Integration', level: 85, icon: '🔗' },
        { name: 'Project Management', level: 80, icon: '📋' },
        { name: 'Vulnerability Assessment', level: 85, icon: '🛡️' }
      ]
    }
  ];

  return (
    <SkillsContainer>
      {skillCategories.map(category => (
        <SkillCategory key={category.id}>
          <CategoryTitle>{category.title}</CategoryTitle>
          <SkillsGrid>
            {category.skills.map((skill, index) => (
              <SkillItem key={index}>
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel level={skill.level} />
              </SkillItem>
            ))}
          </SkillsGrid>
        </SkillCategory>
      ))}
    </SkillsContainer>
  );
};

export default Skills;
