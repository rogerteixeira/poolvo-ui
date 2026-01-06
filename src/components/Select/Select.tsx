import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
}

const baseStyles = {
  display: 'block',
  width: '100%',
  fontFamily: 'var(--poolvo-font-sans)',
  fontSize: 'var(--poolvo-font-size-sm)',
  lineHeight: 'var(--poolvo-line-height-normal)',
  color: 'var(--poolvo-fg)',
  backgroundColor: 'var(--poolvo-bg)',
  border: '1px solid var(--poolvo-border-strong)',
  borderRadius: 'var(--poolvo-radius-md)',
  outline: 'none',
  transition: 'all var(--poolvo-transition-fast)',
  cursor: 'pointer',
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B6B6B' d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
};

const sizeStyles = {
  sm: {
    height: '32px',
    padding: '0 var(--poolvo-spacing-8) 0 var(--poolvo-spacing-2)',
  },
  md: {
    height: '40px',
    padding: '0 var(--poolvo-spacing-8) 0 var(--poolvo-spacing-3)',
  },
  lg: {
    height: '48px',
    padding: '0 var(--poolvo-spacing-10) 0 var(--poolvo-spacing-4)',
  },
};

const focusStyles = {
  borderColor: 'var(--poolvo-accent)',
  boxShadow: '0 0 0 2px var(--poolvo-bg), 0 0 0 4px var(--poolvo-accent)',
};

const errorStyles = {
  borderColor: 'var(--poolvo-fg)',
  boxShadow: '0 0 0 1px var(--poolvo-fg)',
};

const disabledStyles = {
  opacity: 0.5,
  cursor: 'not-allowed',
  backgroundColor: 'var(--poolvo-muted)',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      error = false,
      disabled,
      className,
      style,
      onFocus,
      onBlur,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        className={cn('poolvo-select', `poolvo-select--${size}`, error && 'poolvo-select--error', className)}
        disabled={disabled}
        style={{
          ...baseStyles,
          ...sizeStyles[size],
          ...(error ? errorStyles : {}),
          ...(disabled ? disabledStyles : {}),
          ...style,
        }}
        onFocus={(e) => {
          if (!error) {
            Object.assign(e.currentTarget.style, focusStyles);
          }
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = error ? errorStyles.boxShadow : '';
          e.currentTarget.style.borderColor = error ? errorStyles.borderColor : 'var(--poolvo-border-strong)';
          onBlur?.(e);
        }}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
