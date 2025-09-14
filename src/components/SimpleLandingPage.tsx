import React, { useState, useEffect } from 'react';
import { Search, Copy, CheckCircle, Globe, Shield, Heart } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

// Mock disease data for demonstration
const mockDiseases = [
  {
    name: 'Diabetes Mellitus',
    namaste: 'NAM-DM-001',
    icd11: 'EE90.0',
    description: 'A group of disorders characterized by high blood glucose levels'
  },
  {
    name: 'Hypertension',
    namaste: 'NAM-HTN-002',
    icd11: 'EE91.1',
    description: 'Persistent high blood pressure in the arteries'
  },
  {
    name: 'Asthma',
    namaste: 'NAM-AST-003',
    icd11: 'CA23.0',
    description: 'Respiratory condition marked by spasms in the bronchi'
  },
  {
    name: 'Vata Vyadhi',
    namaste: 'NAM-VV-101',
    icd11: 'QD85.0',
    description: 'Traditional Ayurvedic condition related to Vata dosha imbalance'
  }
];

function DiseaseSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<typeof mockDiseases>([]);
  const [selectedDisease, setSelectedDisease] = useState<typeof mockDiseases[0] | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = mockDiseases.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.namaste.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.icd11.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSelectDisease = (disease: typeof mockDiseases[0]) => {
    setSelectedDisease(disease);
    setSearchTerm(disease.name);
    setShowSuggestions(false);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            type="text"
            placeholder="Enter disease name (e.g., Diabetes, Vata Vyadhi, Asthma)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-lg border-white/30 text-white placeholder:text-white/60 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-50">
            {suggestions.slice(0, 5).map((disease, index) => (
              <div
                key={disease.namaste}
                className="p-4 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 transition-all duration-200"
                onClick={() => handleSelectDisease(disease)}
              >
                <div className="font-medium text-white">{disease.name}</div>
                <div className="text-sm text-white/70 mt-1">
                  NAMASTE: {disease.namaste} | ICD-11: {disease.icd11}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Display */}
      {selectedDisease && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAMASTE Code Card */}
          <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl border border-cyan-400/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-cyan-400">NAMASTE Code</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(selectedDisease.namaste, 'namaste')}
                className="text-cyan-400 hover:bg-cyan-400/20"
              >
                {copiedCode === 'namaste' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="text-2xl font-mono font-bold text-white mb-2">
              {selectedDisease.namaste}
            </div>
            <div className="text-white/80">AYUSH Terminology System</div>
          </div>

          {/* ICD-11 Code Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl border border-indigo-400/30 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-indigo-400">ICD-11 TM2 Code</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(selectedDisease.icd11, 'icd11')}
                className="text-indigo-400 hover:bg-indigo-400/20"
              >
                {copiedCode === 'icd11' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="text-2xl font-mono font-bold text-white mb-2">
              {selectedDisease.icd11}
            </div>
            <div className="text-white/80">WHO International Classification</div>
          </div>

          {/* Description Card */}
          <div className="md:col-span-2 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mt-4">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-white/80">{selectedDisease.description}</p>
          </div>
        </div>
      )}

      {/* Demo prompt */}
      {!selectedDisease && (
        <div className="text-center text-white/60 mt-8">
          <p>Try searching for: "Diabetes", "Vata Vyadhi", "Asthma", or "Hypertension"</p>
        </div>
      )}
    </div>
  );
}

export default function SimpleLandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Bridging Traditional Medicine with Global Standards
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto">
              Seamlessly integrate NAMASTE (AYUSH) terminology with WHO ICD-11 Traditional Medicine Module 2 
              for comprehensive Electronic Health Record systems.
            </p>
          </div>

          {/* Main Search Component */}
          <div className="max-w-4xl mx-auto mb-16 opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
            <DiseaseSearchBar />
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
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
              <div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300"
              >
                <div className="text-cyan-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
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
              <div key={index} className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>