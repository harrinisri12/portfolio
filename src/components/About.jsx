import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Target } from 'lucide-react';
import { aboutData } from '../data/about';

export default function About() {
  const cardVariants = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-editorial-card dark:bg-editorial-card-dark border-y border-editorial-border dark:border-editorial-border-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">01 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Who I Am
          </h2>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Editorial Typography & Statement */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="font-serif italic text-2xl sm:text-3xl leading-snug text-editorial-text dark:text-editorial-text-dark mb-6"
            >
              "Building practical software solutions and continuously improving through hands-on development."
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light"
            >
              {aboutData.introDetailed}
            </motion.p>
            
            {/* Short highlight info row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 border-t border-editorial-border pt-8 dark:border-editorial-border-dark">
              <div className="flex gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-editorial-accent-light text-editorial-accent dark:bg-editorial-accent-light-dark dark:text-editorial-accent-dark">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-editorial-text dark:text-editorial-text-dark">Academic Focus</h4>
                  <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-0.5">Kongu Engineering College</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-editorial-accent-light text-editorial-accent dark:bg-editorial-accent-light-dark dark:text-editorial-accent-dark">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-editorial-text dark:text-editorial-text-dark">Primary Focus</h4>
                  <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-0.5">Software, Web Dev &amp; IoT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Focus Cards & learning list */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Core Areas Grid */}
            <div>
              <h3 className="font-display text-xs font-bold tracking-wider text-editorial-muted uppercase mb-4 dark:text-editorial-muted-dark">
                Core Areas
              </h3>
              
              <div className="flex flex-col gap-4">
                {(aboutData.coreAreas || aboutData.interests || []).map((area, idx) => (
                  <motion.div
                    key={area.title}
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, margin: '-50px' }}
                    className="p-5 rounded-2xl border border-editorial-border bg-editorial-bg transition-shadow hover:shadow-md dark:border-editorial-border-dark dark:bg-editorial-card-dark"
                  >
                    <div className="flex gap-4">
                      <div className="text-editorial-accent dark:text-editorial-accent-dark font-serif italic text-lg leading-none">
                        0{idx + 1}.
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-editorial-text dark:text-editorial-text-dark">
                          {area.title}
                        </h4>
                        <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-1 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current learning targets / On My Radar */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-bg dark:border-editorial-border-dark dark:bg-editorial-card-dark">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-editorial-accent dark:text-editorial-accent-dark" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-text-dark">
                  On My Radar / Current Learning
                </h4>
              </div>
              <div className="flex flex-col gap-3">
                {aboutData.learningGoals.map((goal, idx) => {
                  const title = typeof goal === 'string' ? null : goal.title;
                  const desc = typeof goal === 'string' ? goal : goal.description;
                  return (
                    <div key={idx} className="text-xs text-editorial-muted dark:text-editorial-muted-dark leading-relaxed">
                      {title && (
                        <span className="font-bold text-editorial-text dark:text-editorial-text-dark block">
                          • {title}
                        </span>
                      )}
                      <span className={title ? "block pl-3 text-[11px] mt-0.5" : ""}>
                        {!title && "• "} {desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
