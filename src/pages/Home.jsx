import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import ResumeCTA from '../components/ResumeCTA';
import Contact from '../components/Contact';
import FeedbackForm from '../components/FeedbackForm';

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
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <ResumeCTA onOpenResume={onOpenResume} />
      <Contact />
      <FeedbackForm />
    </div>
  );
}
