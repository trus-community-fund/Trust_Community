'use client';

import { useState, useEffect } from 'react';
import { initFirebase } from '../../lib/firebase'; // Dhyan dein: Yahan '../../' hai
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('bankcommunityloan@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initFirebase();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const firebase = await initFirebase();
      if (!firebase) throw new Error("Database connection failed");

      const auth = firebase.auth();
      await auth.signInWithEmailAndPassword(email, password);

      // Login safal, home par bhejo
      router.push('/');

    } catch (err) {
      console.error(err);
      setError('गलत ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5]">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-sm">
        <h1 className="text-[#002366] text-2xl font-bold mb-2">Members Login</h1>
        <p className="text-gray-600 mb-6 text-sm">कृपया अपने क्रेडेंशियल्स दर्ज करें।</p>

        <form onSubmit={handleLogin} className="text-left">
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-1">Email ID</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required 
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-3.5 bg-[#002366] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? "Loading..." : "लॉगिन करें"}
          </button>
        </form>

        {error && (
          <div className="mt-5 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="mt-8 text-xs text-gray-400">
          Trust Community Fund &copy; 2025
        </div>
      </div>
    </div>
  );
}

