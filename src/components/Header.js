import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import CustomCursor from './CustomCursor';
import SnakeGame from './SnakeGame';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Styled-components for the updated layout
const HeaderSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at center, #1e3a8a, #3b82f6);
  color: white;
  padding: 8rem;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

// Styled-component for text animations
const Title = styled(motion(Typography))`
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: #bfdbfe;
  text-shadow: 4px 4px 12px rgba(59, 130, 246, 0.6);
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, color 0.3s ease;
`;

const Subtitle = styled(motion(Typography))`
  font-size: 1.8rem;
  font-weight: 300;
  color: #dbeafe;
  text-shadow: 2px 2px 8px rgba(59, 130, 246, 0.4);
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
`;

const DialogueBox = styled.div`
  margin-top: 2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem 2rem;
  border-radius: 8px;
  max-width: 600px;
  text-align: left;
  font-size: 1.2rem;
  color: #e0e0e0;
`;

// Animation configurations
const textVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    color: '#60a5fa',
    textShadow: '0px 0px 20px rgba(96, 165, 250, 0.8)',
    transition: { duration: 0.3 },
  },
};

// 3D Avatar Component
const Avatar = () => {
  return (
    <Canvas style={{ height: '400px', width: '400px' }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* Replace with your own 3D model */}
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'#00ff99'} />
      </mesh>
    </Canvas>
  );
};

const Header = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <CustomCursor />
      <HeaderSection ref={ref}>
        <SnakeGame />
        <Box className="content">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            whileHover="hover"
          >
            <Title variant="h1">Welcome to My Portfolio</Title>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            whileHover="hover"
          >
            <Subtitle variant="subtitle1">Rabbiya Jehangir - Web Developer</Subtitle>
          </motion.div>
          <Avatar />
          <DialogueBox>
            <p>
              Hi, I'm Rabbiya Jehangir, a passionate web developer with expertise in PHP, Laravel, and WordPress. I specialize in creating dynamic and responsive web applications that provide exceptional user experiences. I enjoy tackling complex problems and continuously learning new technologies to stay ahead in the ever-evolving web development landscape. Let's connect and explore how I can help bring your next project to life!
            </p>
          </DialogueBox>
        </Box>
      </HeaderSection>
    </>
  );
};

export default Header;
