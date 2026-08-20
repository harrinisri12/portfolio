-- Supabase Setup Script for Personal Portfolio Website
-- Run this script in the SQL Editor of your Supabase dashboard.

-- 1. Create the feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    feedback_type TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'reviewed', 'archived'))
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow Anyone (Public) to Insert Feedback
-- This allows guests visiting the portfolio website to submit feedback.
CREATE POLICY "Allow public insert feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (true);

-- 4. Policy: Allow Authenticated Users (Admin) to SELECT/READ Feedback
-- This ensures only you (logged in via Supabase Auth) can read feedback.
CREATE POLICY "Allow authenticated read feedback" 
ON public.feedback 
FOR SELECT 
TO authenticated 
USING (true);

-- 5. Policy: Allow Authenticated Users (Admin) to UPDATE Feedback status
-- This allows updating feedback status (e.g., changing status to 'reviewed' or 'archived').
CREATE POLICY "Allow authenticated update feedback" 
ON public.feedback 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 6. Policy: Allow Authenticated Users (Admin) to DELETE Feedback entries
-- This allows deleting feedback entries if necessary.
CREATE POLICY "Allow authenticated delete feedback" 
ON public.feedback 
FOR DELETE 
TO authenticated 
USING (true);
