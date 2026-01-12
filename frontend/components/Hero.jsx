import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen md:h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-lime-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen md:min-h-auto md:h-auto lg:h-[95vh] lg:items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white rounded-full shadow-lg shadow-green-500/10 border border-green-100 animate-bounce-slow mx-auto lg:mx-0">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-green-700 tracking-wide">100% Certified Organic</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight sm:leading-tight lg:leading-tight">
              <span className="block text-slate-800 mb-1 sm:mb-2">Fresh & Pure</span>
              <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent animate-gradient">
                Organic Products
              </span>
              <span className="block text-slate-700 text-3xl sm:text-4xl lg:text-6xl mt-2">
                for Healthy Living ✨
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the authentic taste of nature. Sourced directly from certified organic farms, delivered fresh to your doorstep. <span className="font-semibold text-green-700">No chemicals. No pesticides.</span> Just pure goodness.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
              <Link 
                to="/shop" 
                className="group relative px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 text-center overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Now
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                to="/about" 
                className="px-6 sm:px-10 py-4 sm:py-5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-slate-200 hover:border-green-300 text-center group text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  Learn More
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-45 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-green-700">5000+</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-green-700">100%</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">Organic Certified</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-green-700">50+</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">Products</div>
              </div>
            </div>
          </div>

          {/* Right Image - Decorative */}
          <div className="hidden lg:block relative animate-fade-in-right">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=800&fit=crop" 
                  alt="Fresh Organic Vegetables" 
                  className="w-full h-[600px] object-cover"
                />
                {/* Overlay Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                  <div className="text-3xl font-bold text-green-700">25%</div>
                  <div className="text-sm text-slate-600 font-medium">OFF Today</div>
                </div>
              </div>
              
              {/* Floating Elements - Clipped */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-float"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-lime-400 to-green-500 rounded-full shadow-lg animate-float animation-delay-2000"></div>
              
              {/* Decorative Dots */}
              <div className="absolute -top-4 -right-4 grid grid-cols-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse animation-delay-1000"></div>
                <div className="w-3 h-3 rounded-full bg-lime-500 animate-pulse animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.23,103.19,114,120,172.48,120,245.29,120,303.58,103.82,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};
