import {
  createContext,
  useContext,
  ReactNode,
  HTMLAttributes,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useEscapeKey } from '../../hooks/useKeyboardShortcut';

interface DrawerContextValue {
  open: boolean;
  onClose: () => void;
  side: 'left' | 'right' | 'bottom';
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer.Root');
  }
  return context;
}

export interface DrawerRootProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right' | 'bottom';
  children: ReactNode;
}

function DrawerRoot({ open, onClose, side = 'right', children }: DrawerRootProps) {
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <DrawerContext.Provider value={{ open, onClose, side }}>
      {children}
    </DrawerContext.Provider>
  );
}

export interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {}

function DrawerOverlay({ className, style, ...props }: DrawerOverlayProps) {
  const { onClose } = useDrawerContext();

  return createPortal(
    <div
      className={cn('poolvo-drawer-overlay', className)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#00000080',
        zIndex: 'var(--poolvo-z-modal)',
        animation: 'poolvo-fade-in 200ms ease',
        ...style,
      }}
      onClick={onClose}
      aria-hidden="true"
      {...props}
    >
      <style>
        {`
          @keyframes poolvo-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes poolvo-slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes poolvo-slide-in-left {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes poolvo-slide-in-bottom {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </div>,
    document.body
  );
}

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: '320px',
  md: '400px',
  lg: '560px',
};

function DrawerContent({ size = 'md', className, style, children, ...props }: DrawerContentProps) {
  const { onClose, side } = useDrawerContext();
  const focusTrapRef = useFocusTrap<HTMLDivElement>(true);

  useEscapeKey(onClose, true);

  const positionStyles: Record<string, React.CSSProperties> = {
    right: {
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: sizeMap[size],
      animation: 'poolvo-slide-in-right 200ms ease',
    },
    left: {
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      maxWidth: sizeMap[size],
      animation: 'poolvo-slide-in-left 200ms ease',
    },
    bottom: {
      left: 0,
      right: 0,
      bottom: 0,
      height: 'auto',
      maxHeight: '85vh',
      animation: 'poolvo-slide-in-bottom 200ms ease',
    },
  };

  return createPortal(
    <div
      ref={focusTrapRef}
      role="dialog"
      aria-modal="true"
      className={cn('poolvo-drawer-content', className)}
      style={{
        position: 'fixed',
        backgroundColor: 'var(--poolvo-bg)',
        boxShadow: 'var(--poolvo-shadow-xl)',
        zIndex: 'calc(var(--poolvo-z-modal) + 1)',
        overflow: 'auto',
        outline: 'none',
        ...positionStyles[side],
        ...style,
      }}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}

function DrawerHeader({ className, style, children, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn('poolvo-drawer-header', className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--poolvo-spacing-4) var(--poolvo-spacing-6)',
        borderBottom: '1px solid var(--poolvo-border)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function DrawerTitle({ className, style, children, ...props }: DrawerTitleProps) {
  return (
    <h2
      className={cn('poolvo-drawer-title', className)}
      style={{
        margin: 0,
        fontFamily: 'var(--poolvo-font-sans)',
        fontSize: 'var(--poolvo-font-size-lg)',
        fontWeight: 'var(--poolvo-font-weight-semibold)',
        lineHeight: 'var(--poolvo-line-height-tight)',
        color: 'var(--poolvo-fg)',
        ...style,
      }}
      {...props}
    >
      {children}
    </h2>
  );
}

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {}

function DrawerBody({ className, style, children, ...props }: DrawerBodyProps) {
  return (
    <div
      className={cn('poolvo-drawer-body', className)}
      style={{
        flex: 1,
        padding: 'var(--poolvo-spacing-6)',
        overflow: 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}

function DrawerFooter({ className, style, children, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn('poolvo-drawer-footer', className)}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 'var(--poolvo-spacing-3)',
        padding: 'var(--poolvo-spacing-4) var(--poolvo-spacing-6)',
        borderTop: '1px solid var(--poolvo-border)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {}

function DrawerClose({ className, style, children, ...props }: DrawerCloseProps) {
  const { onClose } = useDrawerContext();

  return (
    <button
      type="button"
      className={cn('poolvo-drawer-close', className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'var(--poolvo-radius-md)',
        cursor: 'pointer',
        color: 'var(--poolvo-muted-fg)',
        transition: 'all var(--poolvo-transition-fast)',
        outline: 'none',
        ...style,
      }}
      onClick={onClose}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 2px var(--poolvo-bg), 0 0 0 4px var(--poolvo-accent)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = '';
      }}
      aria-label="Close drawer"
      {...props}
    >
      {children || (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

export const Drawer = {
  Root: DrawerRoot,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
};
