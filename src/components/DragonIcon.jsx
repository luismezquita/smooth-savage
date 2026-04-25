import React from 'react';

export const DragonIcon = ({ size = 24, strokeWidth = 2, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Horn */}
      <path d="M16 5 L14 2" />
      {/* Head with open jaw */}
      <path d="M16 5 C19 4 22 6 22 9 L22 11 L17 13 L22 14 L14 14 C12 12 12 7 16 5 Z" />
      {/* Eye */}
      <circle cx="20" cy="8" r="0.5" fill="currentColor" stroke="none" />
      {/* Wing */}
      <path d="M14 10 L4 4 L3 11 L12 14" />
      {/* Body */}
      <path d="M14 14 C12 17 11 20 12 22" />
      {/* Tail curl */}
      <path d="M12 20 C15 21 16 23 13 23" />
      {/* Hind leg */}
      <path d="M13 19 L11 22" />
    </svg>
  );
};
