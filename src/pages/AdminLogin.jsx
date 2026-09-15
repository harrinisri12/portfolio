import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, AlertTriangle, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) throw error;

      setUser(data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Invalid login credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-editorial-bg text-editorial-text dark:bg-editorial-bg-dark dark:text-editorial-text-dark px-6 py-12 relative">
      {/* Home link */}
      <a
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-editorial-muted hover:text-editorial-text dark:text-editorial-muted-dark dark:hover:text-editorial-text-dark transition-colors"
      >
        <Home className="h-4 w-4" />
        Return Home
      </a>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl border border-editorial-border bg-editorial-card dark:border-editorial-border-dark dark:bg-editorial-card-dark shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-serif italic text-base text-editorial-accent dark:text-editorial-accent-dark block mb-2">
            System Administration
          </span>
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-editorial-text dark:text-editorial-text-dark">
            Admin Portal
          </h2>
          <p className="text-xs text-editorial-muted dark:text-editorial-muted-dark mt-2 font-light">
            Authenticate to access and manage portfolio feedback.
          </p>
        </div>

        {/* Form error */}
        {errorMessage && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 flex gap-2.5 text-xs dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-email" className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-[15px] h-4 w-4 text-neutral-400" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-editorial-border pl-10 pr-4 py-3 text-xs bg-editorial-bg text-editorial-text placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-editorial-accent dark:border-editorial-border-dark dark:bg-editorial-bg-dark dark:text-editorial-text-dark dark:placeholder-neutral-600 dark:focus:ring-editorial-accent-dark"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-password" className="text-xs font-semibold text-editorial-text dark:text-editorial-text-dark">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-[15px] h-4 w-4 text-neutral-400" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••"
                className="w-full rounded-xl border border-editorial-border pl-10 pr-4 py-3 text-xs bg-editorial-bg text-editorial-text placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-editorial-accent dark:border-editorial-border-dark dark:bg-editorial-bg-dark dark:text-editorial-text-dark dark:placeholder-neutral-600 dark:focus:ring-editorial-accent-dark"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full mt-4 gap-2 rounded-xl py-3.5 text-xs font-bold shadow-sm disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
