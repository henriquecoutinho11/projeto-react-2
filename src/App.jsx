import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskBoard from './components/TaskBoard';
import TaskModal from './components/TaskModal';
import VirtualDomInspector from './components/VirtualDomInspector';
import ConceptsGuideModal from './components/ConceptsGuideModal';
import { INITIAL_TASKS, CATEGORIES, PRIORITIES, STATUS_COLUMNS } from './data/initialTasks';
import { Cpu, BookOpen } from 'lucide-react';
import './App.css';

/**
 * DEVFLOW - QUADRO KANBAN & GESTÃO ÁGIL
 * 
 * Este projeto atende e demonstra de forma explícita os 6 conceitos de React:
 * 1. JSX
 * 2. Components
 * 3. Props
 * 4. Virtual DOM
 * 5. Listas e Keys
 * 6. Renderização Condicional
 */
export default function App() {
  // Estado principal de tarefas, com persistência no LocalStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('devflow_tasks_react');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Estados de Filtro
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPriority, setSelectedPriority] = useState('todas');

  // Estados de Modais e Controle Visual
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultColumnStatus, setDefaultColumnStatus] = useState('a-fazer');
  const [isVdomModalOpen, setIsVdomModalOpen] = useState(false);
  const [isConceptsModalOpen, setIsConceptsModalOpen] = useState(false);
  const [highlightVdomUpdates, setHighlightVdomUpdates] = useState(true);

  // Persistência no LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('devflow_tasks_react', JSON.stringify(tasks));
    } catch (err) {
      console.error('Falha ao salvar tarefas no LocalStorage:', err);
    }
  }, [tasks]);

  // Manipulador: Salvar Tarefa (Criação ou Edição)
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Edição de tarefa existente
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...taskData } : t))
      );
      setEditingTask(null);
    } else {
      // Inserção de nova tarefa no início da lista
      setTasks((prev) => [taskData, ...prev]);
    }
  };

  // Manipulador: Excluir Tarefa
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Manipulador: Mover Tarefa entre colunas
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  // Manipulador: Abrir Modal para Edição
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Manipulador: Adição Rápida numa coluna específica
  const handleQuickAdd = (statusId) => {
    setEditingTask(null);
    setDefaultColumnStatus(statusId);
    setIsTaskModalOpen(true);
  };

  // Manipulador: Resetar Filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSelectedPriority('todas');
  };

  // Manipulador: Simular Reconciliação do Virtual DOM
  // Altera levemente o título de uma tarefa para provar o diffing do VDOM
  const handleSimulateVdomUpdate = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            title: t.title.endsWith(' •') ? t.title.slice(0, -2) : `${t.title} •`
          };
        }
        return t;
      })
    );
  };

  // Filtragem dinâmica das tarefas
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignee && task.assignee.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'Todas' || task.category === selectedCategory;

    const matchesPriority =
      selectedPriority === 'todas' || task.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <div className="app-container">
      {/* CONCEITO 2: COMPONENTS & CONCEITO 3: PROPS */}
      <Header
        tasks={tasks}
        onOpenNewTaskModal={() => {
          setEditingTask(null);
          setDefaultColumnStatus('a-fazer');
          setIsTaskModalOpen(true);
        }}
        onOpenVdomModal={() => setIsVdomModalOpen(true)}
        onOpenConceptsModal={() => setIsConceptsModalOpen(true)}
        highlightVdomUpdates={highlightVdomUpdates}
        onToggleHighlight={() => setHighlightVdomUpdates((prev) => !prev)}
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        {/* Barra de Filtros */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          categories={CATEGORIES}
          priorities={PRIORITIES}
          onResetFilters={handleResetFilters}
          totalTasksCount={tasks.length}
          filteredTasksCount={filteredTasks.length}
        />

        {/* Quadro Kanban */}
        <TaskBoard
          columns={STATUS_COLUMNS}
          tasks={filteredTasks}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onQuickAdd={handleQuickAdd}
          highlightVdomUpdates={highlightVdomUpdates}
        />
      </div>

      {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL nos modais */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSaveTask={handleSaveTask}
        initialData={editingTask}
        defaultStatus={defaultColumnStatus}
      />

      <VirtualDomInspector
        isOpen={isVdomModalOpen}
        onClose={() => setIsVdomModalOpen(false)}
        tasks={tasks}
        onSimulateVdomUpdate={handleSimulateVdomUpdate}
        highlightVdomUpdates={highlightVdomUpdates}
        onToggleHighlight={() => setHighlightVdomUpdates((prev) => !prev)}
      />

      <ConceptsGuideModal
        isOpen={isConceptsModalOpen}
        onClose={() => setIsConceptsModalOpen(false)}
      />

      {/* Barra Flutuante de Atalho Didático */}
      <footer className="floating-footer">
        <div className="floating-footer-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Projeto React: <strong>6/6 Conceitos Atendidos</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setIsConceptsModalOpen(true)}
              className="footer-btn"
            >
              <BookOpen size={14} />
              Ver Código dos 6 Conceitos
            </button>
            <button
              onClick={() => setIsVdomModalOpen(true)}
              className="footer-btn-primary"
            >
              <Cpu size={14} />
              Demonstrar Virtual DOM
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
