import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const Nav = styled(animated.nav)`
  background: rgba(51, 51, 51, 0.9);
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  h1 {
    font-family: 'Pacifico', cursive;
    font-size: 2rem;
  }

  ul {
    display: flex;
    list-style: none;

    li {
      margin-left: 1.5rem;
      cursor: pointer;
      transition: color 0.3s, transform 0.3s;
      position: relative;
      padding-bottom: 0.5rem;

      &:hover {
        color: #00aaff;
        transform: scale(1.1);

        &::after {
          width: 100%;
          left: 0;
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 2px;
        background: #00aaff;
        transition: width 0.3s ease, left 0.3s ease;
      }

      &.active {
        color: #00aaff;
      }
    }
  }

  @media (max-width: 768px) {
    ul {
      display: none;
    }
  }
`;

const MenuButton = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    width: 25px;
    height: 3px;
    background: #fff;
    margin: 3px 0;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 60px;
  right: 20px;
  background: rgba(51, 51, 51, 0.9);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &.open {
    display: block;
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;

    li {
      margin: 0.5rem 0;
      cursor: pointer;
      transition: color 0.3s;
      padding-bottom: 0.5rem;

      &:hover {
        color: #00aaff;
      }

      &.active {
        color: #00aaff;
      }
    }
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navAnimation = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 300 });

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Nav style={navAnimation}>
      <h1>Rabbiya Jehangir</h1>
      <MenuButton onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </MenuButton>
      <ul>
        <li className="active">About</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
      <MobileMenu className={menuOpen ? 'open' : ''}>
        <ul>
          <li className="active">About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
