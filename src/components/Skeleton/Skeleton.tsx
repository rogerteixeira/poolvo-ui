import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = '20px',
      rounded = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('poolvo-skeleton', className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          backgroundColor: 'var(--poolvo-muted)',
          borderRadius: rounded ? 'var(--poolvo-radius-full)' : 'var(--poolvo-radius-md)',
          animation: 'poolvo-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          ...style,
        }}
        aria-hidden="true"
        {...props}
      >
        <style>
          {`
            @keyframes poolvo-pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';
