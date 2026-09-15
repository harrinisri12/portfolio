import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight, Download } from 'lucide-react';

export default function ResumeCTA({ onOpenResume }) {
  return (
    <section className="py-20 bg-editorial-bg dark:bg-editorial-bg-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="relative p-8 md:p-12 rounded-3xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Decorative background shape */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-editorial-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Left copy */}
          <div className="text-center md:text-left">
            <h3 className="font-serif italic text-2xl sm:text-3xl text-editorial-text dark:text-editorial-text-dark tracking-tight">
              Looking for a student developer?
            </h3>
            <p className="text-xs sm:text-sm text-editorial-muted dark:text-editorial-muted-dark mt-2 max-w-xl font-light">
              Review my structured skills, academic timeline, and GitHub projects in a single unified document. Available to view online or download as a PDF.
            </p>
          </div>

          {/* Right actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={onOpenResume}
              className="btn-primary gap-2 rounded-xl px-6 py-3.5 text-xs font-bold shadow-sm"
            >
              <FileText className="h-4 w-4" />
              View Resume Online
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            
            <a
              href="/resume.pdf"
              download="Harrini_Sri_Resume.pdf"
              className="btn-secondary gap-2 rounded-xl px-6 py-3.5 text-xs font-bold"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
