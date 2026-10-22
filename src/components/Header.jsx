import React from 'react';
import { 
  Plus, 
  Cpu, 
  BookOpen, 
  FolderGit2,
  Eye,
  EyeOff
} from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe dados estatísticos e manipuladores de eventos
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Progresso da sprint, estado do alternador de realce do Virtual DOM
 */
export default function Header({
  tasks = [],
  onOpenNewTaskModal,
  onOpenVdomModal,
  onOpenConceptsModal,
  highlightVdomUpdates,
  onToggleHighlight
}) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'concluido').length;
  const inProgress = tasks.filter((t) => t.status === 'em-progresso').length;
  const backlog = tasks.filter((t) => t.status === 'a-fazer').length;

  const completionPercentage = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <header
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '18px 24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Linha 1: Marca, Título e Botões de Ação Principal */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Logo e Nome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--orange-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
                boxShadow: 'var(--shadow-orange)'
              }}
            >
              <FolderGit2 size={26} strokeWidth={2.4} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}
                >
                  Dev<span style={{ color: 'var(--orange-primary)' }}>Flow</span>
                </h1>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: 'var(--orange-subtle)',
                    color: 'var(--orange-primary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--orange-glow)'
                  }}
                >
                  React 19 • 6 Conceitos
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Quadro Ágil com Demonstração Prática de Virtual DOM, JSX, Props & Listas
              </p>
            </div>
          </div>

          {/* Grupo de Botões */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {/* Botão de Guia dos 6 Conceitos */}
            <button
              onClick={onOpenConceptsModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-default)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--orange-primary)';
                e.currentTarget.style.color = 'var(--orange-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <BookOpen size={16} />
              6 Conceitos no Código
            </button>

            {/* Botão do Inspetor do Virtual DOM */}
            <button
              onClick={onOpenVdomModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--orange-primary)',
                backgroundColor: 'var(--orange-subtle)',
                border: '1px solid var(--orange-glow)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 107, 0, 0.22)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-subtle)')}
            >
              <Cpu size={16} />
              Inspetor Virtual DOM
            </button>

            {/* Alternador de Realce Visual do Virtual DOM */}
            <button
              onClick={onToggleHighlight}
              title="Ativar/Desativar realce visual quando nós do Virtual DOM são atualizados"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: highlightVdomUpdates ? 'var(--orange-primary)' : 'var(--text-muted)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: highlightVdomUpdates ? '1px solid var(--orange-primary)' : '1px solid var(--border-subtle)'
              }}
            >
              {highlightVdomUpdates ? <Eye size={15} /> : <EyeOff size={15} />}
              <span>Realce vDOM: {highlightVdomUpdates ? 'ON' : 'OFF'}</span>
            </button>

            {/* Botão Principal: Nova Tarefa */}
            <button
              onClick={onOpenNewTaskModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#000000',
                backgroundColor: 'var(--orange-primary)',
                boxShadow: 'var(--shadow-orange)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-primary)')}
            >
              <Plus size={18} strokeWidth={2.8} />
              Nova Tarefa
            </button>
          </div>
        </div>

        {/* Linha 2: Barra de Métricas e Progresso */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Métricas individuais */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total:</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {total}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A Fazer:</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {backlog}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff8c00' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Em Progresso:</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {inProgress}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Concluídas:</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-success)' }}>
                {done}
              </span>
            </div>
          </div>

          {/* Barra de Progresso da Sprint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Progresso: <strong style={{ color: 'var(--text-primary)' }}>{completionPercentage}%</strong>
            </span>
            <div
              style={{
                flex: 1,
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${completionPercentage}%`,
                  height: '100%',
                  backgroundColor: 'var(--orange-primary)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
