import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResumeViewer from './components/ResumeViewer';

// Pages
import Home from './pages/Home';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  // Theme state: defaults to light, checks localStorage or system preferences
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    return media.matches ? 'dark' : 'light';
  });

  // Watch for Supabase Auth state changes
  useEffect(() => {
    // Get active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingSession(false);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // While checking session, render a clean loading skeleton to prevent screen flash
  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-editorial-bg text-editorial-text dark:bg-editorial-bg-dark dark:text-editorial-text-dark">
        <svg className="animate-spin h-8 w-8 text-editorial-accent dark:text-editorial-accent-dark" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Client Facing Pages (Stitched inside client shell) */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen bg-editorial-bg text-editorial-text dark:bg-editorial-bg-dark dark:text-editorial-text-dark">
              <Navbar 
                onOpenResume={() => setIsResumeOpen(true)} 
                theme={theme} 
                toggleTheme={toggleTheme} 
              />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home onOpenResume={() => setIsResumeOpen(true)} />} />
                  <Route path="/project/:id" element={<ProjectDetailsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              
              <ResumeViewer 
                isOpen={isResumeOpen} 
                onClose={() => setIsResumeOpen(false)} 
              />
            </div>
          }
        />

        {/* Protected Admin Routing Portal (Plain background shell) */}
        <Route
          path="/admin"
          element={
            user ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin user={user} setUser={setUser} />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            user ? (
              <AdminDashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
