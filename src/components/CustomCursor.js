import React, { useEffect } from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease-in-out;
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return <Cursor className="cursor" />;
};

export default CustomCursor;
