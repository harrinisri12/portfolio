import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Education from '../components/Education';
import ResumeCTA from '../components/ResumeCTA';
import FeedbackForm from '../components/FeedbackForm';
import Contact from '../components/Contact';

export default function Home({ onOpenResume }) {
  // Listen for hash parameter scroll redirects on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          const offset = 80; // height of navbar
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 250); // slight delay to allow rendering
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative">
      <Hero onOpenResume={onOpenResume} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Certifications />
      <Education />
      <ResumeCTA onOpenResume={onOpenResume} />
      <FeedbackForm />
      <Contact />
    </div>
  );
}

