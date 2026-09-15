import React, { useState } from 'react';
import { useFeedback } from '../hooks/useFeedback';
import { Star, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeedbackForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleRatingChange,
    submitFeedback,
    setSubmitStatus
  } = useFeedback();

  const [hoveredRating, setHoveredRating] = useState(0);

  const feedbackTypes = [
    'Portfolio Feedback',
    'Project Feedback',
    'Collaboration',
    'Internship / Job',
    'General Feedback',
    'Other'
  ];

  return (
    <section id="feedback" className="py-24 bg-editorial-bg dark:bg-editorial-bg-dark overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <span className="font-serif italic text-lg text-editorial-accent dark:text-editorial-accent-dark">//</span>
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-editorial-text dark:text-editorial-text-dark">
            Feedback &amp; Thoughts
          </h2>
        </div>

        {/* Outer Form Container */}
        <div className="p-8 sm:p-10 rounded-3xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark shadow-sm">
          {submitStatus === 'success' ? (
            // Success State UI
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8"
            >
              <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center dark:bg-green-950/30 dark:text-green-400 mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-editorial-text dark:text-editorial-text-dark mb-2">
                Thank you for your feedback!
              </h3>
              <p className="text-sm text-editorial-muted dark:text-editorial-muted-dark max-w-sm mb-6">
                Your response has been stored in the Supabase backend. I appreciate you taking the time to share your perspective.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="text-xs font-semibold text-editorial-accent hover:text-editorial-accent/80 dark:text-editorial-accent-dark dark:hover:text-editorial-accent-dark/80 border-b border-current pb-0.5"
              >
                Send Another Response
              </button>
            </motion.div>
          ) : (
            // Form UI
            <form onSubmit={submitFeedback} className="space-y-6">
              <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark text-center max-w-md mx-auto mb-8 font-light">
                Have suggestions for my portfolio, questions about my projects, or want to discuss a job opening? Submit your feedback directly to my database.
              </p>

              {/* Error summary alert */}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex gap-3 text-xs dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                  <div>
                    <span className="font-semibold block">Submission Failed</span>
                    Something went wrong. Please check your network and database credentials, and try again.
                  </div>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="feedback-name" className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
                    Your Name <span className="text-editorial-accent dark:text-editorial-accent-dark">*</span>
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="Enter your name"
                    className={`w-full rounded-xl border px-4 py-3 text-xs bg-editorial-bg text-editorial-text placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-editorial-accent dark:bg-editorial-bg-dark dark:text-editorial-text-dark dark:placeholder-neutral-600 dark:focus:ring-editorial-accent-dark ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-editorial-border dark:border-editorial-border-dark'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-500 font-medium">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="feedback-email" className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
                    Your Email <span className="text-editorial-accent dark:text-editorial-accent-dark">*</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="name@example.com"
                    className={`w-full rounded-xl border px-4 py-3 text-xs bg-editorial-bg text-editorial-text placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-editorial-accent dark:bg-editorial-bg-dark dark:text-editorial-text-dark dark:placeholder-neutral-600 dark:focus:ring-editorial-accent-dark ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-editorial-border dark:border-editorial-border-dark'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-500 font-medium">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Feedback Type & Rating Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Feedback Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="feedback-type" className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
                    Feedback Category
                  </label>
                  <select
                    id="feedback-type"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-editorial-border px-4 py-3 text-xs bg-editorial-bg text-editorial-text focus:outline-none focus:ring-1 focus:ring-editorial-accent dark:border-editorial-border-dark dark:bg-editorial-bg-dark dark:text-editorial-text-dark dark:focus:ring-editorial-accent-dark"
                  >
                    {feedbackTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Star Rating */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
                    Rating <span className="text-editorial-accent dark:text-editorial-accent-dark">*</span>
                  </span>
                  
                  <div className="flex items-center gap-2 h-[42px]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        disabled={isSubmitting}
                        className="p-1 focus:outline-none transition-transform active:scale-95"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            star <= (hoveredRating || formData.rating)
                              ? 'fill-editorial-accent text-editorial-accent dark:fill-editorial-accent-dark dark:text-editorial-accent-dark'
                              : 'text-neutral-300 dark:text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                    
                    <span className="text-[11px] font-bold text-editorial-muted dark:text-editorial-muted-dark ml-2">
                      {formData.rating} / 5 Stars
                    </span>
                  </div>
                  {errors.rating && (
                    <span className="text-[10px] text-red-500 font-medium">{errors.rating}</span>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="feedback-message" className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
                    Your Message <span className="text-editorial-accent dark:text-editorial-accent-dark">*</span>
                  </label>
                  <span className="text-[10px] text-editorial-muted dark:text-editorial-muted-dark font-mono">
                    {formData.message.length} / 1000 chars
                  </span>
                </div>
                <textarea
                  id="feedback-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  placeholder="Share details of your thoughts, critique, or proposal..."
                  rows="4"
                  className={`w-full rounded-xl border px-4 py-3 text-xs bg-editorial-bg text-editorial-text placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-editorial-accent dark:bg-editorial-bg-dark dark:text-editorial-text-dark dark:placeholder-neutral-600 dark:focus:ring-editorial-accent-dark resize-y ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-editorial-border dark:border-editorial-border-dark'
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <span className="text-[10px] text-red-500 font-medium">{errors.message}</span>
                  ) : (
                    <span className="text-[9px] text-editorial-muted dark:text-editorial-muted-dark italic">
                      Min 10 characters required.
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full gap-2 rounded-xl py-3.5 text-sm font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-editorial-bg dark:text-editorial-text-dark" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
