import React from 'react';

interface ICleanLogoProps {
  variant?: 'default' | 'inverted';
  className?: string;
}

/**
 * Marca oficial iClean em SVG vetorial proporcional.
 * Mantém as proporções e cores da marca (#0C482B e #78D34B).
 */
export const ICleanLogo: React.FC<ICleanLogoProps> = ({
  variant = 'default',
  className = '',
}) => {
  const isInverted = variant === 'inverted';
  const primaryText = isInverted ? '#FFFFFF' : '#0C482B';
  const leafColor = '#78D34B';
  const dropColor = isInverted ? '#FFFFFF' : '#0C482B';

  return (
    <span
      className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M18 3C18 3 8 13.8 8 21.2C8 26.8 12.477 31.5 18 31.5C23.523 31.5 28 26.8 28 21.2C28 13.8 18 3 18 3Z"
          stroke={dropColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 22.5C13.5 17.8 17.4 14 22.5 14C22.5 19.2 18.6 23.2 13.5 22.5Z"
          fill={leafColor}
        />
        <path
          d="M27.5 6.5L28.3 8.7L30.5 9.5L28.3 10.3L27.5 12.5L26.7 10.3L24.5 9.5L26.7 8.7L27.5 6.5Z"
          fill={leafColor}
        />
      </svg>
      <span
        className="font-display text-2xl font-bold tracking-tight leading-none"
        style={{color: primaryText}}
      >
        i<span style={{color: isInverted ? '#78D34B' : '#0C482B'}}>Clean</span>
      </span>
    </span>
  );
};
