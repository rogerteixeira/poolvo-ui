import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  HTMLAttributes,
  KeyboardEvent,
  useRef,
} from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs.Root');
  }
  return context;
}

export interface TabsRootProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

function TabsRoot({ defaultValue, value, onValueChange, children }: TabsRootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: currentValue, onChange: handleChange }}>
      <div className="poolvo-tabs">{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

function TabsList({ className, style, children, ...props }: TabsListProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (!tabs) return;

    const tabArray = Array.from(tabs);
    const currentIndex = tabArray.findIndex((tab) => tab === document.activeElement);

    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = currentIndex < tabArray.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabArray.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = tabArray.length - 1;
    }

    if (nextIndex !== currentIndex) {
      tabArray[nextIndex].focus();
    }
  };

  return (
    <div
      ref={tabsRef}
      role="tablist"
      className={cn('poolvo-tabs-list', className)}
      style={{
        display: 'flex',
        gap: 'var(--poolvo-spacing-1)',
        borderBottom: '1px solid var(--poolvo-border)',
        ...style,
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

function TabsTrigger({ value, disabled, className, style, children, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onChange } = useTabsContext();
  const isSelected = selectedValue === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className={cn('poolvo-tabs-trigger', isSelected && 'poolvo-tabs-trigger--selected', className)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--poolvo-spacing-2) var(--poolvo-spacing-4)',
        fontFamily: 'var(--poolvo-font-sans)',
        fontSize: 'var(--poolvo-font-size-sm)',
        fontWeight: 'var(--poolvo-font-weight-medium)',
        color: isSelected ? 'var(--poolvo-fg)' : 'var(--poolvo-muted-fg)',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${isSelected ? 'var(--poolvo-fg)' : 'transparent'}`,
        marginBottom: '-1px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--poolvo-transition-fast)',
        outline: 'none',
        ...style,
      }}
      onClick={() => !disabled && onChange(value)}
      onFocus={(e) => {
        e.currentTarget.style.color = 'var(--poolvo-fg)';
      }}
      onBlur={(e) => {
        if (!isSelected) {
          e.currentTarget.style.color = 'var(--poolvo-muted-fg)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsPanel({ value, className, style, children, ...props }: TabsPanelProps) {
  const { value: selectedValue } = useTabsContext();
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      id={`panel-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn('poolvo-tabs-panel', className)}
      style={{
        padding: 'var(--poolvo-spacing-4) 0',
        outline: 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
};
