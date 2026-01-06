import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: boolean;
}

const baseStyles = {
  display: 'block',
  width: '100%',
  minHeight: '80px',
  padding: 'var(--poolvo-spacing-3)',
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      resize = true,
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
      <textarea
        ref={ref}
        className={cn('poolvo-textarea', error && 'poolvo-textarea--error', className)}
        disabled={disabled}
        style={{
          ...baseStyles,
          resize: resize ? 'vertical' : 'none',
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

Textarea.displayName = 'Textarea';
