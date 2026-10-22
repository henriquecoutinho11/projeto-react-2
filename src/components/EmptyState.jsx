import React from 'react';
import { Inbox } from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe 'title', 'description' e opcionalmente 'actionLabel' / 'onAction'
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Exibe botão de ação somente se 'onAction' for informado via curto-circuito (&&)
 */
export default function EmptyState({ title = "Nenhuma tarefa", description = "Nada encontrado nesta coluna.", actionLabel, onAction }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 16px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.015)',
        borderRadius: 'var(--radius-md)',
        border: '1px dashed var(--border-default)',
        color: 'var(--text-muted)'
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 107, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          color: 'var(--orange-primary)'
        }}
      >
        <Inbox size={20} />
      </div>

      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
        {title}
      </h4>

      <p style={{ fontSize: '0.8rem', maxWidth: '220px', lineHeight: 1.4 }}>
        {description}
      </p>

      {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL usando operador lógico && */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: '12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--orange-primary)',
            background: 'var(--orange-subtle)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--orange-glow)'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
