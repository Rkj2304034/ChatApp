import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden">
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-300/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <nav className="relative flex items-center justify-between px-8 py-5 bg-white/70 backdrop-blur-md border-b border-slate-200/50 z-10">
        {/* App Logo/Name */}
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 tracking-wide">
          ChatApp
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="px-5 py-2.5 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 hover:text-indigo-600 transition-all"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center mt-32 px-4 z-10">
        


        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight max-w-4xl tracking-tight text-slate-800">
          Connect with your friends, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">instantly.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
          A fast, secure, and real-time chat application to keep you close to the people who matter most. 
          Jump into the conversation today.
        </p>

        {/* Call to Action Button */}
        <Link 
          to="/chat" 
          className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-bold rounded-full hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          Start Chatting Now
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </main>

    </div>
  );
};

export default Home;