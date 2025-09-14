import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, CheckCircle, Code, Key, Database, GitBranch } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const codeExamples = {
  authentication: {
    curl: `curl -X POST "https://api.medicode-bridge.com/auth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials"
  }'`,
    nodejs: `const axios = require('axios');

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://api.medicode-bridge.com/auth/token', {
      client_id: 'your_client_id',
      client_secret: 'your_client_secret',
      grant_type: 'client_credentials'
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};`,
    python: `import requests

def get_access_token():
    url = "https://api.medicode-bridge.com/auth/token"
    data = {
        "client_id": "your_client_id",
        "client_secret": "your_client_secret",
        "grant_type": "client_credentials"
    }
    
    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        raise Exception("Authentication failed")`
  },
  search: {
    curl: `curl -X GET "https://api.medicode-bridge.com/v1/codes/search?q=diabetes&include_mappings=true" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"`,
    nodejs: `const searchDiseases = async (query, accessToken) => {
  try {
    const response = await axios.get(
      \`https://api.medicode-bridge.com/v1/codes/search?q=\${query}&include_mappings=true\`,
      {
        headers: {
          'Authorization': \`Bearer \${accessToken}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Search failed:', error);
  }
};`,
    python: `def search_diseases(query, access_token):
    url = f"https://api.medicode-bridge.com/v1/codes/search"
    params = {
        "q": query,
        "include_mappings": True
    }
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Search failed")`
  },
  mapping: {
    curl: `curl -X GET "https://api.medicode-bridge.com/v1/mappings/namaste/NAM-DM-001" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"`,
    nodejs: `const getMapping = async (namasteCode, accessToken) => {
  try {
    const response = await axios.get(
      \`https://api.medicode-bridge.com/v1/mappings/namaste/\${namasteCode}\`,
      {
        headers: {
          'Authorization': \`Bearer \${accessToken}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Mapping retrieval failed:', error);
  }
};`,
    python: `def get_mapping(namaste_code, access_token):
    url = f"https://api.medicode-bridge.com/v1/mappings/namaste/{namaste_code}"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Mapping retrieval failed")`
  }
};

const endpoints = [
  {
    method: 'POST',
    path: '/auth/token',
    description: 'Authenticate and get access token',
    parameters: ['client_id', 'client_secret', 'grant_type']
  },
  {
    method: 'GET',
    path: '/v1/codes/search',
    description: 'Search for disease codes and mappings',
    parameters: ['q (query)', 'include_mappings', 'limit', 'offset']
  },
  {
    method: 'GET',
    path: '/v1/mappings/namaste/{code}',
    description: 'Get ICD-11 mapping for NAMASTE code',
    parameters: ['code (path parameter)']
  },
  {
    method: 'GET',
    path: '/v1/mappings/icd11/{code}',
    description: 'Get NAMASTE mapping for ICD-11 code',
    parameters: ['code (path parameter)']
  },
  {
    method: 'GET',
    path: '/v1/fhir/CodeSystem',
    description: 'Get FHIR CodeSystem resources',
    parameters: ['system', 'version', 'format']
  }
];

export default function APIDocumentationPage() {
  const [activeTab, setActiveTab] = useState('authentication');
  const [activeLanguage, setActiveLanguage] = useState('nodejs');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
            API Documentation
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Complete API reference for integrating NAMASTE and ICD-11 TM2 mappings 
            into your healthcare applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-cyan-400" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {[
                  { id: 'authentication', label: 'Authentication', icon: <Key className="w-4 h-4" /> },
                  { id: 'endpoints', label: 'Endpoints', icon: <Database className="w-4 h-4" /> },
                  { id: 'fhir', label: 'FHIR Resources', icon: <GitBranch className="w-4 h-4" /> },
                  { id: 'examples', label: 'Code Examples', icon: <Code className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center ${
                      activeTab === item.id
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Authentication */}
              <TabsContent value="authentication" className="mt-0">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>
                  <p className="text-white/80 mb-6">
                    Our API uses OAuth 2.0 client credentials flow for authentication. 
                    You'll need to obtain an access token before making API calls.
                  </p>

                  {/* Language Tabs */}
                  <div className="mb-6">
                    <div className="flex space-x-2 mb-4">
                      {['curl', 'nodejs', 'python'].map((lang) => (
                        <Button
                          key={lang}
                          variant={activeLanguage === lang ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setActiveLanguage(lang)}
                          className={activeLanguage === lang ? 'bg-cyan-400/20 text-cyan-400' : 'text-white/70'}
                        >
                          {lang.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-white/90 overflow-x-auto">
                        <code>{codeExamples.authentication[activeLanguage as keyof typeof codeExamples.authentication]}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white/60 hover:text-white"
                        onClick={() => copyToClipboard(
                          codeExamples.authentication[activeLanguage as keyof typeof codeExamples.authentication],
                          `auth-${activeLanguage}`
                        )}
                      >
                        {copiedCode === `auth-${activeLanguage}` ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Response Example</h4>
                    <pre className="text-sm text-white/80">
{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              {/* Endpoints */}
              <TabsContent value="endpoints" className="mt-0">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
                  <div className="space-y-6">
                    {endpoints.map((endpoint, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-900/30 rounded-lg p-6 border border-white/10"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-mono ${
                            endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-cyan-400 font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-white/80 mb-4">{endpoint.description}</p>
                        <div>
                          <h4 className="text-sm font-semibold text-white/90 mb-2">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <span
                                key={paramIndex}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-white/70"
                              >
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* FHIR Resources */}
              <TabsContent value="fhir" className="mt-0">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">FHIR Resources</h2>
                  <p className="text-white/80 mb-6">
                    Our API provides FHIR R4 compliant CodeSystem resources for both NAMASTE and ICD-11 TM2 terminologies.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-900/30 rounded-lg p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">CodeSystem Resource Structure</h3>
                      <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-white/90 overflow-x-auto">
{`{
  "resourceType": "CodeSystem",
  "id": "namaste-terminology",
  "url": "https://api.medicode-bridge.com/fhir/CodeSystem/namaste",
  "identifier": [
    {
      "use": "official",
      "value": "NAMASTE-2024"
    }
  ],
  "version": "1.0.0",
  "name": "NAMASTETerminology",
  "title": "NAMASTE (AYUSH) Terminology System",
  "status": "active",
  "experimental": false,
  "publisher": "MediCode Bridge",
  "description": "Comprehensive AYUSH terminology system for traditional medicine",
  "concept": [
    {
      "code": "NAM-DM-001",
      "display": "Diabetes Mellitus",
      "definition": "A group of disorders characterized by high blood glucose levels"
    }
  ]
}`}
                      </pre>
                    </div>

                    <div className="bg-slate-900/30 rounded-lg p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Supported FHIR Operations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          '$lookup - Code lookup and validation',
                          '$validate-code - Code validation',
                          '$subsumes - Subsumption testing',
                          '$find-matches - Find similar codes'
                        ].map((operation, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                            <span className="text-white/80">{operation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Code Examples */}
              <TabsContent value="examples" className="mt-0">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
                  
                  <div className="space-y-8">
                    {/* Search Example */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Disease Search</h3>
                      <div className="mb-4">
                        <div className="flex space-x-2 mb-4">
                          {['curl', 'nodejs', 'python'].map((lang) => (
                            <Button
                              key={lang}
                              variant={activeLanguage === lang ? 'default' : 'ghost'}
                              size="sm"
                              onClick={() => setActiveLanguage(lang)}
                              className={activeLanguage === lang ? 'bg-cyan-400/20 text-cyan-400' : 'text-white/70'}
                            >
                              {lang.toUpperCase()}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="relative">
                          <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-white/90 overflow-x-auto">
                            <code>{codeExamples.search[activeLanguage as keyof typeof codeExamples.search]}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-white/60 hover:text-white"
                            onClick={() => copyToClipboard(
                              codeExamples.search[activeLanguage as keyof typeof codeExamples.search],
                              `search-${activeLanguage}`
                            )}
                          >
                            {copiedCode === `search-${activeLanguage}` ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Mapping Example */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Code Mapping</h3>
                      <div className="relative">
                        <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-white/90 overflow-x-auto">
                          <code>{codeExamples.mapping[activeLanguage as keyof typeof codeExamples.mapping]}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-white/60 hover:text-white"
                          onClick={() => copyToClipboard(
                            codeExamples.mapping[activeLanguage as keyof typeof codeExamples.mapping],
                            `mapping-${activeLanguage}`
                          )}
                        >
                          {copiedCode === `mapping-${activeLanguage}` ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}