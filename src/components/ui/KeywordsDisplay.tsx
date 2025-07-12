import React from 'react';

interface KeywordsDisplayProps {
  keywords: string[];
  maxDisplay?: number;
  showAll?: boolean;
  className?: string;
}

export const KeywordsDisplay: React.FC<KeywordsDisplayProps> = ({
  keywords,
  maxDisplay = 5,
  showAll = false,
  className = ''
}) => {
  const displayKeywords = showAll ? keywords : keywords.slice(0, maxDisplay);
  const hasMore = !showAll && keywords.length > maxDisplay;

  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayKeywords.map((keyword, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-default"
          title={keyword}
        >
          {keyword}
        </span>
      ))}
      {hasMore && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          +{keywords.length - maxDisplay} más
        </span>
      )}
    </div>
  );
};

// Componente para mostrar palabras clave como badges más pequeños
export const KeywordsBadges: React.FC<KeywordsDisplayProps> = ({
  keywords,
  maxDisplay = 3,
  showAll = false,
  className = ''
}) => {
  const displayKeywords = showAll ? keywords : keywords.slice(0, maxDisplay);
  const hasMore = !showAll && keywords.length > maxDisplay;

  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayKeywords.map((keyword, index) => (
        <span
          key={index}
          className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200"
          title={keyword}
        >
          {keyword}
        </span>
      ))}
      {hasMore && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
          +{keywords.length - maxDisplay}
        </span>
      )}
    </div>
  );
};

// Componente para mostrar palabras clave en formato de lista
export const KeywordsList: React.FC<KeywordsDisplayProps> = ({
  keywords,
  maxDisplay = 10,
  showAll = false,
  className = ''
}) => {
  const displayKeywords = showAll ? keywords : keywords.slice(0, maxDisplay);
  const hasMore = !showAll && keywords.length > maxDisplay;

  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1 mb-2">
        {displayKeywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors cursor-default"
            title={keyword}
          >
            {keyword}
          </span>
        ))}
      </div>
      {hasMore && (
        <p className="text-sm text-gray-500">
          Y {keywords.length - maxDisplay} palabras clave más...
        </p>
      )}
    </div>
  );
}; 