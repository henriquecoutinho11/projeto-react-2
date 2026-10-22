import React, { useRef, useEffect, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  Calendar, 
  User, 
  Cpu, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';

/**
 * CONCEITO 1: JSX - Sintaxe expressiva mesclando marcação e lógica JS
 * CONCEITO 2: COMPONENTS - Componente independente e reutilizável para cada tarefa
 * CONCEITO 3: PROPS - Recebe 'task', 'onMove', 'onDelete', 'onEdit' e 'highlightVdomUpdates'
 * CONCEITO 4: VIRTUAL DOM - Utiliza 'useRef' para monitorar o número de re-renderizações que o Virtual DOM calculou para este nó específico
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Botoes de avançar/voltar, estados de 'concluído', alertas de prazo
 */
export default function TaskCard({ 
  task, 
  onMove, 
  onDelete, 
  onEdit, 
  highlightVdomUpdates = true 
}) {
  // CONCEITO 4: VIRTUAL DOM - Rastreador de re-renderizações por nó do Virtual DOM
  // Toda vez que este componente passa pela fase de render/reconciliação do React, este contador incrementa.
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [hasJustRendered, setHasJustRendered] = useState(false);

  // Efeito visual sutil para destacar a ação do Virtual DOM na tela
  useEffect(() => {
    if (highlightVdomUpdates) {
      setHasJustRendered(true);
      const timer = setTimeout(() => setHasJustRendered(false), 500);
      return () => clearTimeout(timer);
    }
  }, [task, highlightVdomUpdates]);

  const isCompleted = task.status === 'concluido';
  const isInProgress = task.status === 'em-progresso';
  const isBacklog = task.status === 'a-fazer';

  // Verificação condicional de prazo (se é hoje ou atrasado)
  const isUrgent = () => {
    if (!task.dueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate <= today && !isCompleted;
  };

  return (
    <article
      className={`task-card ${hasJustRendered ? 'vdom-flash-active' : ''}`}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        border: isCompleted ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: isCompleted ? 0.85 : 1,
        transition: 'all var(--transition-fast)'
      }}
    >
      {/* Topo do Card: Categorias, Prioridade e Indicador do Virtual DOM */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <PriorityBadge priority={task.priority} />
          <CategoryBadge category={task.category} />
        </div>

        {/* CONCEITO 4: VIRTUAL DOM - Badge em tempo real do Render Count */}
        <span
          title={`Virtual DOM: Este card foi re-renderizado ${renderCount.current} vez(es) sem recarregar o restante da página.`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 107, 0, 0.08)',
            color: 'var(--orange-primary)',
            border: '1px solid var(--orange-glow)'
          }}
        >
          <Cpu size={10} />
          vDOM #{renderCount.current}
        </span>
      </div>

      {/* Título e Descrição */}
      <div>
        <h3
          style={{
            fontSize: '0.98rem',
            fontWeight: 700,
            color: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
            textDecoration: isCompleted ? 'line-through' : 'none',
            marginBottom: '6px',
            lineHeight: 1.35
          }}
        >
          {task.title}
        </h3>

        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {task.description}
        </p>
      </div>

      {/* Meta informações: Data e Responsável */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)'
        }}
      >
        {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Alerta caso a tarefa seja urgente/atrasada */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            color: isUrgent() ? 'var(--color-danger)' : 'var(--text-muted)',
            fontWeight: isUrgent() ? 600 : 400
          }}
        >
          {isUrgent() ? <Clock size={13} /> : <Calendar size={13} />}
          <span>{task.dueDate || 'Sem prazo'}</span>
          {isUrgent() && (
            <span style={{ fontSize: '0.65rem', background: 'var(--color-danger-subtle)', padding: '1px 5px', borderRadius: '4px' }}>
              Urgente
            </span>
          )}
        </div>

        {/* Responsável da tarefa (renderizado condicionalmente se existir) */}
        {task.assignee && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <User size={12} />
            <span>{task.assignee}</span>
          </div>
        )}
      </div>

      {/* Ações do Card: Mover Status, Editar e Deletar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          marginTop: '2px'
        }}
      >
        {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Botão Voltar (Oculto se já estiver na primeira coluna) */}
        <div>
          {!isBacklog ? (
            <button
              onClick={() => onMove(task.id, isInProgress ? 'a-fazer' : 'em-progresso')}
              title="Mover para coluna anterior"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 9px',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <ChevronLeft size={13} />
              Voltar
            </button>
          ) : (
            <span style={{ width: '60px' }} />
          )}
        </div>

        {/* Botões de Edição e Exclusão */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => onEdit(task)}
            title="Editar Tarefa"
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Edit3 size={14} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            title="Excluir Tarefa"
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Botão Avançar (Oculto se já estiver Concluído) */}
        <div>
          {!isCompleted ? (
            <button
              onClick={() => onMove(task.id, isBacklog ? 'em-progresso' : 'concluido')}
              title="Avançar para próxima coluna"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#000000',
                backgroundColor: 'var(--orange-primary)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 2px 8px var(--orange-glow)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-primary)')}
            >
              Avançar
              <ChevronRight size={13} />
            </button>
          ) : (
            <span 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '4px', 
                color: 'var(--color-success)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}
            >
              <CheckCircle2 size={14} /> Finalizada
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
