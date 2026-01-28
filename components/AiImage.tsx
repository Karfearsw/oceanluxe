import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/gemini';
import { Loader2, Image as ImageIcon } from 'lucide-react';

interface AiImageProps {
  prompt: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  aspectRatio?: string; // Optional aspect ratio control for future use
}

const AiImage: React.FC<AiImageProps> = ({ prompt, alt, className = "", fallbackSrc }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const fetchImage = async () => {
      try {
        setLoading(true);
        const key = (process.env.API_KEY as string) || '';
        if (!key || key === 'PLACEHOLDER_API_KEY') {
          setError(true);
          return;
        }
        // Add specific style descriptors to ensure "Luxury" aesthetic matches the brand
        // Updated to emphasize GOLD accents instead of red
        const enhancedPrompt = `${prompt}, photorealistic, 8k, architectural photography, luxury real estate, dramatic lighting, gold accents, warm tones, high contrast, elegant`;
        
        const url = await generateImage(enhancedPrompt);
        
        if (mounted) {
          if (url) {
            setImageUrl(url);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      mounted = false;
    };
  }, [prompt]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-brand-darkgray animate-pulse ${className}`}>
        <div className="flex flex-col items-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin mb-2 text-brand-gold" />
          <span className="text-xs uppercase tracking-widest">Generating Visual...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
        {fallbackSrc ? (
          <img src={fallbackSrc} alt={alt} className="w-full h-full object-cover opacity-60" />
        ) : (
           <div className="flex items-center justify-center h-full text-gray-700">
             <ImageIcon className="w-12 h-12" />
           </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-light">Visual Unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={`object-cover ${className} transition-opacity duration-700 ease-in-out opacity-100`} 
    />
  );
};

export default AiImage;
