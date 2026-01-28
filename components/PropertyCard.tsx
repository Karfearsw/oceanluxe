import React from 'react';
import { Property } from '../types';
import AiImage from './AiImage';
import { MapPin, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onInquire: (property: Property) => void;
  fallbackSrc?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onInquire, fallbackSrc = '/logo.png' }) => {
  return (
    <div className="group relative bg-brand-darkgray border border-gray-800 overflow-hidden hover:border-brand-gold transition-all duration-300">
      <div className="h-64 w-full overflow-hidden relative">
        <div className="absolute top-4 left-4 z-10 bg-brand-gold text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
          {property.type}
        </div>
        <AiImage 
          prompt={property.imagePrompt} 
          alt={property.title} 
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          fallbackSrc={fallbackSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
      </div>
      
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
             <h3 className="text-xl font-serif text-white mb-1">{property.title}</h3>
             <div className="flex items-center text-gray-400 text-sm">
               <MapPin className="w-3 h-3 mr-1 text-brand-gold" />
               {property.location}
             </div>
          </div>
          <div className="text-right">
            <span className="block text-xl font-light text-brand-gold">{property.price}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <span className="text-xs text-gray-400 uppercase tracking-wider">{property.specs}</span>
          <button 
            onClick={() => onInquire(property)}
            className="flex items-center text-white hover:text-brand-gold text-sm font-medium transition-colors"
          >
            Details <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
