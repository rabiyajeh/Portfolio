import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { createGlobalStyle } from 'styled-components';

// Global Styles to include a custom font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

// Keyframes for animations
const slideIn = keyframes`
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background: linear-gradient(135deg, #004d40, #000000); }
  50% { background: linear-gradient(135deg, #00575b, #000000); }
  100% { background: linear-gradient(135deg, #004d40, #000000); }
`;

const ContactSection = styled.section`
  padding: 4rem 2rem;
  background: #000000;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #fff;
  animation: ${gradientBackground} 30s ease infinite;

  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #00aaff;
    animation: ${slideIn} 1s ease-out;
    text-shadow: 0 4px 6px rgba(0, 255, 255, 0.6);
    letter-spacing: 1px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  input, textarea {
    padding: 1rem;
    border: 2px solid #333;
    border-radius: 12px;
    font-size: 1rem;
    width: 100%;
    background: #222;
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;

    &:focus {
      border-color: #00aaff;
      background: #333;
      outline: none;
      box-shadow: 0 6px 12px rgba(0, 255, 255, 0.5);
    }

    &::placeholder {
      color: #999;
    }
  }

  button {
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background-color: #00aaff;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    animation: ${pulse} 1.5s infinite;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

    &:hover {
      background-color: #0077cc;
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 255, 255, 0.4);
    }
  }
`;

const Contact = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
  });

  return (
    <>
      <GlobalStyle />
      <ContactSection>
        <animated.div style={fadeIn}>
          <h2>Contact</h2>
          <ContactForm>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message" rows="6"></textarea>
            <button type="submit">Send</button>
          </ContactForm>
        </animated.div>
      </ContactSection>
    </>
  );
};

export default Contact;
