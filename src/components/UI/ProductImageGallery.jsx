import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Camera,
  Play
} from 'lucide-react';

// Enhanced ProductImageGallery Component
export const ProductImageGallery = ({ images, productName, badge, discount }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100/50 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/50"></div>
        <img 
          src={images[selectedImage]} 
          alt={productName}
          className="w-full h-96 object-cover rounded-xl relative z-10 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Image badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {badge && (
            <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {badge}
            </span>
          )}
          {discount && (
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {discount} OFF
            </span>
          )}
        </div>

        {/* Image controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors">
            <Camera className="w-4 h-4 text-gray-700" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors">
            <Play className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Navigation arrows for main image */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 z-20"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 z-20"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img 
              src={image} 
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Enhanced ProductDetails Component
