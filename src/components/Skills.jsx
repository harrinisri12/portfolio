import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../data/skills';
import { 
  Code, Terminal, Cpu, Layers, Atom, Zap, Paintbrush, 
  Server, Activity, Database, CloudLightning, Brain, 
  Eye, Maximize, TrendingUp, GitBranch, Monitor, HelpCircle 
} from 'lucide-react';
import { Github, Figma } from './BrandIcons';

const iconMap = {
  Code, Terminal, Cpu, Layers, Atom, Zap, Paintbrush, 
  Server, Activity, Database, CloudLightning, Brain, 
  Eye, Maximize, TrendingUp, GitBranch, Github, Monitor, Figma
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');
  
  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Database', 'AI / ML', 'Tools'];

  // Filter skills based on tab selection
  const filteredSkills = activeTab === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeTab);

  // Group by category if "All" is active for an editorial structured grid
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-editorial-bg dark:bg-editorial-bg-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">02 //</span>
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
              Skills &amp; Capabilities
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-editorial-border pb-1 dark:border-editorial-border-dark">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === cat 
                    ? 'bg-editorial-text text-editorial-bg shadow-sm dark:bg-editorial-card-dark dark:text-editorial-text-dark dark:border dark:border-editorial-border-dark dark:hover:border-editorial-accent-dark' 
                    : 'text-editorial-muted hover:text-editorial-text hover:bg-editorial-card dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark dark:hover:bg-editorial-card-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Layout */}
        <AnimatePresence mode="wait">
          {activeTab === 'All' ? (
            // Editorial Grid of Categories
            <motion.div
              key="grouped"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div 
                  key={category} 
                  className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-editorial-accent dark:text-editorial-accent-dark mb-6">
                      {category}
                    </h3>
                    <div className="flex flex-col gap-4">
                      {skills.map((skill) => {
                        const IconComponent = iconMap[skill.icon] || HelpCircle;
                        return (
                          <div key={skill.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-editorial-bg border border-editorial-border text-editorial-text dark:bg-editorial-bg-dark dark:border-editorial-border-dark dark:text-editorial-text-dark">
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium text-editorial-text dark:text-editorial-text-dark">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold text-editorial-muted dark:text-editorial-muted-dark border border-editorial-border dark:border-editorial-border-dark rounded-full px-2 py-0.5 uppercase tracking-wide bg-editorial-bg dark:bg-editorial-bg-dark">
                              {skill.level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            // Flat List Grid for Filtered Category
            <motion.div
              key="filtered"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {filteredSkills.map((skill) => {
                const IconComponent = iconMap[skill.icon] || HelpCircle;
                return (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="p-5 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex flex-col items-center text-center justify-center transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="p-3 rounded-xl bg-editorial-bg border border-editorial-border text-editorial-accent dark:bg-editorial-bg-dark dark:border-editorial-border-dark dark:text-editorial-accent-dark mb-3">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-semibold text-editorial-text dark:text-editorial-text-dark">
                      {skill.name}
                    </h4>
                    <p className="text-[10px] text-editorial-muted dark:text-editorial-muted-dark uppercase tracking-wider mt-1.5 font-medium">
                      {skill.level}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
