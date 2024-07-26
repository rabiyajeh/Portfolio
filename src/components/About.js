import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter';
import BackgroundAnimation from './BackgroundAnimation'; // Import your BackgroundAnimation component

// Keyframes for the animations
const textAnimation = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const iconAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled-components for the new layout and theme
const AboutSection = styled.section`
  padding: 4rem 2rem;
  background: #1a1a1a;
  color: #fff;
  text-align: center;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const AboutContent = styled(animated.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
    animation: ${textAnimation} 1s ease-out;
    color: #00ff99;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    position: relative;
    animation: ${textAnimation} 1.5s ease-out;
    margin-bottom: 2rem;
    color: #e0e0e0;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Button = styled.a`
  display: inline-block;
  margin: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #1a1a1a;
  background: #00ff99;
  border: 2px solid #00ff99;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #00cc77;
    color: #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`;

const Icon = styled.div`
  display: inline-block;
  margin: 1rem;
  padding: 1rem;
  animation: ${iconAnimation} 3s infinite;
  svg {
    width: 40px;
    height: 40px;
    fill: #00ff99;
  }
`;

const ProgressBarContainer = styled.div`
  margin: 1rem 0;
  text-align: left;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #00ff99;
  }
`;

const ProgressBar = styled.div`
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  height: 20px;

  &:after {
    content: '';
    display: block;
    height: 100%;
    background: #00ff99;
    width: ${props => props.percentage}%;
    transition: width 1s ease-in-out;
  }
`;

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const slideIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 500 },
  });

  return (
    <AboutSection ref={ref}>
      <BackgroundAnimation />
      <AboutContent style={slideIn}>
        <h2>About Me</h2>
        <p>
          <Typewriter
            words={['I’m Rabbiya Jehangir, a Junior Web Developer with hands-on experience in PHP, Laravel, and WordPress. Skilled in building and optimizing web applications using PHP, Laravel, MySQL, HTML, CSS, and JavaScript.']}
            loop={1}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <div>
          <Icon>
            <svg viewBox="0 0 24 24">
              <path d="M12 2l1.09 6.26L18 8.27l-4.15 4.04L15 20l-5.09-3.04L5 20l1.14-7.69L2 8.27l4.91-.01L12 2z" />
            </svg>
          </Icon>
          <Icon>
            <svg viewBox="0 0 24 24">
              <path d="M12 2l1.09 6.26L18 8.27l-4.15 4.04L15 20l-5.09-3.04L5 20l1.14-7.69L2 8.27l4.91-.01L12 2z" />
            </svg>
          </Icon>
          <Icon>
            <svg viewBox="0 0 24 24">
              <path d="M12 2l1.09 6.26L18 8.27l-4.15 4.04L15 20l-5.09-3.04L5 20l1.14-7.69L2 8.27l4.91-.01L12 2z" />
            </svg>
          </Icon>
        </div>
        <ProgressBarContainer>
          <h3>PHP</h3>
          <ProgressBar percentage={80} />
        </ProgressBarContainer>
        <ProgressBarContainer>
          <h3>Laravel</h3>
          <ProgressBar percentage={70} />
        </ProgressBarContainer>
        <ProgressBarContainer>
          <h3>JavaScript</h3>
          <ProgressBar percentage={85} />
        </ProgressBarContainer>
        <Button href="#projects">View Projects</Button>
        <Button href="#contact">Contact Me</Button>
      </AboutContent>
    </AboutSection>
  );
};

export default About;
