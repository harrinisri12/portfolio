import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Star } from 'lucide-react';
import { educationData } from '../data/education';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-editorial-bg dark:bg-editorial-bg-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 w-full md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">05 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Academic Foundation
          </h2>
        </div>

        {/* Education Panels */}
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Academic Credentials Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex flex-col justify-between h-full shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest dark:text-editorial-accent-dark">
                  {edu.startYear} — {edu.endYear}
                </span>
                
                <h3 className="font-display font-extrabold text-2xl text-editorial-text dark:text-editorial-text-dark mt-2 tracking-tight">
                  {edu.institution}
                </h3>
                
                <p className="text-sm font-semibold text-editorial-muted dark:text-editorial-muted-dark mt-1">
                  {edu.degree}
                </p>
                
                <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-1 font-light">
                  {edu.department}
                </p>
              </div>

              {/* CGPA Box */}
              <div className="mt-8 border-t border-editorial-border pt-6 dark:border-editorial-border-dark flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark">
                    Grade Performance
                  </span>
                  <p className="font-display text-2xl font-black text-editorial-text dark:text-editorial-text-dark mt-1">
                    {edu.cgpa}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-editorial-accent-light dark:bg-editorial-accent-light-dark flex items-center justify-center text-editorial-accent dark:text-editorial-accent-dark">
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </div>

            {/* Right Column: Coursework and Honors */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Coursework Block */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-4 w-4 text-editorial-accent dark:text-editorial-accent-dark" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-text-dark">
                    Key Coursework
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-xs text-editorial-text border border-editorial-border rounded-xl px-3 py-1.5 bg-editorial-card dark:border-editorial-border-dark dark:text-editorial-text-dark dark:bg-editorial-card-dark transition-all hover:border-editorial-accent dark:hover:border-editorial-accent-dark"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights Block */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-editorial-accent dark:text-editorial-accent-dark" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-text-dark">
                    Academic Achievements
                  </h4>
                </div>

                <div className="flex flex-col gap-4">
                  {edu.academicHighlights.map((highlight, hIdx) => (
                    <div 
                      key={hIdx}
                      className="p-4 rounded-xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex gap-3.5 items-start"
                    >
                      <span className="font-serif italic text-xs text-editorial-accent dark:text-editorial-accent-dark mt-0.5">
                        0{hIdx + 1}.
                      </span>
                      <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
