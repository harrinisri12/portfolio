import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenResume, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Check if on home page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const offset = 80; // height of navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
        return;
      }
    }
    
    // Otherwise, redirect to homepage with hash
    window.location.href = '/' + href;
  };

  return (
    <>
      <nav className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'border-b border-editorial-border bg-editorial-bg/85 backdrop-blur-md dark:border-editorial-border-dark dark:bg-editorial-bg-dark/85 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Wordmark */}
            <a 
              href="#home" 
              onClick={(e) => handleScrollTo(e, '#home')}
              className="font-display text-lg font-bold tracking-tight text-editorial-text transition-opacity hover:opacity-80 dark:text-editorial-text-dark"
            >
              HARRINI SRI D
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="text-sm font-medium text-editorial-muted transition-colors hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Toolbar */}
              <div className="flex items-center gap-4 border-l border-editorial-border pl-6 dark:border-editorial-border-dark">
                {/* Theme Switcher */}
                <button
                  onClick={toggleTheme}
                  className="btn-icon rounded-lg p-2"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* Resume Action */}
                <button
                  onClick={onOpenResume}
                  className="btn-primary gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Resume
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className="btn-icon rounded-lg p-1.5"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn-icon rounded-lg p-1.5"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 border-b border-editorial-border bg-editorial-bg px-6 py-6 shadow-xl dark:border-editorial-border-dark dark:bg-editorial-bg-dark lg:hidden"
          >
            <ul className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="block text-base font-semibold text-editorial-muted transition-colors hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="btn-primary w-full gap-2 rounded-xl py-3 text-sm font-semibold shadow-sm"
            >
              <FileText className="h-4 w-4" />
              View Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
