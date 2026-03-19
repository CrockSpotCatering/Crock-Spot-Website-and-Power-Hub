'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/power-hub/Header';
import {
  Sparkles, FileText, Zap, Copy, Check, Loader2, Key, Eye, EyeOff,
  X, FileUp, BookOpen, AlertCircle, Trash2, CheckCircle, RefreshCw
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

interface StoredDocument {
  id: string;
  name: string;
  content: string;
  uploadedAt: string;
  fileSize: number;
  fileType: string;
}

interface AISettings {
  provider: AIProvider;
  claudeApiKey: string;
  openaiApiKey: string;
  lastUpdated: string;
}

export default function AIAssistPage() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // API Key state (stored on server - shared across team)
  const [claudeApiKey, setClaudeApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [provider, setProvider] = useState<AIProvider>('claude');
  const [showApiKey, setShowApiKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [savingKey, setSavingKey] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [settingsSha, setSettingsSha] = useState<string>('');

  // Brand Documents state (stored on server - shared across team)
  const [documents, setDocuments] = useState<StoredDocument[]>([]);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [showBrandSection, setShowBrandSection] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [deletingDoc, setDeletingDoc] = useState<string | null>(null);

  // Get the active API key based on current provider
  const apiKey = provider === 'claude' ? claudeApiKey : openaiApiKey;

  // Load API settings from server on mount
  const fetchSettings = useCallback(async () => {
    setLoadingSettings(true);
    try {
      const response = await fetch('/api/power-hub/content?file=settings.json');
      if (response.ok) {
        const data = await response.json();
        const settings: AISettings = data.content?.aiSettings || {};
        setSettingsSha(data.sha || '');

        if (settings.provider) {
          setProvider(settings.provider);
        }
        if (settings.claudeApiKey) {
          setClaudeApiKey(settings.claudeApiKey);
          setKeySaved(true);
        }
        if (settings.openaiApiKey) {
          setOpenaiApiKey(settings.openaiApiKey);
          if (settings.provider === 'openai') setKeySaved(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      // Fall back to localStorage
      const savedKey = localStorage.getItem('crockspot_ai_api_key');
      const savedProvider = localStorage.getItem('crockspot_ai_provider') as AIProvider;
      if (savedKey) {
        if (savedProvider === 'openai') {
          setOpenaiApiKey(savedKey);
        } else {
          setClaudeApiKey(savedKey);
        }
        setKeySaved(true);
      }
      if (savedProvider) {
        setProvider(savedProvider);
      }
    }
    setLoadingSettings(false);
  }, []);

  useEffect(() => {
    fetchSettings();
    // Load selected docs from localStorage (per-user preference)
    const savedSelectedDocs = localStorage.getItem('crockspot_selected_docs');
    if (savedSelectedDocs) {
      setSelectedDocIds(JSON.parse(savedSelectedDocs));
    }
  }, [fetchSettings]);

  // Load documents from server on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoadingDocs(true);
    try {
      const response = await fetch('/api/power-hub/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
    setLoadingDocs(false);
  };

  const saveApiKey = async () => {
    const currentKey = provider === 'claude' ? claudeApiKey : openaiApiKey;
    if (!currentKey.trim()) return;

    setSavingKey(true);
    try {
      const settings = {
        aiSettings: {
          provider,
          claudeApiKey,
          openaiApiKey,
          lastUpdated: new Date().toISOString(),
        }
      };

      const response = await fetch('/api/power-hub/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'content/settings.json',
          content: settings,
          sha: settingsSha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSettingsSha(data.newSha || settingsSha);
        setKeySaved(true);
        // Also save to localStorage as backup
        localStorage.setItem('crockspot_ai_api_key', currentKey);
        localStorage.setItem('crockspot_ai_provider', provider);
      } else {
        const error = await response.json();
        console.error('Failed to save API key:', error);
        setUploadError('Failed to save API key: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save API key:', error);
      setUploadError('Failed to save API key: ' + String(error));
    }
    setSavingKey(false);
  };

  const clearApiKey = async () => {
    setSavingKey(true);
    try {
      const settings = {
        aiSettings: {
          provider,
          claudeApiKey: provider === 'claude' ? '' : claudeApiKey,
          openaiApiKey: provider === 'openai' ? '' : openaiApiKey,
          lastUpdated: new Date().toISOString(),
        }
      };

      const response = await fetch('/api/power-hub/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'content/settings.json',
          content: settings,
          sha: settingsSha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSettingsSha(data.newSha || settingsSha);
        if (provider === 'claude') {
          setClaudeApiKey('');
        } else {
          setOpenaiApiKey('');
        }
        setKeySaved(false);
        localStorage.removeItem('crockspot_ai_api_key');
      }
    } catch (error) {
      console.error('Failed to clear API key:', error);
    }
    setSavingKey(false);
  };

  const toggleDocSelection = (docId: string) => {
    setSelectedDocIds(prev => {
      const newSelection = prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId];
      localStorage.setItem('crockspot_selected_docs', JSON.stringify(newSelection));
      return newSelection;
    });
  };

  const deleteDocument = async (docId: string) => {
    setDeletingDoc(docId);
    try {
      const response = await fetch('/api/power-hub/documents', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: docId }),
      });

      if (response.ok) {
        setDocuments(prev => prev.filter(doc => doc.id !== docId));
        setSelectedDocIds(prev => prev.filter(id => id !== docId));
      } else {
        const data = await response.json();
        setUploadError(data.error || 'Failed to delete document');
      }
    } catch (error) {
      setUploadError('Failed to delete document: ' + String(error));
    }
    setDeletingDoc(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadingFile(true);

    const fileName = file.name.toLowerCase();
    let extractedText = '';

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

        extractedText = data.text;
      } catch (error) {
        setUploadError('Failed to upload file: ' + String(error));
        setUploadingFile(false);
        e.target.value = '';
        return;
      }
    }
    // Handle plain text files directly
    else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      extractedText = await file.text();
    }
    else {
      setUploadError('Unsupported file type. Please upload a PDF, Word document (.docx), or text file.');
      setUploadingFile(false);
      e.target.value = '';
      return;
    }

    // Auto-save to server
    try {
      const response = await fetch('/api/power-hub/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: file.name,
          content: extractedText,
          fileSize: file.size,
          fileType: file.type || 'text/plain',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadError(data.error || 'Failed to save document');
      } else {
        // Add to local state and auto-select
        setDocuments(prev => [...prev, data.document]);
        setSelectedDocIds(prev => {
          const newSelection = [...prev, data.document.id];
          localStorage.setItem('crockspot_selected_docs', JSON.stringify(newSelection));
          return newSelection;
        });
      }
    } catch (error) {
      setUploadError('Failed to save document: ' + String(error));
    }

    setUploadingFile(false);
    e.target.value = '';
  };

  // Get combined brand context from selected documents
  const getBrandContext = (): string | null => {
    if (selectedDocIds.length === 0) return null;

    const selectedDocs = documents.filter(doc => selectedDocIds.includes(doc.id));
    if (selectedDocs.length === 0) return null;

    return selectedDocs
      .map(doc => `--- ${doc.name} ---\n${doc.content}`)
      .join('\n\n');
  };

  const handleGenerate = async (customPrompt?: string) => {
    if (!content.trim()) return;

    setLoading(true);
    setOutput('');

    const usedPrompt = customPrompt || prompt;
    const brandContext = getBrandContext();

    // If no API key, show demo response
    if (!apiKey.trim()) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutput(`[Demo Mode - No API Key]\n\nTo get real AI responses, add your API key above.\n\nYour prompt: "${usedPrompt}"\nYour content: "${content.substring(0, 100)}..."\n${brandContext ? `\nBrand documents selected: ${selectedDocIds.length}` : ''}\n\n---\nAdd a Claude or OpenAI API key to enable real AI-powered content generation.`);
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
          brandContext,
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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
                  onClick={() => {
                    setProvider('claude');
                    setKeySaved(!!claudeApiKey);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all relative ${
                    provider === 'claude'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400'
                  }`}
                >
                  Claude (Anthropic)
                  {claudeApiKey && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setProvider('openai');
                    setKeySaved(!!openaiApiKey);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all relative ${
                    provider === 'openai'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-400'
                  }`}
                >
                  ChatGPT (OpenAI)
                  {openaiApiKey && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
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
                    value={provider === 'claude' ? claudeApiKey : openaiApiKey}
                    onChange={(e) => {
                      if (provider === 'claude') {
                        setClaudeApiKey(e.target.value);
                      } else {
                        setOpenaiApiKey(e.target.value);
                      }
                      setKeySaved(false);
                    }}
                    placeholder={provider === 'claude' ? 'sk-ant-api...' : 'sk-...'}
                    disabled={loadingSettings}
                    className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220] focus:border-[#F49220] text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
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
                    disabled={savingKey}
                    className="px-4 py-3 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] font-medium disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingKey ? <Loader2 size={16} className="animate-spin" /> : null}
                    {savingKey ? 'Saving...' : 'Save'}
                  </button>
                ) : keySaved && apiKey ? (
                  <button
                    onClick={clearApiKey}
                    disabled={savingKey}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium disabled:opacity-50"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-4 flex items-center gap-2">
            {loadingSettings ? (
              <>
                <Loader2 size={14} className="animate-spin text-gray-500" />
                <span className="text-sm text-gray-500">Loading saved settings...</span>
              </>
            ) : keySaved && apiKey ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  {provider === 'claude' ? 'Claude' : 'ChatGPT'} API key saved and ready! (Shared across team)
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

          {/* Show if other provider has a saved key */}
          {(provider === 'claude' && openaiApiKey) || (provider === 'openai' && claudeApiKey) ? (
            <div className="mt-2 text-xs text-gray-500">
              💡 Tip: {provider === 'claude' ? 'OpenAI' : 'Claude'} key is also saved. Switch providers to use it.
            </div>
          ) : null}
        </div>

        {/* Brand Documents Section */}
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
                <h2 className="text-lg font-bold text-gray-900">Brand Documents</h2>
                <p className="text-sm text-gray-600">
                  {documents.length > 0
                    ? `${documents.length} document${documents.length !== 1 ? 's' : ''} saved${selectedDocIds.length > 0 ? ` (${selectedDocIds.length} selected for AI context)` : ''}`
                    : 'Upload brand books, style guides, and flyers (saved for all team members)'}
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
                <div className="flex items-center gap-3 flex-wrap">
                  <label className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors ${uploadingFile ? 'opacity-50 cursor-wait' : ''}`}>
                    {uploadingFile ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <FileUp size={18} />
                    )}
                    {uploadingFile ? 'Uploading & Saving...' : 'Upload Document'}
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt,.md"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={fetchDocuments}
                    disabled={loadingDocs}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <RefreshCw size={16} className={loadingDocs ? 'animate-spin' : ''} />
                    Refresh
                  </button>
                  <span className="text-sm text-gray-500">
                    PDF, Word (.docx), Text files - Auto-saved for all team members
                  </span>
                </div>

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

              {/* Documents List */}
              <div className="space-y-2">
                {loadingDocs ? (
                  <div className="flex items-center justify-center py-8 text-gray-500">
                    <Loader2 size={24} className="animate-spin mr-2" />
                    Loading documents...
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-2 opacity-30" />
                    <p>No brand documents uploaded yet.</p>
                    <p className="text-sm">Upload your brand book, style guide, or any reference materials.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-3">
                      Select documents to include as context for AI generation:
                    </p>
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          selectedDocIds.includes(doc.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <button
                          onClick={() => toggleDocSelection(doc.id)}
                          className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                            selectedDocIds.includes(doc.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {selectedDocIds.includes(doc.id) && <Check size={14} />}
                        </button>
                        <FileText size={20} className="text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(doc.fileSize)} • {doc.content.length.toLocaleString()} chars • {formatDate(doc.uploadedAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          disabled={deletingDoc === doc.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete document"
                        >
                          {deletingDoc === doc.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Selected Status */}
              {selectedDocIds.length > 0 && (
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <CheckCircle size={16} />
                  <span>
                    {selectedDocIds.length} document{selectedDocIds.length !== 1 ? 's' : ''} selected - AI will use these for brand context
                  </span>
                </div>
              )}
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
                  Get Claude API Key →
                </a>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800 hover:underline"
                >
                  Get OpenAI API Key →
                </a>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-[#F49220]/10 to-[#8C2D2E]/10 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tips for Better Results</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Upload your brand book for on-brand content</li>
                <li>• Documents are saved for all team members</li>
                <li>• Select multiple docs for richer context</li>
                <li>• Use &ldquo;Use as Input&rdquo; to iterate on results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
