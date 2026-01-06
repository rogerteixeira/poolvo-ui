import { HTMLAttributes, forwardRef, createElement } from 'react';
import { cn } from '../../utils/cn';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const headingBase = {
  fontFamily: 'var(--poolvo-font-sans)',
  fontWeight: 'var(--poolvo-font-weight-semibold)',
  lineHeight: 'var(--poolvo-line-height-tight)',
  letterSpacing: '-0.025em',
  color: 'var(--poolvo-fg)',
  margin: 0,
};

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, style, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('poolvo-h1', className)}
      style={{
        ...headingBase,
        fontSize: 'var(--poolvo-font-size-4xl)',
        ...style,
      }}
      {...props}
    />
  )
);

H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, style, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('poolvo-h2', className)}
      style={{
        ...headingBase,
        fontSize: 'var(--poolvo-font-size-3xl)',
        ...style,
      }}
      {...props}
    />
  )
);

H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, style, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('poolvo-h3', className)}
      style={{
        ...headingBase,
        fontSize: 'var(--poolvo-font-size-2xl)',
        ...style,
      }}
      {...props}
    />
  )
);

H3.displayName = 'H3';

interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold';
  muted?: boolean;
  as?: 'p' | 'span' | 'div';
}

const sizeMap = {
  xs: 'var(--poolvo-font-size-xs)',
  sm: 'var(--poolvo-font-size-sm)',
  base: 'var(--poolvo-font-size-base)',
  lg: 'var(--poolvo-font-size-lg)',
};

const weightMap = {
  normal: 'var(--poolvo-font-weight-normal)',
  medium: 'var(--poolvo-font-weight-medium)',
  semibold: 'var(--poolvo-font-weight-semibold)',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size = 'base',
      weight = 'normal',
      muted = false,
      className,
      style,
      ...props
    },
    ref
  ) =>
    createElement(as, {
      ref,
      className: cn('poolvo-text', className),
      style: {
        fontFamily: 'var(--poolvo-font-sans)',
        fontSize: sizeMap[size],
        fontWeight: weightMap[weight],
        lineHeight: 'var(--poolvo-line-height-normal)',
        color: muted ? 'var(--poolvo-muted-fg)' : 'var(--poolvo-fg)',
        margin: 0,
        ...style,
      },
      ...props,
    })
);

Text.displayName = 'Text';
