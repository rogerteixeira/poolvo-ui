import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

interface Toast {
  id: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return {
    toast: context.addToast,
    dismiss: context.removeToast,
  };
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionStyles: Record<string, React.CSSProperties> = {
  'top-right': { top: 'var(--poolvo-spacing-4)', right: 'var(--poolvo-spacing-4)' },
  'top-left': { top: 'var(--poolvo-spacing-4)', left: 'var(--poolvo-spacing-4)' },
  'bottom-right': { bottom: 'var(--poolvo-spacing-4)', right: 'var(--poolvo-spacing-4)' },
  'bottom-left': { bottom: 'var(--poolvo-spacing-4)', left: 'var(--poolvo-spacing-4)' },
  'top-center': { top: 'var(--poolvo-spacing-4)', left: '50%', transform: 'translateX(-50%)' },
  'bottom-center': { bottom: 'var(--poolvo-spacing-4)', left: '50%', transform: 'translateX(-50%)' },
};

export function ToastProvider({ children, position = 'bottom-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, duration: number = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className="poolvo-toast-container"
            style={{
              position: 'fixed',
              zIndex: 'var(--poolvo-z-toast)',
              display: 'flex',
              flexDirection: position.startsWith('top') ? 'column' : 'column-reverse',
              gap: 'var(--poolvo-spacing-2)',
              ...positionStyles[position],
            }}
          >
            <style>
              {`
                @keyframes poolvo-toast-in {
                  from { opacity: 0; transform: translateY(8px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes poolvo-toast-out {
                  from { opacity: 1; transform: translateY(0); }
                  to { opacity: 0; transform: translateY(-8px); }
                }
              `}
            </style>
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 150);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 150);
  };

  return (
    <div
      className={cn('poolvo-toast', isExiting && 'poolvo-toast--exiting')}
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--poolvo-spacing-3)',
        minWidth: '280px',
        maxWidth: '400px',
        padding: 'var(--poolvo-spacing-3) var(--poolvo-spacing-4)',
        backgroundColor: 'var(--poolvo-fg)',
        color: 'var(--poolvo-bg)',
        borderRadius: 'var(--poolvo-radius-md)',
        boxShadow: 'var(--poolvo-shadow-lg)',
        fontFamily: 'var(--poolvo-font-sans)',
        fontSize: 'var(--poolvo-font-size-sm)',
        lineHeight: 'var(--poolvo-line-height-normal)',
        animation: isExiting ? 'poolvo-toast-out 150ms ease forwards' : 'poolvo-toast-in 150ms ease',
      }}
    >
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        type="button"
        onClick={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          padding: 0,
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: 'var(--poolvo-radius-sm)',
          cursor: 'pointer',
          color: 'inherit',
          opacity: 0.7,
          transition: 'opacity var(--poolvo-transition-fast)',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--poolvo-bg), 0 0 0 4px var(--poolvo-accent)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.opacity = '0.7';
          e.currentTarget.style.boxShadow = '';
        }}
        aria-label="Dismiss"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M9 3L3 9M3 3l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
