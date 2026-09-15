import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Presentation, Users, Sparkles } from 'lucide-react';
import { achievementsData } from '../data/achievements';

const categoryIcons = {
  Hackathon: Trophy,
  Ideathon: Award,
  "Project Presentation": Presentation,
  "Leadership & Association": Users
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-editorial-bg dark:bg-editorial-bg-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">05 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Achievements &amp; Hackathons
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievementsData.map((item, index) => {
            const IconComponent = categoryIcons[item.category] || Sparkles;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ type: 'spring', stiffness: 70, damping: 15, delay: index * 0.1 }}
                className="group p-8 rounded-3xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-editorial-accent-light text-editorial-accent dark:bg-editorial-accent-light-dark dark:text-editorial-accent-dark">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-editorial-muted dark:text-editorial-muted-dark border border-editorial-border dark:border-editorial-border-dark px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Organization/Event */}
                  <h3 className="font-display font-bold text-xl text-editorial-text dark:text-editorial-text-dark tracking-tight leading-snug group-hover:text-editorial-accent dark:group-hover:text-editorial-accent-dark transition-colors mb-2">
                    {item.title}
                  </h3>

                  {(item.project || item.event || item.organization) && (
                    <p className="text-xs font-semibold text-editorial-accent dark:text-editorial-accent-dark mb-3">
                      {item.project && <span>Project: {item.project}</span>}
                      {item.event && <span> • Event: {item.event}</span>}
                      {item.organization && <span> • {item.organization} ({item.period})</span>}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Footer Accent */}
                <div className="flex items-center justify-between border-t border-editorial-border pt-4 mt-6 dark:border-editorial-border-dark">
                  <div className="flex items-center gap-2 text-editorial-muted dark:text-editorial-muted-dark text-xs">
                    <IconComponent className="h-4 w-4 text-editorial-accent dark:text-editorial-accent-dark" />
                    <span>{item.year || item.period}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-muted dark:text-editorial-muted-dark">
                    Verified Recognition
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
