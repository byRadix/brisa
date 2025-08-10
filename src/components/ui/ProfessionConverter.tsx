import React, { useEffect, useState, useRef } from 'react';
import { FileText, Youtube, HardDrive, FileSpreadsheet, Users, MessageSquare } from 'lucide-react';

interface AppIcon {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  startPosition: { x: number; y: number };
  pathId: string;
}

const ProfessionConverter: React.FC = () => {
  const [animationTime, setAnimationTime] = useState(0);
  const [diskPulse, setDiskPulse] = useState(1);
  
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  // Paleta de colores pastel degradados unificada
  const orderedLineColors = [
    '#87CEEB', // Azul cielo pastel
    '#F0E68C', // Amarillo pastel
    '#FFB6C1', // Rosa pastel
    '#98FB98', // Verde menta pastel
    '#DDA0DD', // Ciruela pastel
    '#F5DEB3'  // Trigo pastel
  ];

  const appIcons: AppIcon[] = [
    {
      id: 'slack',
      name: 'Slack',
      icon: MessageSquare,
      color: '#4A154B',
      startPosition: { x: 5, y: 20 },
      pathId: 'path1'
    },
    {
      id: 'pdf',
      name: 'PDF',
      icon: FileText,
      color: '#FF0000',
      startPosition: { x: 10, y: 70 },
      pathId: 'path2'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: '#FF0000',
      startPosition: { x: 8, y: 45 },
      pathId: 'path3'
    },
    {
      id: 'drive',
      name: 'Google Drive',
      icon: HardDrive,
      color: '#4285F4',
      startPosition: { x: 15, y: 25 },
      pathId: 'path4'
    },
    {
      id: 'excel',
      name: 'Excel',
      icon: FileSpreadsheet,
      color: '#217346',
      startPosition: { x: 12, y: 60 },
      pathId: 'path5'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Users,
      color: '#0077B5',
      startPosition: { x: 6, y: 35 },
      pathId: 'path6'
    }
  ];

  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      setAnimationTime(elapsed % 10);
      
      // Pulso del disco cuando los iconos llegan al centro
      const iconArrivalTime = 2;
      if (elapsed % 10 >= iconArrivalTime && elapsed % 10 <= iconArrivalTime + 0.15) {
        const pulseProgress = (elapsed % 10 - iconArrivalTime) / 0.15;
        setDiskPulse(1 + Math.sin(pulseProgress * Math.PI) * 0.05);
      } else {
        setDiskPulse(1);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Función para calcular la posición del icono en la cadena de montaje
  const getIconPosition = (icon: AppIcon, time: number) => {
    const iconIndex = appIcons.findIndex(i => i.id === icon.id);
    const staggerDelay = iconIndex * 0.3;
    const adjustedTime = time - staggerDelay;
    
    if (adjustedTime < 0 || adjustedTime > 8) {
      return { x: -100, y: -100, opacity: 0 };
    }
    
    const totalDuration = 8;
    const progress = Math.min(adjustedTime / totalDuration, 1);
    
    let x, y, color;
    
    if (progress <= 0.5) {
      // Fase 1: Movimiento por líneas curvas desordenadas (0-50%)
      const t = progress * 2;
      const easeProgress = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      x = icon.startPosition.x + (50 - icon.startPosition.x) * easeProgress;
      y = icon.startPosition.y + (50 - icon.startPosition.y) * easeProgress;
      color = icon.color;
    } else {
      // Fase 2: Movimiento por líneas horizontales hasta el final de la pantalla
      const t = (progress - 0.5) * 2;
      const orderedY = 35 + (iconIndex * 6);
      
      if (t < 0.15) {
        // Transición suave del centro a la línea ordenada
        const transitionProgress = t / 0.15;
        x = 50 + transitionProgress * 8;
        y = 50 + transitionProgress * (orderedY - 50);
      } else {
        // Movimiento horizontal hasta el final de la pantalla (100%)
        const horizontalProgress = (t - 0.15) / 0.85;
        x = 58 + horizontalProgress * 50; // Continúa hasta x=108 (fuera de pantalla)
        y = orderedY;
      }
      color = orderedLineColors[iconIndex % orderedLineColors.length];
    }
    
    return { x, y, opacity: 1, color };
  };

  // Función para generar paths de cadena de montaje
  const generateAssemblyPath = (icon: AppIcon, iconIndex: number) => {
    const startX = icon.startPosition.x;
    const startY = icon.startPosition.y;
    const centerX = 50;
    const centerY = 50;
    
    // Líneas curvas desordenadas y entrecruzadas hacia el centro
    const controlX1 = startX + 15 + Math.sin(iconIndex * 2.3) * 25;
    const controlY1 = startY + Math.cos(iconIndex * 1.7) * 30;
    const controlX2 = centerX - 20 + Math.sin(iconIndex * 3.1) * 20;
    const controlY2 = centerY + Math.cos(iconIndex * 2.9) * 25;
    
    const midX = startX + (centerX - startX) * 0.4 + Math.sin(iconIndex * 1.5) * 15;
    const midY = startY + (centerY - startY) * 0.6 + Math.cos(iconIndex * 2.1) * 20;
    
    const curvePath = `M ${startX} ${startY} 
                      Q ${controlX1} ${controlY1} ${midX} ${midY} 
                      Q ${controlX2} ${controlY2} ${centerX} ${centerY}`;
    
    // Línea horizontal perfectamente ordenada desde el centro hasta más allá del final
    const orderedY = 35 + (iconIndex * 6);
    const transitionX = centerX + 8;
    const straightPath = `M ${centerX} ${centerY} L ${transitionX} ${orderedY} L 110 ${orderedY}`;
    
    return { curvePath, straightPath, orderedY };
  };

  return (
    <div className="absolute inset-0 w-full h-full" style={{ perspective: '800px' }}>
      {/* Fondo del paisaje con el chico pensando */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=A%20serene%20landscape%20at%20sunset%20with%20a%20person%20sitting%20on%20a%20hill%20looking%20at%20the%20horizon%2C%20purple%20and%20pink%20clouds%2C%20peaceful%20atmosphere%2C%20dreamy%20colors%2C%20digital%20art%20style&image_size=landscape_16_9')`,
        }}
      />
      
      {/* Overlay oscuro para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Título principal - responsive mejorado */}
       <div className="absolute top-16 sm:top-20 md:top-24 lg:top-28 left-1/2 transform -translate-x-1/2 text-center z-10 px-4">
         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-wide">
           Da vida a tus ideas
         </h1>
         <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
           Transformando el caos creativo en soluciones personalizadas
         </p>
       </div>

      {/* Contenedor principal de la animación - responsive */}
       <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
         <div className="relative w-full max-w-7xl h-64 sm:h-80 md:h-96 lg:h-[28rem]">
          
          {/* SVG para líneas de cadena de montaje - LÍNEAS MÁS FINAS Y CONTINUAS */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {appIcons.map((icon, index) => {
              const paths = generateAssemblyPath(icon, index);
              return (
                <g key={icon.pathId}>
                  {/* Línea curva desordenada - MÁS FINA Y CONTINUA */}
                  <path
                    d={paths.curvePath}
                    stroke={orderedLineColors[index % orderedLineColors.length]}
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.8"
                    style={{
                      filter: `drop-shadow(0 0 3px ${orderedLineColors[index % orderedLineColors.length]}40)`
                    }}
                  />
                  {/* Línea horizontal ordenada - MÁS FINA Y CONTINUA */}
                  <path
                    d={paths.straightPath}
                    stroke={orderedLineColors[index % orderedLineColors.length]}
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.8"
                    style={{
                      filter: `drop-shadow(0 0 3px ${orderedLineColors[index % orderedLineColors.length]}40)`
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Estación central de montaje */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ transform: `translate(-50%, -50%) scale(${diskPulse})` }}
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
              {/* Estación de montaje con efectos pastel */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-sky-300/40 via-purple-300/30 to-transparent border-2 border-sky-300/50" 
                   style={{ boxShadow: '0 0 40px rgba(135, 206, 235, 0.6), 0 0 80px rgba(221, 160, 221, 0.3)' }} />
              <div className="absolute inset-2 rounded-full border-2 border-white/20 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 rounded-full border border-white/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <div className="absolute inset-6 rounded-full border border-white/40" />
              
              {/* Logo central - FORTALECIDO Y EN CAPA MÁS ALTA */}
               <div className="absolute inset-0 flex items-center justify-center z-50">
                 <div className="relative">
                   {/* Resplandor de fondo más intenso */}
                   <div className="absolute inset-0 blur-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 opacity-80 rounded-full scale-200"></div>
                   {/* Sombra suave más pronunciada */}
                   <div className="absolute inset-0 bg-black/30 blur-md rounded-full scale-150"></div>
                   {/* Logo principal con mayor contraste */}
                   <span className="relative text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl z-50"
                         style={{
                           textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(147,197,253,0.8), 0 0 35px rgba(196,181,253,0.6)',
                           filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))'
                         }}>
                     Briisa
                   </span>
                   {/* Efecto de brillo adicional más intenso */}
                   <div className="absolute -inset-3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md opacity-70 animate-pulse"></div>
                 </div>
               </div>
              
              {/* Indicadores de procesamiento */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping" />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
              
              {/* Efectos de glow mejorados */}
              <div className="absolute -inset-4 rounded-full border border-white/10 animate-spin" 
                   style={{ animationDuration: '8s' }} />
              <div className="absolute -inset-8 rounded-full border border-white/5 animate-spin" 
                   style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
            </div>
          </div>

          {/* Iconos de aplicaciones en cadena de montaje */}
          {appIcons.map((icon) => {
            const position = getIconPosition(icon, animationTime);
            const IconComponent = icon.icon;
            
            if (position.opacity === 0) return null;
            
            return (
              <div
                key={icon.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  opacity: position.opacity,
                  zIndex: position.x > 50 ? 5 : 15, // Los íconos pasan por detrás del logo
                  filter: position.x > 50 
                    ? `drop-shadow(0 2px 6px rgba(0,0,0,0.2)) drop-shadow(0 0 12px ${position.color}40)`
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              >
                <div 
                   className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-sm"
                   style={{
                     backgroundColor: `${position.color}20`,
                     borderColor: position.color,
                     boxShadow: position.x > 50 ? `0 0 15px ${position.color}40` : 'none'
                   }}
                 >
                   <IconComponent 
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" 
                      style={{ color: position.color }} 
                    />
                 </div>
              </div>
            );
          })}

          {/* Líneas horizontales perfectamente ordenadas de salida - MÁS FINAS Y CONTINUAS */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {appIcons.map((_, index) => (
              <line
                key={`exit-line-${index}`}
                x1="58"
                y1={35 + index * 6}
                x2="110"
                y2={35 + index * 6}
                stroke={orderedLineColors[index % orderedLineColors.length]}
                strokeWidth="1.5"
                opacity="0.8"
                style={{
                  filter: `drop-shadow(0 0 3px ${orderedLineColors[index % orderedLineColors.length]}40)`
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfessionConverter;