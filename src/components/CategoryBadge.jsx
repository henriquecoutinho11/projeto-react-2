import React from 'react';
import { Code, Server, Palette, Terminal, Zap, CheckCircle2 } from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe a prop 'category'
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Ícone condicional de acordo com a categoria
 */
export default function CategoryBadge({ category }) {
  const getIcon = () => {
    switch (category) {
      case 'Frontend':
        return <Code size={12} />;
      case 'Backend':
        return <Server size={12} />;
      case 'Design':
        return <Palette size={12} />;
      case 'DevOps':
        return <Terminal size={12} />;
      case 'Performance':
        return <Zap size={12} />;
      case 'QA':
        return <CheckCircle2 size={12} />;
      default:
        return null;
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.72rem',
        fontWeight: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      {getIcon()}
      {category}
    </span>
  );
}
