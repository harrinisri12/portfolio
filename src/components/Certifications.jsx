import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ZoomIn } from 'lucide-react';
import { certificationsData } from '../data/certifications';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-24 bg-editorial-card dark:bg-editorial-card-dark border-y border-editorial-border dark:border-editorial-border-dark overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">06 //</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Certifications &amp; Credentials
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.credentialId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              className="group flex flex-col justify-between rounded-2xl border border-editorial-border bg-editorial-bg dark:border-editorial-border-dark dark:bg-editorial-bg-dark overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Preview Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-editorial-border dark:border-editorial-border-dark">
                <img
                  src={cert.preview}
                  alt={cert.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Hover overlay zoom indicator */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-3 rounded-full bg-white/90 text-editorial-text hover:bg-white shadow-md transition-all scale-90 group-hover:scale-100"
                    aria-label={`Zoom preview of ${cert.title}`}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest dark:text-editorial-accent-dark">
                    {cert.issuer} • {cert.date}
                  </span>
                  
                  <h3 className="font-display font-extrabold text-base text-editorial-text dark:text-editorial-text-dark tracking-tight leading-snug mt-2 group-hover:text-editorial-accent dark:group-hover:text-editorial-accent-dark transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-[11px] font-mono text-editorial-muted dark:text-editorial-muted-dark mt-1">
                    ID: {cert.credentialId}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 border-t border-editorial-border pt-4 mt-6 dark:border-editorial-border-dark">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-lg bg-editorial-card border border-editorial-border text-editorial-text hover:bg-editorial-border dark:bg-editorial-card-dark dark:border-editorial-border-dark dark:text-editorial-text-dark dark:hover:bg-editorial-border-dark transition-colors"
                  >
                    Preview
                  </button>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-editorial-text text-editorial-bg hover:bg-editorial-text/90 dark:bg-editorial-text-dark dark:text-editorial-bg-dark dark:hover:bg-editorial-text-dark/90 transition-colors"
                  >
                    Verify
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Preview Backdrop */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-2xl bg-editorial-bg border border-editorial-border shadow-2xl dark:bg-editorial-card-dark dark:border-editorial-border-dark p-2 flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-xs font-bold text-editorial-text dark:text-editorial-text-dark truncate mr-4">
                  {selectedCert.title}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
                    title="Open Verification Link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main Image View */}
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 border border-editorial-border dark:border-editorial-border-dark">
                <img
                  src={selectedCert.preview}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
