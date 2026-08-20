import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { experienceData } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-editorial-card dark:bg-editorial-card-dark border-y border-editorial-border dark:border-editorial-border-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">04 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Professional Experience
          </h2>
        </div>

        {/* Experience Rows */}
        <div className="flex flex-col gap-10">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 70, damping: 15, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-editorial-border bg-editorial-bg hover:shadow-lg transition-all dark:border-editorial-border-dark dark:bg-editorial-bg-dark"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Corporate Details */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest dark:text-editorial-accent-dark">
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-editorial-text dark:text-editorial-text-dark mt-2">
                      {exp.company}
                    </h3>
                    <p className="text-sm font-semibold text-editorial-muted dark:text-editorial-muted-dark mt-1">
                      {exp.role}
                    </p>
                  </div>

                  {/* Icon Indicator */}
                  <div className="hidden lg:flex items-center gap-2 text-editorial-border dark:text-editorial-border-dark mt-6">
                    <Briefcase className="h-5 w-5" />
                    <span className="h-px bg-editorial-border dark:bg-editorial-border-dark flex-1" />
                  </div>
                </div>

                {/* Right Side: Responsibilities & Learning */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Brief Overview */}
                  <p className="text-sm text-editorial-text dark:text-editorial-text-dark leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex gap-3 items-start text-xs text-editorial-muted dark:text-editorial-muted-dark leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent dark:bg-editorial-accent-dark mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technical Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold uppercase tracking-wider bg-neutral-100 text-editorial-text dark:bg-neutral-900 dark:text-editorial-text-dark px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Learning Outcome Box */}
                  {exp.learningOutcomes && (
                    <div className="mt-2 p-4 rounded-xl border border-editorial-border/40 bg-editorial-card dark:border-editorial-border-dark/40 dark:bg-editorial-card-dark text-[11px] text-editorial-muted dark:text-editorial-muted-dark italic leading-relaxed">
                      <span className="font-semibold not-italic block uppercase tracking-wider text-[9px] text-editorial-accent dark:text-editorial-accent-dark mb-1">
                        Key Takeaway
                      </span>
                      "{exp.learningOutcomes}"
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
