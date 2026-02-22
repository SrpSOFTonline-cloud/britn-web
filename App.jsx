import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Supabase Setup with Error Handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if keys are missing
const isConfigValid = supabaseUrl && supabaseKey;

// Only create client if keys exist
export const supabase = isConfigValid ? createClient(supabaseUrl, supabaseKey) : null;

export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);

// Simple Landing Page Component
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 text-center">
      <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl font-bold shadow-lg">
        B
      </div>
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
        Welcome to BRITN
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Bangladesh Radiology & Imaging Techanologist Network
      </p>
      
      {!isConfigValid && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          Error: Database connection failed. Please check Environment Variables in Vercel.
        </div>
      )}

      <div className="flex space-x-4">
        <Link to="/login" className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-semibold transition">
          Login
        </Link>
        <Link to="/register" className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold transition dark:bg-slate-800 dark:text-white dark:border-slate-600">
          Register
        </Link>
      </div>
    </div>
  );
}

// Login Placeholder
function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Login</h2>
        <p className="text-slate-500">Login functionality will be added here.</p>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
