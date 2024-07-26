import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`;

const glowingText = keyframes`
  0% { text-shadow: 0 0 5px #00bfae, 0 0 10px #00bfae, 0 0 15px #00bfae, 0 0 20px #00bfae, 0 0 25px #00bfae; }
  100% { text-shadow: 0 0 10px #00bfae, 0 0 20px #00bfae, 0 0 30px #00bfae, 0 0 40px #00bfae, 0 0 50px #00bfae; }
`;

const StartText = styled.div`
  position: absolute;
  color: #00bfae;
  font-size: 3rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  animation: ${glowingText} 1.5s infinite alternate;
  cursor: pointer;
`;

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const [apple, setApple] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [obstacles, setObstacles] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);

  // Handle canvas resizing
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate obstacles when canvas size changes
  useEffect(() => {
    generateObstacles();
  }, [canvasSize]);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let lastTime = 0;

    const gameLoop = (time) => {
      if (gameRunning) {
        const timeDelta = time - lastTime;
        if (timeDelta > 100) { // Update every 100ms
          updateGameLogic(context);
          lastTime = time;
        }
        requestAnimationFrame(gameLoop);
      }
    };

    requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(gameLoop);
  }, [gameRunning, direction, snake, apple, obstacles]);

  // Generate obstacles randomly
  const generateObstacles = () => {
    const newObstacles = [];
    for (let i = 0; i < 10; i++) {
      const obstacle = {
        x: Math.floor(Math.random() * (canvasSize.width / 20)),
        y: Math.floor(Math.random() * (canvasSize.height / 20))
      };
      newObstacles.push(obstacle);
    }
    setObstacles(newObstacles);
  };

  // Update the game logic
  const updateGameLogic = (context) => {
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

    // Check collisions
    if (
      head.x < 0 ||
      head.x >= canvasSize.width / 20 ||
      head.y < 0 ||
      head.y >= canvasSize.height / 20 ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y) ||
      obstacles.some((obstacle) => obstacle.x === head.x && obstacle.y === head.y)
    ) {
      resetGame();
      return;
    }

    // Move snake
    newSnake.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
      setApple({
        x: Math.floor(Math.random() * canvasSize.width / 20),
        y: Math.floor(Math.random() * canvasSize.height / 20)
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    drawGame(context, newSnake, apple);
  };

  // Draw the game state
  const drawGame = (context, snake, apple) => {
    context.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw background with gradient
    const gradient = context.createLinearGradient(0, 0, canvasSize.width, canvasSize.height);
    gradient.addColorStop(0, '#000');
    gradient.addColorStop(1, '#005b5b');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw obstacles
    context.fillStyle = '#004d4d';
    obstacles.forEach((obstacle) => {
      context.fillRect(obstacle.x * 20, obstacle.y * 20, 20, 20);
    });

    // Draw snake
    context.fillStyle = '#00bfae';
    snake.forEach((segment) => {
      context.beginPath();
      context.arc(segment.x * 20 + 10, segment.y * 20 + 10, 10, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = '#008080';
      context.lineWidth = 2;
      context.stroke();
    });

    // Draw apple
    context.fillStyle = '#ff4d4d';
    context.beginPath();
    context.arc(apple.x * 20 + 10, apple.y * 20 + 10, 10, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = '#cc0000';
    context.lineWidth = 2;
    context.stroke();
  };

  // Handle mouse movements to control snake direction
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const snakeHead = snake[0];
    const snakeHeadX = snakeHead.x * 20 + 10;
    const snakeHeadY = snakeHead.y * 20 + 10;

    let newDirection = { x: 0, y: 0 };
    if (Math.abs(mouseX - snakeHeadX) > Math.abs(mouseY - snakeHeadY)) {
      newDirection = mouseX > snakeHeadX ? { x: 1, y: 0 } : { x: -1, y: 0 };
    } else {
      newDirection = mouseY > snakeHeadY ? { x: 0, y: 1 } : { x: 0, y: -1 };
    }

    // Prevent reversing direction directly
    if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
      setDirection(newDirection);
    }
  };

  // Handle touch movements for mobile devices
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [snake, direction]);

  // Start the game
  const handleClick = () => {
    setGameRunning(true);
  };

  // Reset the game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
    setApple({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setGameRunning(false);
  };

  return (
    <CanvasWrapper onClick={handleClick}>
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      {!gameRunning && <StartText>Click to Start</StartText>}
    </CanvasWrapper>
  );
};

export default SnakeGame;
