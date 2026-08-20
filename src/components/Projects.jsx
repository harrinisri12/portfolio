import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Github } from './BrandIcons';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  const supportingProjects = projectsData.filter(p => p.id !== featuredProject.id);

  return (
    <section id="projects" className="py-24 bg-editorial-bg dark:bg-editorial-bg-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">03 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Selected Works
          </h2>
        </div>

        {/* Asymmetric Showcase Grid */}
        <div className="flex flex-col gap-12">
          {/* 1. Featured Project Showcase */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="group border border-editorial-border rounded-3xl overflow-hidden bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark shadow-md hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Featured Project Image */}
                <div className="lg:col-span-7 aspect-video lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden border-b border-editorial-border lg:border-b-0 lg:border-r dark:border-editorial-border-dark">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Featured Project Details */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Featured Label */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest bg-editorial-accent-light text-editorial-accent dark:bg-editorial-accent-light-dark dark:text-editorial-accent-dark px-2.5 py-1 rounded-md">
                        Featured Case Study
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-editorial-text dark:text-editorial-text-dark leading-tight tracking-tight mb-4 group-hover:text-editorial-accent dark:group-hover:text-editorial-accent-dark transition-colors">
                      {featuredProject.title}
                    </h3>

                    {/* Technology list */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-bold tracking-wider uppercase border border-editorial-border px-2 py-0.5 rounded text-editorial-muted dark:border-editorial-border-dark dark:text-editorial-muted-dark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm font-light leading-relaxed text-editorial-muted dark:text-editorial-muted-dark mb-6">
                      {featuredProject.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-editorial-border pt-6 dark:border-editorial-border-dark mt-4">
                    <div className="flex items-center gap-5">
                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
                          title="View Repository"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {featuredProject.liveUrl && (
                        <a
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/project/${featuredProject.id}`}
                      className="group/btn flex items-center gap-2 rounded-xl bg-editorial-text px-5 py-3 text-xs font-bold text-editorial-bg transition-all hover:bg-editorial-text/90 dark:bg-editorial-text-dark dark:text-editorial-bg-dark dark:hover:bg-editorial-text-dark/90"
                    >
                      Read Case Study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Supporting Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
