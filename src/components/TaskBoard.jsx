import React from 'react';
import TaskColumn from './TaskColumn';

/**
 * CONCEITO 2: COMPONENTS - Quadro Kanban que encapsula as colunas
 * CONCEITO 3: PROPS - Recebe dados e handlers das ações de negócio
 * CONCEITO 5: LISTAS E KEYS - Itera sobre 'columns' utilizando 'key={column.id}'
 */
export default function TaskBoard({
  columns,
  tasks,
  onMoveTask,
  onDeleteTask,
  onEditTask,
  onQuickAdd,
  highlightVdomUpdates
}) {
  return (
    <main
      style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        paddingBottom: '24px',
        alignItems: 'flex-start'
      }}
    >
      {/* CONCEITO 5: LISTAS E KEYS
          Iteramos sobre as colunas do Kanban com 'key={column.id}' */}
      {columns.map((column) => {
        // Filtramos as tarefas pertencentes a esta coluna específica
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            onMove={onMoveTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            onQuickAdd={onQuickAdd}
            highlightVdomUpdates={highlightVdomUpdates}
          />
        );
      })}
    </main>
  );
}
