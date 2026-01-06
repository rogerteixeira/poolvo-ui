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

interface DialogContextValue {
  open: boolean;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog.Root');
  }
  return context;
}

export interface DialogRootProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function DialogRoot({ open, onClose, children }: DialogRootProps) {
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
    <DialogContext.Provider value={{ open, onClose }}>
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {}

function DialogOverlay({ className, style, ...props }: DialogOverlayProps) {
  const { onClose } = useDialogContext();

  return createPortal(
    <div
      className={cn('poolvo-dialog-overlay', className)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 'var(--poolvo-z-modal)',
        animation: 'poolvo-fade-in 150ms ease',
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
          @keyframes poolvo-scale-in {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `}
      </style>
    </div>,
    document.body
  );
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {}

function DialogContent({ className, style, children, ...props }: DialogContentProps) {
  const { onClose } = useDialogContext();
  const focusTrapRef = useFocusTrap<HTMLDivElement>(true);

  useEscapeKey(onClose, true);

  return createPortal(
    <div
      ref={focusTrapRef}
      role="dialog"
      aria-modal="true"
      className={cn('poolvo-dialog-content', className)}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '85vh',
        backgroundColor: 'var(--poolvo-bg)',
        borderRadius: 'var(--poolvo-radius-lg)',
        boxShadow: 'var(--poolvo-shadow-xl)',
        zIndex: 'calc(var(--poolvo-z-modal) + 1)',
        overflow: 'auto',
        animation: 'poolvo-scale-in 150ms ease',
        outline: 'none',
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

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

function DialogHeader({ className, style, children, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn('poolvo-dialog-header', className)}
      style={{
        padding: 'var(--poolvo-spacing-6)',
        paddingBottom: 'var(--poolvo-spacing-4)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

function DialogTitle({ className, style, children, ...props }: DialogTitleProps) {
  return (
    <h2
      className={cn('poolvo-dialog-title', className)}
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

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {}

function DialogBody({ className, style, children, ...props }: DialogBodyProps) {
  return (
    <div
      className={cn('poolvo-dialog-body', className)}
      style={{
        padding: '0 var(--poolvo-spacing-6)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

function DialogFooter({ className, style, children, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn('poolvo-dialog-footer', className)}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 'var(--poolvo-spacing-3)',
        padding: 'var(--poolvo-spacing-6)',
        paddingTop: 'var(--poolvo-spacing-4)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {}

function DialogClose({ className, style, children, ...props }: DialogCloseProps) {
  const { onClose } = useDialogContext();

  return (
    <button
      type="button"
      className={cn('poolvo-dialog-close', className)}
      style={{
        position: 'absolute',
        top: 'var(--poolvo-spacing-4)',
        right: 'var(--poolvo-spacing-4)',
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
        ...style,
      }}
      onClick={onClose}
      aria-label="Close dialog"
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

export const Dialog = {
  Root: DialogRoot,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};
