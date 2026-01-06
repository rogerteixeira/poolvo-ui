import { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'muted';
  size?: 'sm' | 'md';
}

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold';
  muted?: boolean;
  as?: 'p' | 'span' | 'div';
}

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right' | 'bottom';
  children: ReactNode;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export interface ToastProps {
  id: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  icon?: ReactNode;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
}

export interface BrandProps {
  size?: number;
  color?: string;
  className?: string;
}
