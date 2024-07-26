import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaLaravel, FaPhp } from 'react-icons/fa';
import BackgroundAnimation from './BackgroundAnimation'; // Import your BackgroundAnimation component

// Keyframes for various animations
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

// Styled-components for the updated theme
const SkillsSection = styled.section`
  padding: 5rem 2rem;
  color: #fff;
  text-align: center;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(0, 150, 150, 0.1));
    opacity: 0.3;
    z-index: 0;
    transform: scale(1.5);
    filter: blur(3px);
  }
`;

const SkillsTitle = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 3rem;
  color: #000000;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:after {
    content: '';
    display: block;
    width: 5rem;
    height: 0.25rem;
    background: #00bfae;
    margin: 1rem auto 0;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SkillCard = styled(animated.div)`
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #222, #333);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
  animation: ${pulse} 2s infinite ease-in-out;
  cursor: pointer;
  will-change: transform, box-shadow;

  &:hover {
    background: linear-gradient(135deg, rgba(0, 150, 150, 0.5), rgba(255, 0, 150, 0.5));
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
    animation: ${rotate} 2s linear infinite;
  }

  .icon {
    font-size: 3.5rem;
    color: #fff;
    transition: color 0.3s, transform 0.3s;
  }

  &:hover .icon {
    color: #00bfae;
    transform: scale(1.2);
  }

  .tooltip {
    position: absolute;
    bottom: 140%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 2;
    will-change: opacity, transform;
  }

  &:hover .tooltip {
    opacity: 1;
    transform: translateY(-10px);
  }
`;

const skills = [
  { name: 'HTML', icon: <FaHtml5 />, description: 'Hypertext Markup Language' },
  { name: 'CSS', icon: <FaCss3Alt />, description: 'Cascading Style Sheets' },
  { name: 'JavaScript', icon: <FaJsSquare />, description: 'Programming Language for the Web' },
  { name: 'React', icon: <FaReact />, description: 'JavaScript Library for Building UIs' },
  { name: 'Laravel', icon: <FaLaravel />, description: 'PHP Framework for Web Artisans' },
  { name: 'PHP', icon: <FaPhp />, description: 'Server-side Scripting Language' },
];

const Skills = () => {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 300,
  });

  return (
    <SkillsSection>
      <BackgroundAnimation />
      <SkillsTitle>My Skills</SkillsTitle>
      <SkillsGrid>
        {skills.map(skill => (
          <SkillCard key={skill.name} style={springProps}>
            <div className="icon">{skill.icon}</div>
            <div className="tooltip">{skill.description}</div>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;
