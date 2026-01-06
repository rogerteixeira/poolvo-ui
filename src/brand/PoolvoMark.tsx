import { BrandProps } from '../utils/types';

export function PoolvoMark({
  size = 32,
  color = 'currentColor',
  className
}: BrandProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Poolvo"
      role="img"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="6"
        fill={color}
        fillOpacity="0.1"
      />
      <path
        d="M8 22V10h5.4c1.2 0 2.2.2 3 .6.8.4 1.5 1 1.9 1.8.4.8.6 1.7.6 2.7 0 1-.2 1.9-.6 2.7-.4.8-1.1 1.4-1.9 1.8-.8.4-1.8.6-3 .6h-2.7V22H8zm2.7-5.4h2.5c.9 0 1.6-.2 2-.7.4-.4.6-1 .6-1.8 0-.8-.2-1.4-.6-1.8-.4-.5-1.1-.7-2-.7h-2.5v5z"
        fill={color}
      />
    </svg>
  );
}
