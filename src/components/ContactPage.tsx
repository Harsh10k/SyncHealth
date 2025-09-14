import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, HelpCircle, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const faqs = [
  {
    question: 'How accurate are the NAMASTE to ICD-11 mappings?',
    answer: 'Our mappings are validated by medical experts and maintain 95%+ accuracy rates, with continuous updates based on clinical feedback and WHO guidelines.'
  },
  {
    question: 'What is the API response time?',
    answer: 'Our API typically responds within 200-500ms for standard queries, with 99.9% uptime guarantee and global CDN for optimal performance.'
  },
  {
    question: 'Is the system compliant with Indian EHR standards?',
    answer: 'Yes, our platform fully complies with Indian EHR standards, Digital Health Mission guidelines, and international FHIR R4 specifications.'
  },
  {
    question: 'How do you handle data privacy and security?',
    answer: 'We implement enterprise-grade security with end-to-end encryption, HIPAA compliance framework, and regular security audits.'
  },
  {
    question: 'Can I integrate this with existing EMR systems?',
    answer: 'Absolutely! Our RESTful API and FHIR-compliant resources make integration straightforward with most modern EMR/EHR systems.'
  },
  {
    question: 'What support do you provide for implementation?',
    answer: 'We offer comprehensive implementation support including technical documentation, integration assistance, and dedicated support teams.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-white/80 mb-6">
            Your message has been received. Our team will get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

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
            Get API Access
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to integrate NAMASTE and ICD-11 TM2 mappings into your healthcare system? 
            Contact us to get started with API access and implementation support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Request API Access</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/90 mb-2">Full Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="john.smith@hospital.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 mb-2">Organization *</label>
                  <Input
                    required
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Your Hospital or Healthcare Organization"
                  />
                </div>

                <div>
                  <label className="block text-white/90 mb-2">Inquiry Type *</label>
                  <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api-access">API Access Request</SelectItem>
                      <SelectItem value="integration">Integration Support</SelectItem>
                      <SelectItem value="enterprise">Enterprise License</SelectItem>
                      <SelectItem value="research">Research Collaboration</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-white/90 mb-2">Message *</label>
                  <Textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Please describe your use case, integration requirements, and any specific questions you may have..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-white/90">Email</div>
                    <div className="text-white/70">api@medicode-bridge.com</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-white/90">Phone</div>
                    <div className="text-white/70">+91 (0) 123-456-7890</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-white/90">Address</div>
                    <div className="text-white/70">Healthcare Innovation Hub<br />New Delhi, India</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-white/90">Support Hours</div>
                    <div className="text-white/70">Mon-Fri: 9:00 AM - 6:00 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h3 className="font-semibold text-white">Fast Response</h3>
              </div>
              <p className="text-white/80 text-sm">
                We typically respond to API access requests within 24 hours during business days.
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white/80">
              Quick answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="font-medium text-white">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/60"
                  >
                    ▼
                  </motion.div>
                </button>
                
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/80">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}