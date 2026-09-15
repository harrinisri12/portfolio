import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LogOut, Star, MessageSquare, Award, CheckCircle, 
  Trash2, Filter, AlertCircle, RefreshCw, Archive, Home 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard({ user, setUser }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'new' | 'reviewed' | 'archived'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Redirect if unauthenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setErrorMessage('Unable to load feedback. Please verify your RLS and database table configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeedbacks();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/admin');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('feedback')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setFeedbacks((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update feedback status.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting feedback:', err);
      alert('Failed to delete feedback entry.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculations
  const totalCount = feedbacks.length;
  const averageRating = totalCount > 0
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalCount).toFixed(1)
    : '0.0';
  
  const newCount = feedbacks.filter(f => f.status === 'new').length;
  const reviewedCount = feedbacks.filter(f => f.status === 'reviewed').length;
  const archivedCount = feedbacks.filter(f => f.status === 'archived').length;

  // Filtered List
  const filteredFeedbacks = feedbacks.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text dark:bg-editorial-bg-dark dark:text-editorial-text-dark pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Dashboard Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-editorial-border pb-6 mb-10 dark:border-editorial-border-dark">
          <div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors mr-2"
              >
                <Home className="h-3.5 w-3.5" />
                Home
              </a>
              <span className="font-serif italic text-xs text-editorial-accent dark:text-editorial-accent-dark">// Admin Control</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-editorial-text dark:text-editorial-text-dark mt-1">
              Feedback Dashboard
            </h1>
            <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-1 font-light">
              Logged in as: <span className="font-semibold text-editorial-text dark:text-editorial-text-dark">{user?.email}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="btn-secondary gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </header>

        {/* 1. Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Stat: Total Feedback */}
          <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                Total Submissions
              </span>
              <span className="font-display text-3xl font-black text-editorial-text dark:text-editorial-text-dark mt-1 block">
                {totalCount}
              </span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-editorial-text dark:text-editorial-text-dark">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>

          {/* Stat: Average Rating */}
          <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                Average Rating
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display text-3xl font-black text-editorial-text dark:text-editorial-text-dark">
                  {averageRating}
                </span>
                <span className="text-xs text-editorial-muted dark:text-editorial-muted-dark font-semibold">/ 5.0</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-editorial-accent-light dark:bg-editorial-accent-light-dark flex items-center justify-center text-editorial-accent dark:text-editorial-accent-dark">
              <Star className="h-5 w-5 fill-current" />
            </div>
          </div>

          {/* Stat: New Submissions */}
          <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                New Actionable
              </span>
              <span className="font-display text-3xl font-black text-editorial-text dark:text-editorial-text-dark mt-1 block">
                {newCount}
              </span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>

          {/* Stat: Reviewed Submissions */}
          <div className="p-6 rounded-2xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider dark:text-editorial-muted-dark block">
                Reviewed &amp; Solved
              </span>
              <span className="font-display text-3xl font-black text-editorial-text dark:text-editorial-text-dark mt-1 block">
                {reviewedCount}
              </span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-green-50 dark:bg-green-950/20 flex items-center justify-center text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        </section>

        {/* 2. Filters & Actions Bar */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-editorial-border pb-4 mb-8 dark:border-editorial-border-dark">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'all', name: 'All Submissions', count: totalCount },
              { id: 'new', name: 'New', count: newCount },
              { id: 'reviewed', name: 'Reviewed', count: reviewedCount },
              { id: 'archived', name: 'Archived', count: archivedCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-editorial-text text-editorial-bg shadow-sm dark:bg-editorial-card-dark dark:text-editorial-text-dark dark:border dark:border-editorial-border-dark dark:hover:border-editorial-accent-dark'
                    : 'text-editorial-muted hover:text-editorial-text hover:bg-editorial-card dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark dark:hover:bg-editorial-card-dark'
                }`}
              >
                {tab.name}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === tab.id 
                    ? 'bg-editorial-accent text-white dark:bg-editorial-accent-dark' 
                    : 'bg-neutral-100 dark:bg-neutral-900 text-editorial-text dark:text-editorial-text-dark'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Action Triggers */}
          <button
            onClick={fetchFeedbacks}
            disabled={isLoading}
            className="btn-secondary self-end md:self-auto gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </section>

        {/* 3. Loading, Errors, Empty, and List Renderings */}
        {isLoading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-24 text-editorial-muted dark:text-editorial-muted-dark gap-3">
            <svg className="animate-spin h-8 w-8 text-editorial-accent dark:text-editorial-accent-dark" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-semibold tracking-wider uppercase">Loading feedbacks...</span>
          </div>
        ) : errorMessage ? (
          // Error State
          <div className="text-center py-20 border border-red-200 bg-red-50/10 rounded-2xl dark:border-red-900/10 max-w-xl mx-auto px-6">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-base font-bold text-editorial-text dark:text-editorial-text-dark mb-2">
              Database Fetch Error
            </h3>
            <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={fetchFeedbacks}
              className="btn-primary inline-flex gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Query
            </button>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          // Empty State
          <div className="text-center py-24 border border-dashed border-editorial-border rounded-3xl dark:border-editorial-border-dark max-w-xl mx-auto px-6">
            <MessageSquare className="h-10 w-10 text-editorial-muted dark:text-editorial-muted-dark mx-auto mb-4" />
            <h3 className="text-base font-bold text-editorial-text dark:text-editorial-text-dark mb-1">
              No responses found
            </h3>
            <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark max-w-xs mx-auto leading-relaxed">
              There are no submissions listed in the "{filter}" category filter.
            </p>
          </div>
        ) : (
          // Feedbacks List
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFeedbacks.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-6 rounded-2xl border bg-editorial-card dark:bg-editorial-card-dark transition-all ${
                    item.status === 'new'
                      ? 'border-blue-100 dark:border-blue-950/30 ring-1 ring-blue-50 dark:ring-blue-950/10'
                      : 'border-editorial-border dark:border-editorial-border-dark'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-editorial-border pb-4 dark:border-editorial-border-dark">
                    {/* User Metadata */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-editorial-text dark:text-editorial-text-dark">
                          {item.name}
                        </h3>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors font-light"
                        >
                          ({item.email})
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {/* Feedback Type tag */}
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-neutral-100 text-editorial-text dark:bg-neutral-900 dark:text-editorial-text-dark px-2 py-0.5 rounded">
                          {item.feedback_type}
                        </span>
                        
                        {/* Rating indicator */}
                        <div className="flex items-center text-editorial-accent dark:text-editorial-accent-dark">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                          {[...Array(5 - item.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-neutral-300 dark:text-neutral-700" />
                          ))}
                        </div>

                        {/* Date string */}
                        <span className="text-[10px] text-editorial-muted dark:text-editorial-muted-dark font-mono">
                          • {new Date(item.created_at).toLocaleDateString(undefined, { 
                              year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                        </span>
                      </div>
                    </div>

                    {/* Quick status actions */}
                    <div className="flex items-center gap-2">
                      {/* Status Dropdown */}
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                        disabled={isProcessing}
                        className="text-xs rounded-lg border border-editorial-border bg-editorial-bg px-2.5 py-1.5 font-semibold text-editorial-text focus:outline-none dark:border-editorial-border-dark dark:bg-editorial-bg-dark dark:text-editorial-text-dark"
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="archived">Archived</option>
                      </select>

                      {/* Delete Confirmer */}
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDeleteFeedback(item.id)}
                            disabled={isProcessing}
                            className="px-2 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            disabled={isProcessing}
                            className="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg border border-editorial-border text-editorial-muted hover:text-red-600 hover:border-red-200 dark:border-editorial-border-dark dark:text-editorial-muted-dark dark:hover:text-red-500 dark:hover:border-red-900/30 transition-colors"
                          title="Delete response"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Feedback Message */}
                  <p className="text-xs sm:text-sm text-editorial-text dark:text-editorial-text-dark font-light leading-relaxed whitespace-pre-line">
                    {item.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
