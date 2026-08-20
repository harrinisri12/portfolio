import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Github } from './BrandIcons';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="group flex flex-col h-full rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark overflow-hidden transition-all hover:shadow-lg"
    >
      {/* Cover Image Container */}
      <div className="relative overflow-hidden aspect-video border-b border-editorial-border dark:border-editorial-border-dark">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-[1.05] group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Details */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-bold tracking-wider uppercase text-editorial-muted dark:text-editorial-muted-dark"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[9px] font-bold tracking-wider uppercase text-editorial-accent dark:text-editorial-accent-dark">
                +{project.technologies.length - 3} More
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-lg text-editorial-text dark:text-editorial-text-dark tracking-tight leading-snug mb-2 group-hover:text-editorial-accent dark:group-hover:text-editorial-accent-dark transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark font-light leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between border-t border-editorial-border pt-4 mt-2 dark:border-editorial-border-dark">
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
                title="View Repository"
                aria-label={`${project.title} github repository`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
                title="Live Demo"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <Link
            to={`/project/${project.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-editorial-text dark:text-editorial-text-dark hover:text-editorial-accent dark:hover:text-editorial-accent-dark transition-colors"
          >
            Details
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
