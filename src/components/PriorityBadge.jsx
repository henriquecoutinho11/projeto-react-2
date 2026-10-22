import React from 'react';
import { AlertCircle, Clock, ShieldCheck } from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe a propriedade 'priority' ('Alta' | 'Média' | 'Baixa')
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Exibe cores e ícones diferentes conforme a prioridade
 */
export default function PriorityBadge({ priority }) {
  // Lógica de renderização condicional baseada na prop
  const getBadgeConfig = () => {
    switch (priority) {
      case 'Alta':
        return {
          bg: 'rgba(239, 68, 68, 0.16)',
          color: '#f87171',
          border: 'rgba(239, 68, 68, 0.35)',
          icon: <AlertCircle size={12} strokeWidth={2.5} />
        };
      case 'Média':
        return {
          bg: 'rgba(255, 107, 0, 0.18)',
          color: '#ff8533',
          border: 'rgba(255, 107, 0, 0.4)',
          icon: <Clock size={12} strokeWidth={2.5} />
        };
      case 'Baixa':
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.16)',
          color: '#34d399',
          border: 'rgba(16, 185, 129, 0.35)',
          icon: <ShieldCheck size={12} strokeWidth={2.5} />
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`
      }}
    >
      {config.icon}
      {priority}
    </span>
  );
}
