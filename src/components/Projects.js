import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Keyframes for animations
const gradientMove = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const cardHover = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.07); }
  100% { transform: scale(1); }
`;

const overlayShow = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #000000, #004d40);
  background-size: 400% 400%;
  animation: ${gradientMove} 20s ease infinite;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const ProjectsTitle = styled.h2`
  font-size: 4rem;
  margin-bottom: 4rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  line-height: 1.2;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-content: center;
  align-items: start;
  position: relative;
`;

const Project = styled(motion.div)`
  position: relative;
  background: #000000;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    animation: ${cardHover} 0.5s ease-in-out;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 4px solid #004d40;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
    filter: brightness(80%);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem;
    border-radius: 16px;
    animation: ${overlayShow} 0.5s ease-in-out;
    letter-spacing: 1px;
  }

  &:hover .overlay {
    opacity: 1;
  }

  h3 {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.5rem;
    border-radius: 4px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
  }

  &:hover h3 {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const projects = [
  { title: 'E-Commerce Web Application', image: './shop.png', githubUrl: 'https://github.com/yourusername/e-commerce' },
  { title: 'Chat Application', image: './chat2.png', githubUrl: 'https://github.com/yourusername/chat-app' },
  { title: 'Task Management Application', image: './tasks.png', githubUrl: 'https://github.com/yourusername/task-manager' },
  { title: 'Portfolio Website', image: './portfolio.png', githubUrl: 'https://github.com/yourusername/portfolio' },
  { title: 'Weather Dashboard', image: './weather.png', githubUrl: 'https://github.com/yourusername/weather-dashboard' },
  { title: 'Recipe Finder', image: './recipe.png', githubUrl: 'https://github.com/yourusername/recipe-finder' },
];

const projectVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
};

const Projects = () => {
  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <ProjectsSection>
      <ProjectsTitle>Projects</ProjectsTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <Project
            key={index}
            initial="hidden"
            animate="visible"
            variants={projectVariants}
            onClick={() => handleCardClick(project.githubUrl)}
          >
            <img src={project.image} alt={project.title} />
            <div className="overlay">View on GitHub</div>
            <h3>{project.title}</h3>
          </Project>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
