'use client';

import { useState } from 'react';
import Header from '@/components/power-hub/Header';
import { Sparkles, Send, Copy, Check, RefreshCw, FileText, Mail, MessageSquare, Megaphone } from 'lucide-react';

const templates = [
  { id: 'menu-description', name: 'Menu Description', icon: FileText, prompt: 'Write a mouth-watering description for our signature slow-cooked' },
  { id: 'email-response', name: 'Email Response', icon: Mail, prompt: 'Write a professional email response to a catering inquiry about' },
  { id: 'social-post', name: 'Social Media Post', icon: MessageSquare, prompt: 'Create an engaging social media post about' },
  { id: 'promo-text', name: 'Promotional Text', icon: Megaphone, prompt: 'Write promotional copy for our upcoming' },
];

export default function AIAssistPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult('');

    // Simulate AI generation (in production, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sample generated content based on prompt
    const sampleResponses: Record<string, string> = {
      default: `Here's some great content for The Crock Spot:\n\n"At The Crock Spot, we believe that the best flavors come to those who wait. Our signature slow-cooked dishes are crafted with love, patience, and the finest ingredients Denver has to offer.\n\nFrom our savory pulled pork to our melt-in-your-mouth beef brisket, every bowl tells a story of tradition, quality, and pure culinary passion.\n\nLet Us Crock Your World! 🍲"\n\nFeel free to customize this for your needs!`,
    };

    setResult(sampleResponses.default);
    setLoading(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const useTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt);
  };

  return (
    <div>
      <Header title="AI Assist" subtitle="AI-powered content generation" />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What would you like me to write?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] transition-all text-gray-900 resize-none"
                placeholder="E.g., Write a description for our pulled pork bowl, or create a social media post about our weekend specials..."
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={generateContent}
                  disabled={loading || !prompt.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F49220] to-[#8C2D2E] text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 shadow-lg"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result Area */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#F49220]" />
                    Generated Content
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyResult}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={generateContent}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-gray-700">
                  {result}
                </div>
              </div>
            )}
          </div>

          {/* Templates Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Templates</h3>
              <div className="space-y-2">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => useTemplate(template.prompt)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#F49220]/10 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-[#F49220]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#F49220]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{template.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F49220]/10 to-[#8C2D2E]/10 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tips for Better Results</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be specific about the tone (professional, casual, fun)</li>
                <li>• Mention the target audience</li>
                <li>• Include key details you want highlighted</li>
                <li>• Specify the length you need</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-600">
                <strong>Note:</strong> This is a demo version. Connect to OpenAI or Claude API for real AI-powered generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
