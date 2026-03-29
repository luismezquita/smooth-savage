import React from 'react';

export const StrawberryIcon = ({ size = 24, strokeWidth = 2, className = '', ...props }) => {
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
      {/* Body of strawberry */}
      <path d="M12 22C16 22 20 14 20 8C20 6.5 18 5 15 5C12 5 12 7 12 7C12 7 12 5 9 5C6 5 4 6.5 4 8C4 14 8 22 12 22Z" />
      
      {/* Leaves */}
      <path d="M12 7V4M12 4L15 2M12 4L9 2" />
      
      {/* Seeds */}
      <path d="M10 10V10.01M14 10V10.01M12 14V14.01M9 16V16.01M15 16V16.01" />
    </svg>
  );
};
