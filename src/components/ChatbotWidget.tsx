import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const predefinedQuestions = [
  "What is ICD-11 code for Vata Vyadhi?",
  "How do I map NAMASTE codes to ICD-11?",
  "What is the difference between AYUSH and traditional medicine coding?",
  "How accurate are the code mappings?"
];

const mockResponses: { [key: string]: string } = {
  "vata": "Vata Vyadhi typically maps to ICD-11 code QD85.0 in the Traditional Medicine Module 2. This represents disorders related to Vata dosha imbalance in Ayurvedic medicine.",
  "namaste": "To map NAMASTE codes to ICD-11, use our API endpoint /v1/mappings/namaste/{code}. The system automatically provides the corresponding ICD-11 TM2 code with confidence scores.",
  "ayush": "AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy) coding in NAMASTE provides culturally appropriate terminology, while ICD-11 TM2 offers global standardization for international interoperability.",
  "accuracy": "Our mapping accuracy is 95%+ with continuous validation by medical experts. We maintain version control and provide confidence scores for each mapping.",
  "api": "Our RESTful API supports authentication via OAuth 2.0, provides FHIR-compliant resources, and typically responds within 200-500ms with 99.9% uptime.",
  "default": "I'm here to help with questions about NAMASTE-ICD11 mappings, API integration, and traditional medicine coding. You can ask about specific codes, implementation details, or general platform features."
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your MediCode Bridge assistant. I can help you with questions about NAMASTE-ICD11 mappings, API usage, and traditional medicine coding. How can I assist you today?",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (isMounted) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(mockResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Check for specific disease names
    if (lowerMessage.includes('diabetes')) {
      return "Diabetes Mellitus maps to NAMASTE code NAM-DM-001 and ICD-11 code EE90.0. This provides dual coding for comprehensive healthcare documentation.";
    }
    
    if (lowerMessage.includes('hypertension')) {
      return "Hypertension has NAMASTE code NAM-HTN-002 and ICD-11 code EE91.1. Both codes can be used simultaneously for complete medical records.";
    }
    
    if (lowerMessage.includes('asthma')) {
      return "Asthma is coded as NAM-AST-003 in NAMASTE and CA23.0 in ICD-11 TM2. Our API provides these mappings instantly with validation.";
    }
    
    return mockResponses.default;
  };

  const handleSendMessage = async (messageText: string = inputValue) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(messageText),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Chat Widget Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-cyan-400/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[32rem] bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">MediCode Assistant</h3>
                  <p className="text-xs text-white/80">Ask about code mappings</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                          : 'bg-white/10 text-white/90'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white/10 px-3 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-white/60 mb-2">Quick questions:</p>
                <div className="space-y-1">
                  {predefinedQuestions.slice(0, 2).map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="w-full text-left text-xs text-white/70 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      "{question}"
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about code mappings..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-opacity"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}