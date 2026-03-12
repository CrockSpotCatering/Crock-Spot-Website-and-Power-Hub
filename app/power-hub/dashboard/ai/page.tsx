'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/power-hub/Header';
import {
  Sparkles, FileText, Zap, Copy, Check, Loader2, Key, Eye, EyeOff,
  X, FileUp, BookOpen, AlertCircle
} from 'lucide-react';

const quickActions = [
  { name: 'Improve', prompt: 'Improve this content to be more engaging and professional' },
  { name: 'Shorten', prompt: 'Make this content more concise while keeping key points' },
  { name: 'Expand', prompt: 'Expand this content with more details and examples' },
  { name: 'Headlines', prompt: 'Generate 5 compelling headline options for this content' },
  { name: 'CTA', prompt: 'Create a strong call-to-action for this content' },
  { name: 'Professional', prompt: 'Rewrite this in a professional, formal tone' },
  { name: 'Casual', prompt: 'Rewrite this in a friendly, casual tone' },
  { name: 'Fix Grammar', prompt: 'Fix any grammar and spelling errors in this content' },
];

type AIProvider = 'claude' | 'openai';

export default function AIAssistPage() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // API Key state
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<AIProvider>('claude');
  const [showApiKey, setShowApiKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  // Brand Guidelines state
  const [brandGuidelines, setBrandGuidelines] = useState('');
  const [showBrandSection, setShowBrandSection] = useState(false);
  const [brandSaved, setBrandSaved] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('crockspot_ai_api_key');
    const savedProvider = localStorage.getItem('crockspot_ai_provider') as AIProvider;
    const savedBrand = localStorage.getItem('crockspot_brand_guidelines');
    const savedFileName = localStorage.getItem('crockspot_brand_filename');

    if (savedKey) {
      setApiKey(savedKey);
      setKeySaved(true);
    }
    if (savedProvider) {
      setProvider(savedProvider);
    }
    if (savedBrand) {
      setBrandGuidelines(savedBrand);
      setBrandSaved(true);
    }
    if (savedFileName) {
      setUploadedFileName(savedFileName);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('crockspot_ai_api_key', apiKey);
      localStorage.setItem('crockspot_ai_provider', provider);
      setKeySaved(true);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('crockspot_ai_api_key');
    localStorage.removeItem('crockspot_ai_provider');
    setApiKey('');
    setKeySaved(false);
  };

  const saveBrandGuidelines = () => {
    if (brandGuidelines.trim()) {
      localStorage.setItem('crockspot_brand_guidelines', brandGuidelines);
      if (uploadedFileName) {
        localStorage.setItem('crockspot_brand_filename', uploadedFileName);
      }
      setBrandSaved(true);
    }
  };

  const clearBrandGuidelines = () => {
    localStorage.removeItem('crockspot_brand_guidelines');
    localStorage.removeItem('crockspot_brand_filename');
    setBrandGuidelines('');
    setUploadedFileName('');
    setBrandSaved(false);
    setUploadError('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadingFile(true);
    setUploadedFileName('');

    const fileName = file.name.toLowerCase();

    // Check if it's a PDF or Word document that needs parsing
    if (fileName.endsWith('.pdf') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/power-hub/parse-document', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          setUploadError(data.error || 'Failed to parse document');
          setUploadingFile(false);
          e.target.value = '';
          return;
        }

        setBrandGuidelines(data.text);
        setUploadedFileName(file.name);
        setBrandSaved(false);
        setUploadingFile(false);
      } catch (error) {
        setUploadError('Failed to upload file: ' + String(error));
        setUploadingFile(false);
      }
    }
    // Handle plain text files directly
    else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setBrandGuidelines(text);
        setUploadedFileName(file.name);
        setBrandSaved(false);
        setUploadingFile(false);
      };
      reader.onerror = () => {
        setUploadError('Failed to read file');
        setUploadingFile(false);
      };
      reader.readAsText(file);
    }
    else {
      setUploadError('Unsupported file type. Please upload a PDF, Word document (.docx), or text file.');
      setUploadingFile(false);
    }

    // Reset the input so the same file can be uploaded again
    e.target.value = '';
  };

  const handleGenerate = async (customPrompt?: string) => {
    if (!content.trim()) return;

    setLoading(true);
    setOutput('');

    const usedPrompt = customPrompt || prompt;

    // If no API key, show demo response
    if (!apiKey.trim()) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutput(`[Demo Mode - No API Key]\n\nTo get real AI responses, add your API key above.\n\nYour prompt: "${usedPrompt}"\nYour content: "${content.substring(0, 100)}..."\n\n---\nAdd a Claude or OpenAI API key to enable real AI-powered content generation.`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/power-hub/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          prompt: usedPrompt,
          apiKey,
          provider,
          brandContext: brandGuidelines || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOutput(`Error: ${data.error || 'Failed to generate content'}`);
      } else {
        setOutput(data.result);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to connect to AI service'}`);
    }

    setLoading(false);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useAsInput = () => {
    setContent(output);
    setOutput('');
  };

  return (
    <div>
      <Header title="AI Assist" subtitle="Generate and improve your content with AI" />

      <div className="p-8">
        {/* API Key Section */}
        <div className="mb-6 bg-gradient-to-r from-[#F49220]/10 to-[#8C2D2E]/10 border-2 border-[#F49220]/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F49220] to-[#8C2D2E] rounded-lg flex items-center justify-center">
              <Key size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">AI API Key</h2>
              <p className="text-sm text-gray-600">Enter your API key to enable AI-powered content generation</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setProvider('claude')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    provider === 'claude'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400'
                  }`}
                >
                  🟣 Claude (Anthropic)
                </button>
                <button
                  onClick={() => setProvider('openai')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    provider === 'openai'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-400'
                  }`}
                >
                  🟢 ChatGPT (OpenAI)
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {provider === 'claude' ? 'Anthropic API Key' : 'OpenAI API Key'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setKeySaved(false); }}
                    placeholder={provider === 'claude' ? 'sk-ant-api...' : 'sk-...'}
                    className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220] focus:border-[#F49220] text-gray-900 placeholder-gray-400"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {apiKey && !keySaved ? (
                  <button
                    onClick={saveApiKey}
                    className="px-4 py-3 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] font-medium"
                  >
                    Save
                  </button>
                ) : keySaved ? (
                  <button
                    onClick={clearApiKey}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            {keySaved && apiKey ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  {provider === 'claude' ? 'Claude' : 'ChatGPT'} API key saved and ready!
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-700">
                  No API key - running in demo mode
                </span>
              </>
            )}
          </div>
        </div>

        {/* Brand Guidelines Section */}
        <div className="mb-6 bg-white border border-gray-200 rounded-xl p-6">
          <button
            onClick={() => setShowBrandSection(!showBrandSection)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold text-gray-900">Brand Guidelines</h2>
                <p className="text-sm text-gray-600">
                  {brandSaved
                    ? `✓ Brand context loaded${uploadedFileName ? ` (${uploadedFileName})` : ''} - AI will use your guidelines`
                    : 'Upload your brand book (PDF, Word) or paste guidelines'}
                </p>
              </div>
            </div>
            <div className={`transform transition-transform ${showBrandSection ? 'rotate-180' : ''}`}>
              ▼
            </div>
          </button>

          {showBrandSection && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Brand Document
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                  <label className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors ${uploadingFile ? 'opacity-50 cursor-wait' : ''}`}>
                    {uploadingFile ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <FileUp size={18} />
                    )}
                    {uploadingFile ? 'Processing...' : 'Upload File'}
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt,.md"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm text-gray-500">
                    Supports: PDF, Word (.docx), Text files
                  </span>
                </div>

                {/* Uploaded File Indicator */}
                {uploadedFileName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                    <FileText size={16} />
                    <span className="font-medium">{uploadedFileName}</span>
                    <span className="text-gray-500">- {brandGuidelines.length.toLocaleString()} characters extracted</span>
                  </div>
                )}

                {/* Upload Error */}
                {uploadError && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    <AlertCircle size={16} />
                    <span>{uploadError}</span>
                    <button onClick={() => setUploadError('')} className="ml-auto hover:text-red-800">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Text Area for Guidelines */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Guidelines / Voice & Tone
                </label>
                <textarea
                  value={brandGuidelines}
                  onChange={(e) => { setBrandGuidelines(e.target.value); setBrandSaved(false); }}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-gray-900 placeholder-gray-400 resize-none font-mono text-sm"
                  placeholder="Paste your brand guidelines here, or upload a PDF/Word document above...

Example:
- Brand Voice: Friendly, fun, rock & roll themed
- Key Phrases: 'Let Us Crock Your World', 'Crock Stars'
- Avoid: Formal language, corporate speak
- Colors: Orange (#F49220), Dark (#1a1a2e)
- Target Audience: Event planners, corporate HR, wedding couples"
                />
              </div>

              <div className="flex items-center gap-3 mt-4">
                {brandGuidelines && !brandSaved ? (
                  <button
                    onClick={saveBrandGuidelines}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    <Check size={16} />
                    Save Guidelines
                  </button>
                ) : brandSaved ? (
                  <button
                    onClick={clearBrandGuidelines}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium"
                  >
                    <X size={16} />
                    Clear Guidelines
                  </button>
                ) : null}
                {brandSaved && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <Check size={14} /> Guidelines saved - AI will use them for context
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText size={20} />
                  Your Content
                </h2>
                {content && (
                  <span className="text-sm text-gray-500">{content.length} characters</span>
                )}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste or type your content here..."
                className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] resize-none text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Custom Prompt */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Prompt</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What would you like AI to do with your content?"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={loading || !content.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  Generate
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Output</h2>
                {output && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyOutput}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={useAsInput}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#F49220]/10 text-[#F49220] rounded-lg hover:bg-[#F49220]/20"
                    >
                      Use as Input
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-900 min-h-[100px]">
                {output || <span className="text-gray-400 italic">AI-generated content will appear here...</span>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-[#F49220]" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={() => handleGenerate(action.prompt)}
                    disabled={loading || !content.trim()}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-900 hover:bg-[#F49220] hover:text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Get API Keys */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Get an API Key</h3>
              <div className="space-y-3">
                <a
                  href="https://console.anthropic.com/settings/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 hover:underline"
                >
                  🟣 Get Claude API Key →
                </a>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800 hover:underline"
                >
                  🟢 Get OpenAI API Key →
                </a>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-[#F49220]/10 to-[#8C2D2E]/10 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tips for Better Results</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Upload your brand book (PDF/Word) for on-brand content</li>
                <li>• Be specific about the tone you want</li>
                <li>• Use "Use as Input" to iterate on results</li>
                <li>• Try different Quick Actions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
