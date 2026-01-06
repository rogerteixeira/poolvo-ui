import { cn } from '../../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 14,
  md: 20,
  lg: 28,
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const dimension = sizeMap[size];

  return (
    <svg
      className={cn('poolvo-spinner', className)}
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'poolvo-spin 1s linear infinite',
      }}
      aria-label="Loading"
      role="status"
    >
      <style>
        {`
          @keyframes poolvo-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M12 2C6.48 2 2 6.48 2 12"
        stroke="var(--poolvo-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
