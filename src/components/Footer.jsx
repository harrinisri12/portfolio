import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-8 bg-editorial-bg border-t border-editorial-border dark:bg-editorial-bg-dark dark:border-editorial-border-dark">
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo/Credits */}
        <div className="text-center sm:text-left">
          <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark">
            © {new Date().getFullYear()} Harrini Sri. All rights reserved.
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 mt-1">
            Engineered with React + Tailwind CSS + Supabase.
          </p>
        </div>

        {/* Scroll To Top Action */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-editorial-border hover:border-editorial-text text-xs text-editorial-muted hover:text-editorial-text transition-all dark:border-editorial-border-dark dark:hover:border-editorial-text-dark dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark"
          aria-label="Scroll back to top of page"
        >
          <span>Back to Top</span>
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
