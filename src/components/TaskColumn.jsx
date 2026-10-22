import React from 'react';
import { Plus, ListFilter } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

/**
 * CONCEITO 2: COMPONENTS - Componente coluna que agrupa tarefas por status
 * CONCEITO 3: PROPS - Recebe 'column', 'tasks', funções de callback 'onMove', 'onDelete', 'onEdit'
 * CONCEITO 5: LISTAS E KEYS - Utiliza .map() com a propriedade essencial 'key={task.id}'
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Renderiza EmptyState se não houver tarefas na coluna
 */
export default function TaskColumn({
  column,
  tasks,
  onMove,
  onDelete,
  onEdit,
  onQuickAdd,
  highlightVdomUpdates
}) {
  const { id, title, description, color } = column;

  return (
    <section
      style={{
        flex: 1,
        minWidth: '320px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 220px)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Cabeçalho da Coluna com indicador de cor e contagem */}
      <header
        style={{
          padding: '16px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-secondary)',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          zIndex: 1
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {title}
              </h2>
              {/* Contador de itens na coluna */}
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-secondary)'
                }}
              >
                {tasks.length}
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {description}
            </p>
          </div>
        </div>

        {/* Botão de Adição Rápida nesta coluna */}
        {onQuickAdd && (
          <button
            onClick={() => onQuickAdd(id)}
            title={`Adicionar tarefa em ${title}`}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--orange-primary)';
              e.currentTarget.style.borderColor = 'var(--orange-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <Plus size={16} />
          </button>
        )}
      </header>

      {/* Lista de Cards da Coluna */}
      <div
        style={{
          padding: '14px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1
        }}
      >
        {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL */}
        {tasks.length === 0 ? (
          <EmptyState
            title="Coluna vazia"
            description={`Não há tarefas no status "${title}".`}
            actionLabel={onQuickAdd ? "+ Criar Tarefa" : null}
            onAction={onQuickAdd ? () => onQuickAdd(id) : null}
          />
        ) : (
          /* CONCEITO 5: LISTAS E KEYS
             O método .map() itera sobre o array de tarefas.
             A prop 'key={task.id}' informa ao algoritmo de reconciliação do Virtual DOM
             qual elemento é qual, permitindo atualizações cirúrgicas e hiper eficientes. */
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
              onEdit={onEdit}
              highlightVdomUpdates={highlightVdomUpdates}
            />
          ))
        )}
      </div>
    </section>
  );
}
