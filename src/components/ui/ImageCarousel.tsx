import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  items, 
  autoPlay = true, 
  interval = 5000,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isHovered, items.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (items.length === 0) return null;

  return (
    <div 
      className={`relative w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative w-full h-48 md:h-56 lg:h-64">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-90 line-clamp-2">
                    {item.description}
                  </p>
                  {item.link && (
                    <a 
                      href={item.link}
                      className="inline-block mt-2 text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                    >
                      Ver más
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {items.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;