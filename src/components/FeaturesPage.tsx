import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Database, Globe, Shield, Code, Zap, Heart, X } from 'lucide-react';
import { Button } from './ui/button';

const features = [
  {
    id: 'namaste',
    title: 'NAMASTE Terminology Integration',
    icon: <Heart className="w-8 h-8" />,
    description: 'Comprehensive integration with NAMASTE (AYUSH) terminology system for traditional medicine coding.',
    details: [
      'Over 50,000 standardized AYUSH terminology codes',
      'Multi-language support for Sanskrit, Hindi, and English',
      'Hierarchical classification system',
      'Real-time validation and verification',
      'Integration with traditional medicine practices'
    ],
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    id: 'icd11',
    title: 'ICD-11 TM2 Mapping',
    icon: <Globe className="w-8 h-8" />,
    description: 'Seamless mapping to WHO ICD-11 Traditional Medicine Module 2 for global standardization.',
    details: [
      'Complete WHO ICD-11 TM2 classification coverage',
      'Bidirectional mapping capabilities',
      'Semantic similarity algorithms',
      'Version control and updates tracking',
      'Cross-reference validation'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'fhir',
    title: 'FHIR & Indian EHR Compliance',
    icon: <Shield className="w-8 h-8" />,
    description: 'Full compliance with FHIR standards and Indian EHR guidelines for seamless integration.',
    details: [
      'FHIR R4 compliance with CodeSystem resources',
      'Indian EHR standards adherence',
      'Digital Health Mission compatibility',
      'SNOMED CT integration support',
      'HL7 message formatting'
    ],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'dual-coding',
    title: 'Dual-Coding Support',
    icon: <Code className="w-8 h-8" />,
    description: 'Simultaneous support for both AYUSH and international coding systems.',
    details: [
      'Parallel code generation',
      'Context-aware suggestions',
      'Conflict resolution algorithms',
      'Historical coding patterns analysis',
      'Clinical decision support integration'
    ],
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'api',
    title: 'Secure API & Data Privacy',
    icon: <Zap className="w-8 h-8" />,
    description: 'Enterprise-grade API with robust security and privacy protection measures.',
    details: [
      'OAuth 2.0 and JWT authentication',
      'End-to-end encryption',
      'HIPAA compliance framework',
      'Rate limiting and monitoring',
      'Audit trails and logging'
    ],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    icon: <Database className="w-8 h-8" />,
    description: 'Comprehensive analytics and reporting for healthcare insights and research.',
    details: [
      'Real-time usage analytics',
      'Epidemiological reporting',
      'Trend analysis and predictions',
      'Custom dashboard creation',
      'Research data export capabilities'
    ],
    gradient: 'from-teal-500 to-blue-500'
  }
];

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the comprehensive capabilities that make our platform the perfect bridge 
            between traditional and modern healthcare systems.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedFeature(feature.id)}
            >
              <motion.div
                className="relative p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 h-full"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`text-white mb-6 bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-xl flex items-center justify-center`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 mb-6 line-clamp-3">
                  {feature.description}
                </p>

                {/* Learn More Button */}
                <div className="flex items-center text-cyan-400 group-hover:text-white transition-colors">
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Feature Detail Modal */}
        <AnimatePresence>
          {selectedFeature && selectedFeatureData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${selectedFeatureData.gradient} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                      {selectedFeatureData.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedFeatureData.title}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFeature(null)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-white/80 text-lg mb-8">
                  {selectedFeatureData.description}
                </p>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {selectedFeatureData.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedFeatureData.gradient} mt-2 flex-shrink-0`} />
                        <p className="text-white/70">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Button 
                    className={`w-full bg-gradient-to-r ${selectedFeatureData.gradient} hover:opacity-90 transition-opacity`}
                  >
                    Get Started with {selectedFeatureData.title}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}