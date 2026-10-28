import React, { useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import TaskBoard from '../components/TaskBoard';
import { CATEGORIES, PRIORITIES, STATUS_COLUMNS } from '../data/initialTasks';
import { Link } from 'react-router-dom';
import { Plus, CheckCircle, Clock, ListTodo } from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe 'tasks', filtros e manipuladores de eventos
 * CONCEITO 9: useEffect - Atualização dinâmica do título da aba no navegador
 * CONCEITO 11: REACT ROUTER - Links para navegar para criação de tarefas ou detalhes
 */
export default function TaskBoardPage({
  tasks,
  filteredTasks,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  onResetFilters,
  onMoveTask,
  onDeleteTask,
  onEditTask,
  onQuickAdd,
  highlightVdomUpdates
}) {
  // CONCEITO 9: useEffect - Atualiza o título do documento sempre que o número de tarefas mudar
  useEffect(() => {
    document.title = `DevFlow (${tasks.length} tarefas) • Kanban`;
  }, [tasks.length]);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'concluido').length;
  const inProgress = tasks.filter((t) => t.status === 'em-progresso').length;
  const backlog = tasks.filter((t) => t.status === 'a-fazer').length;
  const completionPercentage = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }}>
      {/* Banner de Métricas da Sprint */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '18px 24px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ListTodo size={18} color="var(--text-muted)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total:</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {total}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#f97316' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>A Fazer:</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {backlog}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ff8c00' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Em Progresso:</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {inProgress}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Concluídas:</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-success)' }}>
              {done}
            </span>
          </div>
        </div>

        {/* Barra de Progresso + Botão de Nova Tarefa via Rota */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '180px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Progresso: <strong style={{ color: 'var(--text-primary)' }}>{completionPercentage}%</strong>
            </span>
            <div
              style={{
                flex: 1,
                height: '7px',
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

          {/* CONCEITO 11: REACT ROUTER - Link direto para o formulário de nova tarefa */}
          <Link
            to="/nova-tarefa"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#000000',
              backgroundColor: 'var(--orange-primary)',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-orange)'
            }}
          >
            <Plus size={16} strokeWidth={2.8} />
            Nova Tarefa
          </Link>
        </div>
      </div>

      {/* Barra de Filtros */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        selectedPriority={selectedPriority}
        onPriorityChange={onPriorityChange}
        categories={CATEGORIES}
        priorities={PRIORITIES}
        onResetFilters={onResetFilters}
        totalTasksCount={tasks.length}
        filteredTasksCount={filteredTasks.length}
      />

      {/* Quadro Kanban */}
      <TaskBoard
        columns={STATUS_COLUMNS}
        tasks={filteredTasks}
        onMoveTask={onMoveTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
        onQuickAdd={onQuickAdd}
        highlightVdomUpdates={highlightVdomUpdates}
      />
    </div>
  );
}
