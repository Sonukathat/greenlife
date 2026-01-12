import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/organic-farm/1920/600" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About GreenLife Organic</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in healthy, sustainable living. We bring farm-fresh organic products directly to your doorstep.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in 2020, GreenLife Organic was born from a simple belief: everyone deserves access to fresh, 
                healthy, and sustainably-grown food. What started as a small local farmers market stall has grown into 
                a thriving online marketplace connecting conscious consumers with organic producers.
              </p>
              <p>
                We work directly with certified organic farmers and artisans who share our commitment to quality, 
                sustainability, and environmental stewardship. Every product in our catalog is carefully selected 
                to meet strict organic standards and deliver exceptional taste and nutrition.
              </p>
              <p>
                Today, we're proud to serve thousands of families across the country, helping them make healthier 
                choices for themselves and the planet.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/farmers-market/600/400" 
              alt="Organic farming" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold">100%</div>
              <div className="text-green-100">Certified Organic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do, from selecting products to serving our community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Quality First</h3>
              <p className="text-slate-600 leading-relaxed">
                We never compromise on quality. Every product is rigorously tested and certified to meet the 
                highest organic standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Sustainability</h3>
              <p className="text-slate-600 leading-relaxed">
                We're committed to protecting our planet. From eco-friendly packaging to carbon-neutral shipping, 
                every decision considers environmental impact.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Community</h3>
              <p className="text-slate-600 leading-relaxed">
                We support local farmers and give back to our community. A portion of every sale goes to 
                sustainable agriculture initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Partner Farms</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-slate-600 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-slate-600 font-medium">Organic Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-slate-600 text-lg">
              Passionate people dedicated to bringing you the best organic products.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <img src="https://picsum.photos/seed/person1/400/400" alt="Team member" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Sarah Johnson</h3>
                <p className="text-green-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-slate-600 text-sm">
                  Former agricultural scientist with a passion for sustainable farming and healthy living.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <img src="https://picsum.photos/seed/person2/400/400" alt="Team member" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Michael Chen</h3>
                <p className="text-green-600 font-medium mb-3">Head of Sourcing</p>
                <p className="text-slate-600 text-sm">
                  20+ years experience working with organic farmers and ensuring quality standards.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <img src="https://picsum.photos/seed/person3/400/400" alt="Team member" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Emily Rodriguez</h3>
                <p className="text-green-600 font-medium mb-3">Customer Success Lead</p>
                <p className="text-slate-600 text-sm">
                  Dedicated to ensuring every customer has an exceptional experience with GreenLife.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the GreenLife Community</h2>
          <p className="text-xl text-green-100 mb-10 leading-relaxed">
            Start your journey to healthier living today. Browse our collection of certified organic products 
            and experience the difference quality makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-white text-green-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-green-700 text-white font-bold rounded-xl border-2 border-green-500 hover:bg-green-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
