import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserMd, 
  Search, 
  Database, 
  CheckCircle, 
  Globe, 
  BarChart3, 
  Shield, 
  Stethoscope,
  ArrowRight,
  Brain
} from 'lucide-react';

const timelineSteps = [
  {
    id: 1,
    title: 'Clinician Input',
    description: 'Doctor enters AYUSH diagnosis in native language',
    icon: <UserMd className="w-6 h-6" />,
    detail: 'Healthcare provider inputs traditional medicine diagnosis using familiar terminology in Hindi, Sanskrit, or English.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'AI Processing',
    description: 'System analyzes and suggests NAMASTE code',
    icon: <Brain className="w-6 h-6" />,
    detail: 'Advanced NLP algorithms process the input and suggest the most appropriate NAMASTE terminology code.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 3,
    title: 'Automatic Mapping',
    description: 'API provides corresponding ICD-11 TM2 code',
    icon: <Globe className="w-6 h-6" />,
    detail: 'Real-time mapping engine identifies the equivalent WHO ICD-11 Traditional Medicine Module 2 code.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    title: 'EMR Integration',
    description: 'Dual codes stored in Electronic Medical Record',
    icon: <Database className="w-6 h-6" />,
    detail: 'Both codes are seamlessly integrated into the EMR system, ensuring complete documentation.',
    color: 'from-orange-500 to-red-500'
  }
];

const useCases = [
  {
    title: 'Clinical Interoperability',
    icon: <Globe className="w-8 h-8" />,
    description: 'Enable seamless data exchange between traditional and modern healthcare systems',
    benefits: [
      'Cross-system data compatibility',
      'Reduced manual coding errors',
      'Faster patient data transfer',
      'Global healthcare standards compliance'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Research & Analytics',
    icon: <BarChart3 className="w-8 h-8" />,
    description: 'Facilitate large-scale research studies and population health analytics',
    benefits: [
      'Standardized research data',
      'Cross-cultural health studies',
      'Epidemiological research support',
      'Evidence-based traditional medicine'
    ],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'National Health Programs',
    icon: <Shield className="w-8 h-8" />,
    description: 'Support government health initiatives and policy-making with standardized data',
    benefits: [
      'Policy development support',
      'Public health monitoring',
      'Resource allocation optimization',
      'Health outcome measurement'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Clinical Decision Support',
    icon: <Stethoscope className="w-8 h-8" />,
    description: 'Enhance clinical decision-making with comprehensive coding and knowledge base',
    benefits: [
      'Evidence-based recommendations',
      'Drug interaction warnings',
      'Treatment protocol suggestions',
      'Quality care indicators'
    ],
    color: 'from-orange-500 to-red-500'
  }
];

export default function UseCasesPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);

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
            Use Cases & Workflow
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover how our platform transforms healthcare workflows and enables 
            seamless integration between traditional and modern medical systems.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Clinical Workflow Timeline
            </h2>
            <p className="text-lg text-white/80">
              See how our system streamlines the coding process from input to storage
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 via-green-500 to-orange-500 transform -translate-y-1/2 rounded-full" />
              
              {/* Timeline Steps */}
              <div className="relative flex justify-between items-center">
                {timelineSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setActiveStep(step.id)}
                  >
                    {/* Step Circle */}
                    <div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-4 transform transition-all duration-300 ${
                        activeStep === step.id ? 'scale-125 shadow-2xl' : 'scale-100 group-hover:scale-110'
                      }`}
                    >
                      {step.icon}
                    </div>
                    
                    {/* Step Content */}
                    <div className="text-center max-w-xs">
                      <h3 className={`font-semibold mb-2 transition-colors ${
                        activeStep === step.id ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Active Step Detail */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${timelineSteps[activeStep - 1].color} flex items-center justify-center text-white`}>
                    {timelineSteps[activeStep - 1].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Step {activeStep}: {timelineSteps[activeStep - 1].title}
                    </h3>
                  </div>
                </div>
                <p className="text-white/80 text-lg">
                  {timelineSteps[activeStep - 1].detail}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    {step.description}
                  </p>
                  <p className="text-white/80">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Use Cases Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Key Use Cases
            </h2>
            <p className="text-lg text-white/80">
              Explore the diverse applications of our healthcare coding platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredUseCase(index)}
                onMouseLeave={() => setHoveredUseCase(null)}
              >
                <motion.div
                  className="h-full p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${useCase.color} flex items-center justify-center text-white`}>
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {useCase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 mb-6">
                    {useCase.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white/90">Key Benefits:</h4>
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredUseCase === index ? 1 : 0.7, 
                          x: hoveredUseCase === index ? 0 : -10 
                        }}
                        transition={{ delay: benefitIndex * 0.05 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/70">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center text-cyan-400 group-hover:text-white transition-colors">
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}