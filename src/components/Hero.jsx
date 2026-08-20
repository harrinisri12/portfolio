import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Download, ArrowRight, Compass } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { aboutData } from '../data/about';

export default function Hero({ onOpenResume }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector('#projects');
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-editorial-bg dark:bg-editorial-bg-dark">
      {/* Background Decorative Blur Element */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-editorial-accent/5 dark:bg-editorial-accent-dark/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 w-full md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Typographic Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline / Mini-Header */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent dark:bg-editorial-accent-dark animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-editorial-accent uppercase dark:text-editorial-accent-dark">
                {aboutData.status}
              </span>
            </motion.div>

            {/* Huge Display Editorial Typography */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-[2.5rem] sm:text-[4rem] md:text-[4.5rem] leading-[0.95] tracking-tightest text-editorial-text dark:text-editorial-text-dark uppercase mb-6"
            >
              Harrini <span className="font-serif italic font-normal text-editorial-accent dark:text-editorial-accent-dark normal-case block sm:inline">Sri</span>
              <span className="block mt-1 text-[2.2rem] sm:text-[3.2rem] md:text-[3.8rem] font-light text-editorial-muted dark:text-editorial-muted-dark tracking-tighter">
                Developer &amp; AI Builder
              </span>
            </motion.h1>

            {/* Intro paragraph */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-editorial-muted dark:text-editorial-muted-dark font-light leading-relaxed max-w-xl mb-8"
            >
              {aboutData.introLarge}
            </motion.p>

            {/* CTA Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center mb-10"
            >
              <button
                onClick={onOpenResume}
                className="group flex items-center gap-2 rounded-xl bg-editorial-text px-6 py-3.5 text-sm font-semibold text-editorial-bg transition-all hover:bg-editorial-text/90 hover:-translate-y-0.5 dark:bg-editorial-text-dark dark:text-editorial-bg-dark dark:hover:bg-editorial-text-dark/90 shadow-md"
              >
                View Resume
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="flex items-center gap-2 rounded-xl border border-editorial-border px-6 py-3.5 text-sm font-semibold text-editorial-text transition-all hover:bg-editorial-card hover:-translate-y-0.5 dark:border-editorial-border-dark dark:text-editorial-text-dark dark:hover:bg-editorial-card-dark"
              >
                <Compass className="h-4 w-4" />
                Featured Projects
              </a>

              <a
                href="/resume.pdf"
                download="Harrini_Sri_Resume.pdf"
                className="flex items-center gap-2 text-xs font-semibold text-editorial-muted transition-colors hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark px-4 py-2 hover:bg-editorial-card dark:hover:bg-editorial-card-dark rounded-xl"
                title="Download Resume Directly"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-5 border-t border-editorial-border pt-6 dark:border-editorial-border-dark max-w-xs"
            >
              <a
                href="https://github.com/harrinisri12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-muted transition-colors hover:text-editorial-accent dark:text-editorial-muted-dark dark:hover:text-editorial-accent-dark"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/harrini-sri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-muted transition-colors hover:text-editorial-accent dark:text-editorial-muted-dark dark:hover:text-editorial-accent-dark"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:harrinisri12@gmail.com"
                className="text-editorial-muted transition-colors hover:text-editorial-accent dark:text-editorial-muted-dark dark:hover:text-editorial-accent-dark"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Editorial Photo & Info Collage */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* The collage container */}
            <motion.div 
              variants={itemVariants}
              className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-editorial-border bg-editorial-card p-3 shadow-xl dark:border-editorial-border-dark dark:bg-editorial-card-dark"
            >
              <img
                src="/profile.jpg"
                alt="Harrini Sri"
                className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.10] hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay Caption card (Minimal style) */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-editorial-border/30 dark:border-editorial-border-dark/30 p-4 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-editorial-text dark:text-editorial-text-dark">
                      PSG Tech B.E. CSE
                    </h3>
                    <p className="text-[10px] text-editorial-muted dark:text-editorial-muted-dark">
                      Class of 2026
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-editorial-accent dark:text-editorial-accent-dark">
                    <MapPin className="h-3 w-3" />
                    Coimbatore, IN
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Small floating info badge: Current Learning */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 80 }}
              className="absolute -right-4 top-10 hidden sm:block max-w-[180px] bg-white border border-editorial-border p-3.5 rounded-2xl shadow-lg dark:bg-editorial-card-dark dark:border-editorial-border-dark"
            >
              <span className="block text-[10px] font-bold tracking-widest text-editorial-muted uppercase mb-1 dark:text-editorial-muted-dark">
                Learning Focus
              </span>
              <p className="text-[11px] font-medium leading-relaxed text-editorial-text dark:text-editorial-text-dark">
                {aboutData.currentFocus}
              </p>
            </motion.div>
            
            {/* Small floating info badge: Availability status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 80 }}
              className="absolute -left-4 bottom-16 hidden sm:block max-w-[180px] bg-editorial-accent-light border border-editorial-accent/10 p-3.5 rounded-2xl shadow-lg dark:bg-editorial-accent-light-dark dark:border-editorial-accent-dark/10"
            >
              <span className="block text-[10px] font-bold tracking-widest text-editorial-accent uppercase mb-1 dark:text-editorial-accent-dark">
                Current Status
              </span>
              <p className="text-[11px] font-semibold text-editorial-text dark:text-editorial-text-dark">
                Seeking Full-Stack &amp; AI Internships
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
