import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '0',
  sm: 'var(--poolvo-spacing-3)',
  md: 'var(--poolvo-spacing-4)',
  lg: 'var(--poolvo-spacing-6)',
};

const shadowMap = {
  none: 'var(--poolvo-shadow-none)',
  sm: 'var(--poolvo-shadow-sm)',
  md: 'var(--poolvo-shadow-md)',
  lg: 'var(--poolvo-shadow-lg)',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      shadow = 'sm',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('poolvo-card', className)}
        style={{
          backgroundColor: 'var(--poolvo-bg)',
          border: '1px solid var(--poolvo-border)',
          borderRadius: 'var(--poolvo-radius-lg)',
          padding: paddingMap[padding],
          boxShadow: shadowMap[shadow],
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
