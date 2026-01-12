import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover brightness-[0.4]"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-vegetables-and-fruits-lying-on-a-table-4011-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-green-400 uppercase bg-green-900/40 rounded-full border border-green-700/50 backdrop-blur-sm">
            100% Certified Organic
          </span>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 bg-clip-text text-transparent mb-6 leading-tight">
            Pure Organic Products for <span className="text-green-500 italic">Healthy Life</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            Directly from sustainable farms to your doorstep. Experience the taste of nature without chemicals or pesticides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition transform hover:scale-105 shadow-xl shadow-green-900/20 text-center"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 font-bold rounded-xl transition backdrop-blur-md border text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,103.19,114,120,172.48,120,245.29,120,303.58,103.82,321.39,56.44Z" className="fill-slate-50"></path>
        </svg>
      </div>
    </section>
  );
};
