import React from 'react';
import GlobalStyles from './Styles/GlobalStyles';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import CustomCursor from './components/CustomCursor';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Skills from './components/Skills';



function App() {
  return (
    <>
      <GlobalStyles />
      <CustomCursor />
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
