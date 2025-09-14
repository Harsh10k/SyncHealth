import React from 'react';
import { motion } from 'motion/react';
import { Search, Code, Globe, Shield, Zap, Heart } from 'lucide-react';
import DiseaseSearchBar from './DiseaseSearchBar';

export default function LandingPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Bridging Traditional Medicine with Global Standards
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto">
              Seamlessly integrate NAMASTE (AYUSH) terminology with WHO ICD-11 Traditional Medicine Module 2 
              for comprehensive Electronic Health Record systems.
            </p>
          </motion.div>

          {/* Main Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <DiseaseSearchBar />
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Global Standards',
                description: 'WHO ICD-11 TM2 compliance for international interoperability'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Traditional Medicine',
                description: 'NAMASTE terminology for comprehensive AYUSH integration'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Secure & Compliant',
                description: 'Indian EHR standards with enterprise-grade security'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-cyan-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Static decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-indigo-400 rounded-full"></div>
          <div className="absolute top-60 left-1/3 w-3 h-3 bg-cyan-300 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-blue-300 rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50,000+', label: 'NAMASTE Codes' },
              { number: '15,000+', label: 'ICD-11 TM2 Mappings' },
              { number: '99.9%', label: 'API Uptime' },
              { number: '500ms', label: 'Response Time' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}