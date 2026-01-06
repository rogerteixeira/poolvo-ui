import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--poolvo-spacing-2)',
  fontFamily: 'var(--poolvo-font-sans)',
  fontWeight: 'var(--poolvo-font-weight-medium)',
  lineHeight: 1,
  borderRadius: 'var(--poolvo-radius-md)',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all var(--poolvo-transition-fast)',
  outline: 'none',
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
};

const sizeStyles = {
  sm: {
    height: '32px',
    padding: '0 var(--poolvo-spacing-3)',
    fontSize: 'var(--poolvo-font-size-sm)',
  },
  md: {
    height: '40px',
    padding: '0 var(--poolvo-spacing-4)',
    fontSize: 'var(--poolvo-font-size-sm)',
  },
  lg: {
    height: '48px',
    padding: '0 var(--poolvo-spacing-6)',
    fontSize: 'var(--poolvo-font-size-base)',
  },
};

const variantStyles = {
  primary: {
    backgroundColor: 'var(--poolvo-fg)',
    color: 'var(--poolvo-bg)',
    borderColor: 'var(--poolvo-fg)',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--poolvo-fg)',
    borderColor: 'var(--poolvo-border-strong)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--poolvo-fg)',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: 'var(--poolvo-fg)',
    color: 'var(--poolvo-bg)',
    borderColor: 'var(--poolvo-fg)',
  },
};

const hoverStyles = {
  primary: { opacity: 0.9 },
  secondary: { backgroundColor: 'var(--poolvo-muted)' },
  ghost: { backgroundColor: 'var(--poolvo-muted)' },
  danger: { opacity: 0.9 },
};

const disabledStyles = {
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none' as const,
};

const focusStyles = {
  boxShadow: '0 0 0 2px var(--poolvo-bg), 0 0 0 4px var(--poolvo-accent)',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      style,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn('poolvo-button', `poolvo-button--${variant}`, `poolvo-button--${size}`, className)}
        disabled={isDisabled}
        style={{
          ...baseStyles,
          ...sizeStyles[size],
          ...variantStyles[variant],
          ...(isDisabled ? disabledStyles : {}),
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            const target = e.currentTarget;
            Object.assign(target.style, hoverStyles[variant]);
          }
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            const target = e.currentTarget;
            Object.assign(target.style, variantStyles[variant]);
          }
          onMouseLeave?.(e);
        }}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, focusStyles);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '';
          onBlur?.(e);
        }}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span style={{ opacity: 0.7 }}>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
