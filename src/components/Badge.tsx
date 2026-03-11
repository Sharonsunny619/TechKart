interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  success: { bg: '#dcfce7', text: '#166534' },
  warning: { bg: '#fef3c7', text: '#92400e' },
  danger: { bg: '#fee2e2', text: '#991b1b' },
};

export function Badge({ text, variant = 'default' }: BadgeProps) {
  const isDefault = variant === 'default';
  const colors = BADGE_COLORS[variant];

  return (
    <span
      className={`inline-block whitespace-nowrap px-2 py-1 rounded-full text-xs font-semibold ${isDefault ? 'bg-primary/10 text-primary' : ''}`}
      style={!isDefault && colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
    >
      {text}
    </span>
  );
}
