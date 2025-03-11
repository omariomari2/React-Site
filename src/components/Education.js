import React from 'react';
import styled from 'styled-components';

const EducationContainer = styled.div`
  width: 100%;
`;

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const EducationCard = styled.div`
  background: rgba(10, 10, 40, 0.5);
  border-radius: 10px;
  padding: 25px;
  border: 1px solid rgba(65, 105, 225, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(65, 105, 225, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #4169E1, #00BFFF);
  }
`;

const Degree = styled.h3`
  color: #4169E1;
  margin-bottom: 10px;
  font-size: 1.4rem;
`;

const Institution = styled.h4`
  color: #E0E0FF;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const Period = styled.p`
  color: #A0A0FF;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const Description = styled.p`
  color: #E0E0FF;
  font-size: 1rem;
  line-height: 1.6;
`;

const AchievementsList = styled.ul`
  margin-top: 15px;
  padding-left: 20px;
`;

const AchievementItem = styled.li`
  color: #E0E0FF;
  margin-bottom: 8px;
  line-height: 1.5;
  
  &::marker {
    color: #4169E1;
  }
`;

const Education = () => {
  const educationItems = [
    {
      id: 1,
      degree: 'Bachelor of Science in Cybersecurity Defense Strategy/Policy',
      institution: 'Grambling State University — Grambling, LA, USA',
      period: 'Expected May 2028',
      description: 'Pursuing a degree in Cybersecurity with focus on defense strategies and policy implementation.',
      achievements: [
        'Relevant Coursework: Data Structures and Algorithms',
        'Fundamentals of Cybersecurity',
        'Operating Systems',
        'Object-Oriented Programming',
        'Computer Systems & Network'
      ]
    },
    {
      id: 2,
      degree: 'Full Stack Open',
      institution: 'University of Helsinki — Online',
      period: 'January 2025 - March 2025',
      description: 'Comprehensive online program covering modern web application development with JavaScript.',
      achievements: [
        'Relevant Coursework: React',
        'Node.js',
        'MongoDB',
        'GraphQL',
        'TypeScript',
        'CI/CD',
        'Docker'
      ]
    },
    {
      id: 3,
      degree: 'Cybersecurity Training',
      institution: 'Cybrary — Online',
      period: 'February 2025 - Present',
      description: 'Specialized training in cybersecurity concepts and practical applications.',
      achievements: [
        'Relevant Coursework: Core Cybersecurity Concepts',
        'Interactive Labs',
        'Certification Preparation',
        'Virtual Labs and Assessments'
      ]
    }
  ];

  return (
    <EducationContainer>
      <EducationList>
        {educationItems.map(item => (
          <EducationCard key={item.id}>
            <Degree>{item.degree}</Degree>
            <Institution>{item.institution}</Institution>
            <Period>{item.period}</Period>
            <Description>{item.description}</Description>
            <AchievementsList>
              {item.achievements.map((achievement, index) => (
                <AchievementItem key={index}>{achievement}</AchievementItem>
              ))}
            </AchievementsList>
          </EducationCard>
        ))}
      </EducationList>
    </EducationContainer>
  );
};

export default Education;
