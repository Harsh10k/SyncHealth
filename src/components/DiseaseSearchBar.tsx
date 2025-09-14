import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Copy, CheckCircle } from 'lucide-react';
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
    name: 'Migraine',
    namaste: 'NAM-MIG-004',
    icd11: '8A80.1',
    description: 'Neurological condition characterized by recurrent headaches'
  },
  {
    name: 'Rheumatoid Arthritis',
    namaste: 'NAM-RA-005',
    icd11: 'FA20.0',
    description: 'Autoimmune inflammatory disease affecting joints'
  },
  {
    name: 'Vata Vyadhi',
    namaste: 'NAM-VV-101',
    icd11: 'QD85.0',
    description: 'Traditional Ayurvedic condition related to Vata dosha imbalance'
  },
  {
    name: 'Pitta Vikar',
    namaste: 'NAM-PV-102',
    icd11: 'QD85.1',
    description: 'Ayurvedic disorder associated with Pitta dosha excess'
  },
  {
    name: 'Kapha Dosha Dushti',
    namaste: 'NAM-KDD-103',
    icd11: 'QD85.2',
    description: 'Ayurvedic condition from Kapha dosha vitiation'
  }
];

export default function DiseaseSearchBar() {
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
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-50"
            >
              {suggestions.slice(0, 5).map((disease, index) => (
                <motion.div
                  key={disease.namaste}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 transition-all duration-200"
                  onClick={() => handleSelectDisease(disease)}
                >
                  <div className="font-medium text-white">{disease.name}</div>
                  <div className="text-sm text-white/70 mt-1">
                    NAMASTE: {disease.namaste} | ICD-11: {disease.icd11}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Display */}
      <AnimatePresence>
        {selectedDisease && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* NAMASTE Code Card */}
            <motion.div
              className="p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl border border-cyan-400/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>

            {/* ICD-11 Code Card */}
            <motion.div
              className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl border border-indigo-400/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>

            {/* Description Card */}
            <motion.div
              className="md:col-span-2 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-white/80">{selectedDisease.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo prompt */}
      {!selectedDisease && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/60 mt-8"
        >
          <p>Try searching for: "Diabetes", "Vata Vyadhi", "Asthma", or "Hypertension"</p>
        </motion.div>
      )}
    </div>
  );
}