import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { aboutData } from '../data/about';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "harrinisri12@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-editorial-card dark:bg-editorial-card-dark border-t border-editorial-border dark:border-editorial-border-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Editorial Headers */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark mb-4">
              07 // Let's Connect
            </span>
            
            <h2 className="font-display font-extrabold text-[2.5rem] sm:text-[3.5rem] leading-[1.0] tracking-tightest text-editorial-text dark:text-editorial-text-dark uppercase mb-6">
              Let's build<br />something<br />extraordinary.
            </h2>
            
            <p className="text-base text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light max-w-md">
              Whether you have an internship opportunity, need feedback on a project, or simply want to chat about AI models and full-stack architecture—my inbox is open.
            </p>
          </div>

          {/* Right Column: Direct Connections */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Email Box */}
            <div className="p-6 rounded-3xl border border-editorial-border bg-editorial-bg dark:border-editorial-border-dark dark:bg-editorial-bg-dark flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-editorial-accent-light dark:bg-editorial-accent-light-dark text-editorial-accent dark:text-editorial-accent-dark flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                    Drop an email
                  </span>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="font-display text-sm sm:text-base font-bold text-editorial-text hover:text-editorial-accent dark:text-editorial-text-dark dark:hover:text-editorial-accent-dark transition-colors"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopyEmail}
                className="btn-secondary p-3 rounded-xl"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="h-4.5 w-4.5 text-green-500" /> : <Copy className="h-4.5 w-4.5" />}
              </button>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/harrinisri12"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-3xl border border-editorial-border bg-editorial-bg dark:border-editorial-border-dark dark:bg-editorial-bg-dark flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="h-10 w-10 rounded-xl bg-neutral-100 text-editorial-text dark:bg-neutral-900 dark:text-editorial-text-dark flex items-center justify-center group-hover:bg-editorial-accent-light group-hover:text-editorial-accent dark:group-hover:bg-editorial-accent-light-dark dark:group-hover:text-editorial-accent-dark transition-colors">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                    Explore Code
                  </span>
                  <span className="text-xs font-bold text-editorial-text dark:text-editorial-text-dark">
                    GitHub
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/harrini-sri"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-3xl border border-editorial-border bg-editorial-bg dark:border-editorial-border-dark dark:bg-editorial-bg-dark flex items-center gap-4 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="h-10 w-10 rounded-xl bg-neutral-100 text-editorial-text dark:bg-neutral-900 dark:text-editorial-text-dark flex items-center justify-center group-hover:bg-editorial-accent-light group-hover:text-editorial-accent dark:group-hover:bg-editorial-accent-light-dark dark:group-hover:text-editorial-accent-dark transition-colors">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                    Network
                  </span>
                  <span className="text-xs font-bold text-editorial-text dark:text-editorial-text-dark">
                    LinkedIn
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
