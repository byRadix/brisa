import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true, variant = 'default' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        className={sizeClasses[size]} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {variant === 'light' ? (
            <>
              <linearGradient id="gradient1-light" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#FFFFFF', stopOpacity:0.9}} />
                <stop offset="50%" style={{stopColor:'#F8FAFC', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:'#E2E8F0', stopOpacity:0.9}} />
              </linearGradient>
              <linearGradient id="gradient2-light" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#F8FAFC', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:'#CBD5E1', stopOpacity:0.9}} />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#10B981', stopOpacity:1}} />
                <stop offset="50%" style={{stopColor:'#06B6D4', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#06B6D4', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#1D4ED8', stopOpacity:1}} />
              </linearGradient>
            </>
          )}
        </defs>
        
        {/* Left curved element */}
        <path d="M15 10 C15 10, 25 15, 25 30 L25 70 C25 85, 15 90, 15 90 L15 10 Z" fill={variant === 'light' ? 'url(#gradient1-light)' : 'url(#gradient1)'}/>
        
        {/* Top right curved element */}
        <path d="M35 15 C50 15, 65 20, 75 35 C85 50, 80 60, 70 65 L45 50 C40 47, 35 42, 35 35 L35 15 Z" fill={variant === 'light' ? 'url(#gradient2-light)' : 'url(#gradient2)'}/>
        
        {/* Bottom right curved element */}
        <path d="M35 45 C35 45, 40 50, 45 52 L70 67 C80 72, 85 82, 75 87 C65 92, 50 87, 35 87 L35 45 Z" fill={variant === 'light' ? 'url(#gradient2-light)' : 'url(#gradient2)'}/>
      </svg>
      
      {showText && (
        <span className={`ml-2 font-bold ${variant === 'light' ? 'text-white drop-shadow-lg' : 'bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent'} ${textSizeClasses[size]}`}>
          Briisa.app
        </span>
      )}
    </div>
  );
};

export default Logo;