import React from 'react';

interface IconBaseProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Wrapper for the hand-built Ocean Luxe icon set.
 * Thin-line style: no fill, 1.5px stroke, round caps — drawn on a 48x48 grid.
 * Color comes from `currentColor`, so size/color are set via className
 * (e.g. className="w-12 h-12 text-brand-gold").
 */
export default function IconBase({ className = 'w-6 h-6', children }: IconBaseProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
