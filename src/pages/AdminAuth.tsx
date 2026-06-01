import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const AdminAuth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempted, setAttempted] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      if (res.ok) {
        setAttempted(false);
        navigate('/admin');
      } else {
        setAttempted(true);
      }
    } catch (err) {
      setAttempted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#111] p-10 rounded-sm shadow-xl border border-white/10">
        <div>
          <div className="mx-auto h-12 w-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
             <Shield className="h-5 w-5 text-gold" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-light tracking-tight text-white">
            {t('admin.title')}
          </h2>
          <p className="mt-2 text-center text-xs tracking-widest uppercase text-gray-500 font-bold">
            Authorized Personnel Only
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-sm shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 bg-[#111] border border-white/10 placeholder-gray-600 text-white rounded-t-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm font-light"
                placeholder="Admin Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 bg-[#111] border border-white/10 border-t-0 placeholder-gray-600 text-white rounded-b-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold focus:z-10 sm:text-sm font-light"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xs font-bold uppercase tracking-widest rounded-sm text-black bg-gold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111] focus:ring-gold transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-4 w-4 text-black/60 group-hover:text-black/80" aria-hidden="true" />
              </span>
              {t('admin.login')}
            </button>
          </div>
        </form>

        {attempted && (
          <div className="mt-4 p-4 bg-red-950/40 border border-red-900/50 rounded-sm flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
            <p className="text-xs font-medium text-red-400">
              {t('admin.accessDenied')} Please contact system administrator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
