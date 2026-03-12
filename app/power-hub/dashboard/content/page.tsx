'use client';

//==============================================================================
// POWER HUB CMS - Content List Page
//==============================================================================
// Lists all content JSON files from GitHub repository.
// Click on a file to edit and deploy.
//==============================================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/power-hub/Header';
import { FileJson, Edit3, Loader2, AlertCircle, Github } from 'lucide-react';

interface ContentFile {
  filename: string;
  sha: string;
  size: number;
}

export default function ContentListPage() {
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setError('');
      const response = await fetch('/api/power-hub/content');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch content');
      }

      setContentFiles(data.files || []);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err instanceof Error ? err.message : 'Failed to load content files');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Format filename to display name
  const formatDisplayName = (filename: string) => {
    return filename
      .replace('.json', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div>
      <Header title="Content" subtitle="Edit your website content" />

      <div className="p-8">
        <div className="">
          {/* Info Banner */}
          <div className="flex items-center gap-3 p-4 bg-[#F49220]/10 border border-[#F49220]/20 rounded-xl text-[#F49220] mb-6">
            <Github size={20} />
            <div>
              <p className="font-medium">GitHub-Powered CMS</p>
              <p className="text-sm text-gray-600">
                Edit content here → Save & Deploy → Changes go live automatically via Vercel
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
              <AlertCircle size={20} />
              <div>
                <p className="font-medium">Failed to load content</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Content Files */}
          <div className="bg-white rounded-2xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileJson className="w-5 h-5 text-[#F49220]" />
                Content Files
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Click on a file to edit its content
              </p>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 text-[#F49220] animate-spin mx-auto" />
                <p className="text-sm text-gray-500 mt-2">Loading from GitHub...</p>
              </div>
            ) : contentFiles.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No content files found in the <code className="bg-gray-100 px-2 py-1 rounded">content/</code> directory
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {contentFiles.map((file) => (
                  <Link
                    key={file.filename}
                    href={`/power-hub/dashboard/content/${file.filename.replace('.json', '')}`}
                    className="flex items-center justify-between p-5 hover:bg-[#F49220]/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F49220]/10 flex items-center justify-center group-hover:bg-[#F49220] transition-colors">
                        <FileJson className="w-6 h-6 text-[#F49220] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {formatDisplayName(file.filename)} Page
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{formatFileSize(file.size)}</span>
                          <span className="text-gray-300">•</span>
                          <span className="font-mono text-xs">{file.sha.slice(0, 7)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#F49220]">
                      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Edit
                      </span>
                      <Edit3 className="w-5 h-5" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
