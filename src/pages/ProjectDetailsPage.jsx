import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, HelpCircle, Lightbulb, Compass, Award } from 'lucide-react';
import { Github } from '../components/BrandIcons';
import { projectsData } from '../data/projects';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-editorial-bg text-editorial-text dark:bg-editorial-bg-dark dark:text-editorial-text-dark px-6">
        <h2 className="font-serif text-3xl italic mb-4">Project not found</h2>
        <p className="text-sm text-editorial-muted dark:text-editorial-muted-dark mb-6">
          The project ID you are looking for does not exist in our case study database.
        </p>
        <Link
          to="/"
          className="btn-primary gap-2 rounded-xl px-5 py-3 text-xs font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-editorial-bg dark:bg-editorial-bg-dark text-editorial-text dark:text-editorial-text-dark pt-28 pb-24"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Back Navigation Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark mb-10 transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back to portfolio
        </Link>

        {/* Project Header Title */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-bold tracking-wider uppercase border border-editorial-border px-2.5 py-0.5 rounded-md text-editorial-muted dark:border-editorial-border-dark dark:text-editorial-muted-dark"
              >
                {tech}
              </span>
            ))}
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight uppercase mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg font-light text-editorial-muted dark:text-editorial-muted-dark leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Action Bar */}
        <div className="flex items-center justify-between border-y border-editorial-border py-4 mb-12 dark:border-editorial-border-dark">
          <div className="flex items-center gap-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
              >
                <Github className="h-4.5 w-4.5" />
                GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
              >
                <ExternalLink className="h-4.5 w-4.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Showcase Image */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-editorial-border dark:border-editorial-border-dark mb-16 shadow-md bg-neutral-100 dark:bg-neutral-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover contrast-[1.05]"
          />
        </div>

        {/* Narrative Flow */}
        <div className="space-y-16">
          {/* Segment 1: The Problem & Solution Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* The Problem */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark">
              <div className="flex items-center gap-2 text-editorial-accent dark:text-editorial-accent-dark mb-4">
                <HelpCircle className="h-5 w-5" />
                <h3 className="text-xs font-bold uppercase tracking-wider">The Problem</h3>
              </div>
              <p className="text-xs sm:text-sm text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark">
              <div className="flex items-center gap-2 text-editorial-accent dark:text-editorial-accent-dark mb-4">
                <Lightbulb className="h-5 w-5" />
                <h3 className="text-xs font-bold uppercase tracking-wider">The Approach</h3>
              </div>
              <p className="text-xs sm:text-sm text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Segment 2: Key Features */}
          <section className="border-t border-editorial-border pt-12 dark:border-editorial-border-dark">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark mb-6">
              Key Features &amp; Architecture
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, fIdx) => (
                <li
                  key={fIdx}
                  className="p-4 rounded-xl border border-editorial-border/40 bg-editorial-card/30 dark:border-editorial-border-dark/40 dark:bg-editorial-card-dark/30 flex gap-3 text-xs text-editorial-muted dark:text-editorial-muted-dark font-light leading-relaxed"
                >
                  <span className="text-editorial-accent dark:text-editorial-accent-dark font-serif italic text-sm">
                    {fIdx + 1}.
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Segment 3: Development Process */}
          <section className="border-t border-editorial-border pt-12 dark:border-editorial-border-dark">
            <div className="flex items-center gap-2.5 mb-6">
              <Compass className="h-5 w-5 text-editorial-accent dark:text-editorial-accent-dark" />
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
                Development Process
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light">
              {project.developmentProcess}
            </p>
          </section>

          {/* Segment 4: Screenshots collage */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="border-t border-editorial-border pt-12 dark:border-editorial-border-dark">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark mb-6">
                Technical Walkthrough Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.screenshots.map((shot, sIdx) => (
                  <div
                    key={sIdx}
                    className="aspect-video rounded-2xl overflow-hidden border border-editorial-border dark:border-editorial-border-dark bg-neutral-100 dark:bg-neutral-900"
                  >
                    <img
                      src={shot}
                      alt={`Case study screenshot ${sIdx + 1}`}
                      className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Segment 5: Technical Challenges */}
          <section className="border-t border-editorial-border pt-12 dark:border-editorial-border-dark">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark mb-6">
              Technical Challenges &amp; Overcoming Obstacles
            </h3>
            <div className="p-6 rounded-2xl border border-red-100 bg-red-50/20 text-red-950 dark:border-red-900/10 dark:bg-red-950/5 dark:text-red-100">
              <p className="text-xs sm:text-sm text-editorial-muted dark:text-editorial-muted-dark leading-relaxed font-light">
                {project.challenges}
              </p>
            </div>
          </section>

          {/* Segment 6: Business Results & Takeaways */}
          <section className="border-t border-editorial-border pt-12 dark:border-editorial-border-dark">
            <div className="p-6 rounded-3xl border border-editorial-accent/20 bg-editorial-accent-light dark:border-editorial-accent-dark/20 dark:bg-editorial-accent-light-dark flex flex-col sm:flex-row items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-editorial-accent text-white flex items-center justify-center shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-editorial-accent dark:text-editorial-accent-dark mb-1">
                  Results &amp; Impact
                </h4>
                <p className="text-xs sm:text-sm text-editorial-text dark:text-editorial-text-dark font-medium leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Back Footer */}
        <div className="border-t border-editorial-border mt-16 pt-8 flex items-center justify-between dark:border-editorial-border-dark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Back to home
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
