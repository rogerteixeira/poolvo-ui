import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'muted';
  size?: 'sm' | 'md';
}

const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'var(--poolvo-font-sans)',
  fontWeight: 'var(--poolvo-font-weight-medium)',
  lineHeight: 1,
  borderRadius: 'var(--poolvo-radius-full)',
  whiteSpace: 'nowrap' as const,
};

const sizeStyles = {
  sm: {
    height: '20px',
    padding: '0 var(--poolvo-spacing-2)',
    fontSize: 'var(--poolvo-font-size-xs)',
  },
  md: {
    height: '24px',
    padding: '0 var(--poolvo-spacing-2-5)',
    fontSize: 'var(--poolvo-font-size-xs)',
  },
};

const variantStyles = {
  default: {
    backgroundColor: 'var(--poolvo-fg)',
    color: 'var(--poolvo-bg)',
    border: '1px solid transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--poolvo-fg)',
    border: '1px solid var(--poolvo-border-strong)',
  },
  muted: {
    backgroundColor: 'var(--poolvo-muted)',
    color: 'var(--poolvo-muted-fg)',
    border: '1px solid transparent',
  },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'sm',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn('poolvo-badge', `poolvo-badge--${variant}`, `poolvo-badge--${size}`, className)}
        style={{
          ...baseStyles,
          ...sizeStyles[size],
          ...variantStyles[variant],
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
