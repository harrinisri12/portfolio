import React from 'react';

/**
 * Shared Button Component
 * Standardized across the portfolio to ensure theme-aware consistency
 * 
 * Variants:
 * - 'primary' (default): Solid in light mode, sleek dark card with border & terracotta hover in dark mode
 * - 'secondary': Outlined button matching border and theme tokens
 * - 'ghost': Transparent button with muted text and card hover
 * - 'accent': Terracotta accent button
 * - 'icon': Compact padding for icon triggers
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    accent: 'btn-accent',
    icon: 'btn-icon',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-xs font-semibold rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-sm font-semibold rounded-xl gap-2',
    icon: 'p-2 rounded-lg',
  };

  const selectedVariant = variantClasses[variant] || variantClasses.primary;
  const selectedSize = variant === 'icon' ? sizeClasses.icon : (sizeClasses[size] || sizeClasses.md);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${selectedVariant} ${selectedSize} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
