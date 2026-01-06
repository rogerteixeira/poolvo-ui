import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
};

const sizeStyles = {
  sm: {
    height: '32px',
    padding: '0 var(--poolvo-spacing-2)',
  },
  md: {
    height: '40px',
    padding: '0 var(--poolvo-spacing-3)',
  },
  lg: {
    height: '48px',
    padding: '0 var(--poolvo-spacing-4)',
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      disabled,
      className,
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={cn('poolvo-input', `poolvo-input--${size}`, error && 'poolvo-input--error', className)}
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
      />
    );
  }
);

Input.displayName = 'Input';
