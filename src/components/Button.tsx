import type { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'button' | 'submit';
}

export function Button({ children, variant = 'primary', onClick, style, type = 'button' }: ButtonProps) {
  const base = 'py-2 active:scale-95 px-6 rounded-lg font-body text-sm font-semibold cursor-pointer transition-all duration-200 border-none inline-flex items-center gap-2';

  const variants: Record<string, string> = {
    primary: 'bg-primary text-white',
    secondary: 'bg-transparent text-primary border border-primary',
    ghost: 'bg-transparent text-muted',
  };

  return (
    <button
      type={type}
      className={`btn btn--${variant} ${base} ${variants[variant]}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
