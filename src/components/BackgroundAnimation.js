import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    const colors = ['#00bfae', '#ff6f61', '#ffcc00', '#00aaff'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const updateParticle = (particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > canvas.width || particle.x < 0) particle.speedX *= -1;
      if (particle.y > canvas.height || particle.y < 0) particle.speedY *= -1;
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        drawParticle(particle);
        updateParticle(particle);
      });
      requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
    
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <CanvasContainer><canvas ref={canvasRef} /></CanvasContainer>;
};

export default BackgroundAnimation;
