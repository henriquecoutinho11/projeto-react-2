import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Cpu,
  Layers,
  Tag
} from 'lucide-react';
import PriorityBadge from '../components/PriorityBadge';
import CategoryBadge from '../components/CategoryBadge';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe 'tasks', 'onMoveTask', 'onDeleteTask'
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Exibe estado 'Tarefa não encontrada' ou dados completos
 * CONCEITO 9: useEffect - Atualiza título da aba com o nome da tarefa
 * CONCEITO 11: REACT ROUTER - Extração de parâmetros dinâmicos de rota com o hook useParams()
 */
export default function TaskDetailPage({ tasks, onMoveTask, onDeleteTask }) {
  // CONCEITO 11: REACT ROUTER - useParams obtém o :id da URL
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (task) {
      document.title = `${task.title} • DevFlow`;
    } else {
      document.title = 'Tarefa não encontrada • DevFlow';
    }
  }, [task]);

  // CONCEITO 6: RENDERIZAÇÃO CONDICIONAL caso o ID da URL não exista
  if (!task) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Tarefa Não Encontrada
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Não foi possível localizar nenhuma tarefa com o identificador <code style={{ color: 'var(--orange-primary)' }}>{id}</code>.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--orange-primary)',
            color: '#000000',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Voltar ao Quadro Kanban
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDeleteTask(task.id);
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '32px 20px' }}>
      {/* Botão de Voltar */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <ArrowLeft size={16} />
          Voltar para o Quadro Kanban
        </Link>
      </div>

      {/* Card Principal de Detalhes */}
      <article
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Topo do Detalhe */}
        <header
          style={{
            padding: '24px 28px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PriorityBadge priority={task.priority} />
            <CategoryBadge category={task.category} />
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)'
              }}
            >
              ID: {task.id}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleDelete}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--color-danger)',
                backgroundColor: 'var(--color-danger-subtle)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <Trash2 size={14} /> Excluir Tarefa
            </button>
          </div>
        </header>

        {/* Corpo do Detalhe */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.35 }}>
              {task.title}
            </h1>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
              {task.description}
            </p>
          </div>

          {/* Grid de Metadados */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              padding: '18px',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Status Atual:
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--orange-primary)', textTransform: 'capitalize' }}>
                {task.status.replace('-', ' ')}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Prazo de Entrega:
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} /> {task.dueDate || 'Não especificado'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Responsável:
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} /> {task.assignee || 'Não atribuído'}
              </span>
            </div>
          </div>

          {/* Tags (se houver) */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Tags associadas:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--orange-subtle)',
                      color: 'var(--orange-primary)',
                      border: '1px solid var(--orange-glow)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ações de Mover Status */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Mover etapa:
              </span>

              <button
                disabled={task.status === 'a-fazer'}
                onClick={() => onMoveTask(task.id, 'a-fazer')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: task.status === 'a-fazer' ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: task.status === 'a-fazer' ? '#000000' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: task.status === 'a-fazer' ? 'default' : 'pointer'
                }}
              >
                A Fazer
              </button>

              <button
                disabled={task.status === 'em-progresso'}
                onClick={() => onMoveTask(task.id, 'em-progresso')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: task.status === 'em-progresso' ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: task.status === 'em-progresso' ? '#000000' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: task.status === 'em-progresso' ? 'default' : 'pointer'
                }}
              >
                Em Progresso
              </button>

              <button
                disabled={task.status === 'concluido'}
                onClick={() => onMoveTask(task.id, 'concluido')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: task.status === 'concluido' ? 'var(--color-success)' : 'rgba(255, 255, 255, 0.05)',
                  color: task.status === 'concluido' ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: task.status === 'concluido' ? 'default' : 'pointer'
                }}
              >
                Concluído
              </button>
            </div>

            <Link
              to="/"
              style={{
                fontSize: '0.82rem',
                color: 'var(--orange-primary)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Voltar ao Kanban →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
