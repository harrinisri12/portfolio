import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { experienceData } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-editorial-card dark:bg-editorial-card-dark border-y border-editorial-border dark:border-editorial-border-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">03 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Experience &amp; Internships
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
              className="p-8 md:p-10 rounded-3xl border border-editorial-border bg-editorial-bg hover:shadow-lg transition-all dark:border-editorial-border-dark dark:bg-editorial-bg-dark"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Organization & Role */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-editorial-accent-light text-editorial-accent dark:bg-editorial-accent-light-dark dark:text-editorial-accent-dark mb-3">
                      <span>{exp.duration}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-editorial-text dark:text-editorial-text-dark">
                      {exp.role}
                    </h3>
                    <p className="text-base font-bold text-editorial-accent dark:text-editorial-accent-dark mt-1">
                      {exp.company}
                    </p>
                    <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Project Focus Box */}
                  {exp.project && (
                    <div className="mt-6 p-4 rounded-2xl border border-editorial-border dark:border-editorial-border-dark bg-editorial-card dark:bg-editorial-card-dark">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-editorial-accent dark:text-editorial-accent-dark block mb-1">
                        Project Contributed
                      </span>
                      <h4 className="text-sm font-bold text-editorial-text dark:text-editorial-text-dark">
                        {exp.project}
                      </h4>
                      <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-1 leading-relaxed">
                        {exp.projectDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Features, Workflow & Learnings */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Workflow Banner */}
                  {exp.workflow && (
                    <div className="p-3.5 rounded-xl border border-editorial-border dark:border-editorial-border-dark bg-editorial-card dark:bg-editorial-card-dark flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-editorial-accent dark:text-editorial-accent-dark">
                        Core Workflow
                      </span>
                      <span className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
                        {exp.workflow}
                      </span>
                    </div>
                  )}

                  {/* Features Contributed */}
                  {exp.features && exp.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-text-dark mb-3">
                        Key Features &amp; Modules Built
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {exp.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-editorial-muted dark:text-editorial-muted-dark">
                            <CheckCircle2 className="h-3.5 w-3.5 text-editorial-accent dark:text-editorial-accent-dark shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning / Contribution */}
                  {exp.learnings && exp.learnings.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-text-dark mb-3">
                        Learnings &amp; Practical Contributions
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exp.learnings.map((lrn, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-2 text-xs text-editorial-muted dark:text-editorial-muted-dark">
                            <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent dark:bg-editorial-accent-dark mt-1.5 shrink-0" />
                            <span>{lrn}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-editorial-border dark:border-editorial-border-dark">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold uppercase tracking-wider bg-editorial-card border border-editorial-border text-editorial-text dark:bg-editorial-card-dark dark:border-editorial-border-dark dark:text-editorial-text-dark px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

