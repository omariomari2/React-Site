import React from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
  width: 100%;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 3px;
    background: linear-gradient(to bottom, transparent, #4169E1, transparent);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -1.5px;
  }
  
  @media screen and (max-width: 768px) {
    &::after {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  
  &:nth-child(odd) {
    left: 0;
  }
  
  &:nth-child(even) {
    left: 50%;
  }
  
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    
    &:nth-child(odd), &:nth-child(even) {
      left: 0;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background: rgba(10, 10, 40, 0.5);
  position: relative;
  border-radius: 10px;
  border: 1px solid rgba(65, 105, 225, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #4169E1;
  border-radius: 50%;
  top: 15px;
  right: -10px;
  z-index: 1;
  box-shadow: 0 0 10px rgba(65, 105, 225, 0.7);
  
  ${TimelineItem}:nth-child(even) & {
    left: -10px;
  }
  
  @media screen and (max-width: 768px) {
    left: 21px;
    right: auto;
    
    ${TimelineItem}:nth-child(even) & {
      left: 21px;
    }
  }
`;

const JobTitle = styled.h3`
  color: #4169E1;
  margin-bottom: 10px;
  font-size: 1.4rem;
`;

const CompanyName = styled.h4`
  color: #E0E0FF;
  margin-bottom: 10px;
  font-size: 1.1rem;
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

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Tech Research Team Member',
      company: 'Other Side Research Team',
      period: 'Jan 2025 - Present',
      description: 'Contributed to research on developing a remote employee monitoring solution that balances legal, well-being, and productivity needs for both employees and employers.'
    },
    {
      id: 2,
      title: 'Junior Intern',
      company: 'Citizens Bank, Nsawam',
      period: 'Jan 2024 - Mar 2024',
      description: 'Assisted the Chief Information Security Officer (CISO) in maintaining and strengthening the organization\'s security posture, contributing to vulnerability assessments and incident reporting. Identified, tested, and reported vulnerabilities on internal banking platforms to mitigate cyber risks.'
    },
    {
      id: 3,
      title: 'Assistant Tutor & Online Coordinator',
      company: 'IT Team, MIGY Consult',
      period: 'Feb 2023 - May 2023',
      description: 'Assisted in troubleshooting technical issues for students, providing step-by-step guidance and enhancing their understanding of IT concepts. Collaborated with IT team members to identify and implement improvements to the tutoring platform.'
    },
    {
      id: 4,
      title: 'IT Support Volunteer',
      company: 'National Health Insurance Scheme',
      period: 'Nov 2022 - Feb 2023',
      description: 'Supported staff in gathering and inputting and managing detailed client information within a secure database, ensuring accuracy and confidentiality. Collaborated with the IT team to design and develop a user-friendly website for efficient client data logging and management.'
    }
  ];

  return (
    <ExperienceContainer>
      <Timeline>
        {experiences.map(exp => (
          <TimelineItem key={exp.id}>
            <TimelineDot />
            <TimelineContent>
              <JobTitle>{exp.title}</JobTitle>
              <CompanyName>{exp.company}</CompanyName>
              <Period>{exp.period}</Period>
              <Description>{exp.description}</Description>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </ExperienceContainer>
  );
};

export default Experience;
