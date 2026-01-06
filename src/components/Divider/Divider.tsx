import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, style, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';

    return (
      <hr
        ref={ref}
        className={cn('poolvo-divider', className)}
        style={{
          border: 'none',
          margin: 0,
          flexShrink: 0,
          backgroundColor: 'var(--poolvo-border)',
          ...(isHorizontal
            ? { height: '1px', width: '100%' }
            : { width: '1px', height: '100%', alignSelf: 'stretch' }),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
