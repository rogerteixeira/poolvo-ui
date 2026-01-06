import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardShortcut, useEscapeKey } from '../../hooks/useKeyboardShortcut';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  icon?: ReactNode;
}

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  return context;
}

export interface CommandPaletteProviderProps {
  children: ReactNode;
  items: CommandItem[];
  placeholder?: string;
}

export function CommandPaletteProvider({
  children,
  items,
  placeholder = 'Search commands...',
}: CommandPaletteProviderProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useFocusTrap<HTMLDivElement>(open);

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  useKeyboardShortcut(
    { key: 'k', metaKey: true },
    () => setOpen(true),
    !open
  );

  useKeyboardShortcut(
    { key: 'k', ctrlKey: true },
    () => setOpen(true),
    !open
  );

  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    if (open) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (event.key === 'Enter' && filteredItems[selectedIndex]) {
        event.preventDefault();
        filteredItems[selectedIndex].action();
        setOpen(false);
      }
    },
    [filteredItems, selectedIndex]
  );

  useEffect(() => {
    const selectedElement = listRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div
              className="poolvo-command-palette-overlay"
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#00000080',
                zIndex: 'var(--poolvo-z-modal)',
                animation: 'poolvo-fade-in 100ms ease',
              }}
              onClick={() => setOpen(false)}
            >
              <style>
                {`
                  @keyframes poolvo-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  @keyframes poolvo-command-in {
                    from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                  }
                `}
              </style>
            </div>
            <div
              ref={focusTrapRef}
              className="poolvo-command-palette"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '560px',
                maxHeight: '400px',
                backgroundColor: 'var(--poolvo-bg)',
                borderRadius: 'var(--poolvo-radius-lg)',
                boxShadow: 'var(--poolvo-shadow-xl)',
                zIndex: 'calc(var(--poolvo-z-modal) + 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                animation: 'poolvo-command-in 150ms ease',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'var(--poolvo-spacing-3) var(--poolvo-spacing-4)',
                  borderBottom: '1px solid var(--poolvo-border)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginRight: 'var(--poolvo-spacing-3)', color: 'var(--poolvo-muted-fg)' }}
                >
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--poolvo-font-sans)',
                    fontSize: 'var(--poolvo-font-size-sm)',
                    color: 'var(--poolvo-fg)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px var(--poolvo-bg), 0 0 0 4px var(--poolvo-accent)';
                    e.currentTarget.style.borderRadius = 'var(--poolvo-radius-sm)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                  aria-autocomplete="list"
                  aria-controls="command-list"
                  aria-activedescendant={filteredItems[selectedIndex]?.id}
                />
                <kbd
                  style={{
                    padding: '2px 6px',
                    backgroundColor: 'var(--poolvo-muted)',
                    borderRadius: 'var(--poolvo-radius-sm)',
                    fontFamily: 'var(--poolvo-font-sans)',
                    fontSize: 'var(--poolvo-font-size-xs)',
                    color: 'var(--poolvo-muted-fg)',
                  }}
                >
                  esc
                </kbd>
              </div>
              <div
                ref={listRef}
                id="command-list"
                role="listbox"
                style={{
                  flex: 1,
                  overflow: 'auto',
                  padding: 'var(--poolvo-spacing-2)',
                }}
              >
                {filteredItems.length === 0 ? (
                  <div
                    style={{
                      padding: 'var(--poolvo-spacing-8) var(--poolvo-spacing-4)',
                      textAlign: 'center',
                      color: 'var(--poolvo-muted-fg)',
                      fontFamily: 'var(--poolvo-font-sans)',
                      fontSize: 'var(--poolvo-font-size-sm)',
                    }}
                  >
                    No results found
                  </div>
                ) : (
                  filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      id={item.id}
                      role="option"
                      aria-selected={index === selectedIndex}
                      className={cn(
                        'poolvo-command-item',
                        index === selectedIndex && 'poolvo-command-item--selected'
                      )}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--poolvo-spacing-3)',
                        padding: 'var(--poolvo-spacing-2-5) var(--poolvo-spacing-3)',
                        borderRadius: 'var(--poolvo-radius-md)',
                        cursor: 'pointer',
                        backgroundColor: index === selectedIndex ? 'var(--poolvo-muted)' : 'transparent',
                        transition: 'background-color var(--poolvo-transition-fast)',
                      }}
                      onClick={() => {
                        item.action();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {item.icon && (
                        <span style={{ color: 'var(--poolvo-muted-fg)', display: 'flex' }}>
                          {item.icon}
                        </span>
                      )}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: 'var(--poolvo-font-sans)',
                            fontSize: 'var(--poolvo-font-size-sm)',
                            fontWeight: 'var(--poolvo-font-weight-medium)',
                            color: 'var(--poolvo-fg)',
                          }}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div
                            style={{
                              fontFamily: 'var(--poolvo-font-sans)',
                              fontSize: 'var(--poolvo-font-size-xs)',
                              color: 'var(--poolvo-muted-fg)',
                              marginTop: '2px',
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </CommandPaletteContext.Provider>
  );
}
