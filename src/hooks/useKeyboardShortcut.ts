import { useEffect, useCallback } from 'react';

interface ShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  options: ShortcutOptions,
  callback: () => void,
  enabled: boolean = true
): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const {
        key,
        ctrlKey = false,
        metaKey = false,
        shiftKey = false,
        altKey = false,
        preventDefault = true,
      } = options;

      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      const ctrlMatches = ctrlKey ? event.ctrlKey : !event.ctrlKey;
      const metaMatches = metaKey ? event.metaKey : !event.metaKey;
      const shiftMatches = shiftKey ? event.shiftKey : !event.shiftKey;
      const altMatches = altKey ? event.altKey : !event.altKey;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;
      const cmdOrCtrlMatches = (ctrlKey || metaKey) ? cmdOrCtrl : true;

      if (keyMatches && (ctrlKey || metaKey ? cmdOrCtrlMatches : (ctrlMatches && metaMatches)) && shiftMatches && altMatches) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    },
    [options, callback]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}

export function useEscapeKey(callback: () => void, enabled: boolean = true): void {
  useKeyboardShortcut({ key: 'Escape', preventDefault: false }, callback, enabled);
}
