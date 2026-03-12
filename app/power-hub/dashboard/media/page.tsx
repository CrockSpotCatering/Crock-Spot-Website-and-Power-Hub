'use client';

//==============================================================================
// POWER HUB - Media Library Page
// Upload and manage images via GitHub repository
//==============================================================================

import { useState, useRef, useCallback, useEffect } from 'react';
import Header from '@/components/power-hub/Header';
import { Upload, Grid, List, Search, Trash2, Copy, Check, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  previewUrl?: string;
  size: string;
  uploaded: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing media on mount
  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const response = await fetch('/api/power-hub/media');
      const data = await response.json();

      if (data.error) {
        setLoadError(data.error);
      }

      if (data.media) {
        setMedia(data.media);
      }
    } catch (error) {
      console.error('Error loading media:', error);
      setLoadError('Failed to load media: ' + String(error));
    }
    setLoading(false);
  };

  const handleFiles = useCallback(async (files: FileList) => {
    setUploading(true);
    setUploadError('');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files are allowed');
        continue;
      }

      try {
        // Upload to GitHub via API
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/power-hub/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          setUploadError(data.error || 'Upload failed');
          continue;
        }

        const newFile: MediaFile = {
          id: 'new-' + Date.now().toString() + '-' + i,
          name: data.filename || file.name,
          url: data.url,
          previewUrl: data.previewUrl,
          size: (file.size / 1024).toFixed(1) + ' KB',
          uploaded: 'Just now',
        };

        setMedia((prev) => [newFile, ...prev]);
        setUploadSuccess('Image uploaded! Copy the URL below and paste it in the Content editor. Changes will appear on the live site after deployment.');
        setTimeout(() => setUploadSuccess(''), 15000); // Clear after 15 seconds
      } catch (error) {
        console.error('Upload error:', error);
        setUploadError('Failed to upload file: ' + String(error));
      }
    }

    setUploading(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const deleteFile = async (id: string, url: string) => {
    try {
      const response = await fetch('/api/power-hub/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setMedia((prev) => prev.filter((f) => f.id !== id));
      } else {
        const data = await response.json();
        setUploadError(data.error || 'Failed to delete file');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUploadError('Failed to delete file');
    }
  };

  const filteredMedia = media.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header title="Media Library" subtitle="Upload and manage your images" />

      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#F49220] text-white rounded-lg hover:bg-[#e08519] transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
            <button
              onClick={loadMedia}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F49220]/20 focus:border-[#F49220] w-64"
              />
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Load Error Display */}
        {loadError && (
          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 mb-6">
            <AlertCircle size={20} />
            <div>
              <p className="font-medium">Could not load existing media</p>
              <p className="text-sm">{loadError}</p>
            </div>
          </div>
        )}

        {/* Upload Success Display */}
        {uploadSuccess && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 mb-6">
            <Check size={20} />
            <div>
              <p className="font-medium">Upload Successful!</p>
              <p className="text-sm">{uploadSuccess}</p>
            </div>
            <button
              onClick={() => setUploadSuccess('')}
              className="ml-auto text-green-500 hover:text-green-700"
            >
              X
            </button>
          </div>
        )}

        {/* Upload Error Display */}
        {uploadError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
            <AlertCircle size={20} />
            <div>
              <p className="font-medium">Upload Error</p>
              <p className="text-sm">{uploadError}</p>
            </div>
            <button
              onClick={() => setUploadError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              X
            </button>
          </div>
        )}

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-all cursor-pointer ${
            isDragging ? 'border-[#F49220] bg-[#F49220]/5' : 'border-gray-300 hover:border-[#F49220]'
          }`}
        >
          <Upload size={40} className={`mx-auto mb-4 ${isDragging ? 'text-[#F49220]' : 'text-gray-400'}`} />
          <p className="text-gray-600 font-medium">
            {isDragging ? 'Drop files here!' : 'Drag and drop files here'}
          </p>
          <p className="text-sm text-gray-400 mt-1">or click to browse</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 size={48} className="mx-auto text-[#F49220] animate-spin mb-4" />
            <p className="text-gray-500">Loading media...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <Upload size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {searchQuery ? 'No files match your search' : 'No files uploaded yet'}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Upload an image to get started
            </p>
          </div>
        )}

        {/* Media Grid */}
        {!loading && viewMode === 'grid' && filteredMedia.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((file) => (
              <div key={file.id} className="bg-white rounded-xl border border-gray-200 p-3 group">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={file.previewUrl || file.url} alt={file.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-medium truncate mb-1">{file.name}</p>
                <p className="text-xs text-gray-400 mb-3">{file.size} - {file.uploaded}</p>

                {/* Always visible URL and actions */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={file.url}
                      readOnly
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="flex-1 text-xs bg-transparent text-gray-600 truncate outline-none cursor-text"
                    />
                    <button
                      onClick={() => copyUrl(file.url)}
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                      title="Copy URL"
                    >
                      {copiedUrl === file.url ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <Copy size={14} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyUrl(file.url)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#F49220] text-white text-sm rounded-lg hover:bg-[#e08519] transition-colors"
                    >
                      {copiedUrl === file.url ? <Check size={14} /> : <Copy size={14} />}
                      {copiedUrl === file.url ? 'Copied!' : 'Copy URL'}
                    </button>
                    <button
                      onClick={() => deleteFile(file.id, file.url)}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Media List */}
        {!loading && viewMode === 'list' && filteredMedia.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200">
            {filteredMedia.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={file.previewUrl || file.url} alt={file.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size} - {file.uploaded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="hidden md:flex items-center gap-1 p-2 bg-gray-50 rounded-lg max-w-xs">
                    <input
                      type="text"
                      value={file.url}
                      readOnly
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="text-xs bg-transparent text-gray-600 truncate outline-none w-40 cursor-text"
                    />
                  </div>
                  <button
                    onClick={() => copyUrl(file.url)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#F49220] text-white text-sm rounded-lg hover:bg-[#e08519] transition-colors"
                  >
                    {copiedUrl === file.url ? <Check size={14} /> : <Copy size={14} />}
                    {copiedUrl === file.url ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => deleteFile(file.id, file.url)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
