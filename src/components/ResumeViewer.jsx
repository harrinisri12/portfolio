import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';

export default function ResumeViewer({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-editorial-border bg-editorial-bg shadow-2xl dark:border-editorial-border-dark dark:bg-editorial-card-dark"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-editorial-border px-6 py-4 dark:border-editorial-border-dark">
              <div>
                <h2 id="resume-title" className="font-display text-lg font-semibold tracking-tight text-editorial-text dark:text-editorial-text-dark">
                  Resume: Harrini Sri D
                </h2>
                <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark">
                  Computer Science Student &amp; Developer
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </a>
                
                <a
                  href="/resume.pdf"
                  download="Harrini_Sri_Resume.pdf"
                  className="btn-accent gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
                  title="Download PDF"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={onClose}
                  className="btn-icon rounded-lg p-1.5"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative rounded-b-2xl">
              <iframe
                src="/resume.pdf#toolbar=0"
                title="Harrini Sri D Resume"
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
