import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskModal from './components/TaskModal';
import VirtualDomInspector from './components/VirtualDomInspector';
import TaskBoardPage from './pages/TaskBoardPage';
import NewTaskPage from './pages/NewTaskPage';
import ApiExplorerPage from './pages/ApiExplorerPage';
import TaskDetailPage from './pages/TaskDetailPage';
import ConceptsPage from './pages/ConceptsPage';
import { INITIAL_TASKS } from './data/initialTasks';
import { Cpu, BookOpen, Layers } from 'lucide-react';
import './App.css';

/**
 * DEVFLOW - GESTÃO ÁGIL & OS 11 CONCEITOS DO REACT
 * 
 * 1. JSX
 * 2. Components
 * 3. Props
 * 4. Virtual DOM
 * 5. Listas e Keys
 * 6. Renderização Condicional
 * 7. State e useState
 * 8. Formulários (Controlled Components)
 * 9. useEffect (Lifecycle, sincronização e timers)
 * 10. Consumo de APIs (REST, Fetch, Async/Await)
 * 11. React Router (Roteamento SPA, rotas dinâmicas e hooks)
 */
export default function App() {
  const location = useLocation();

  // CONCEITO 7: STATE & useState - Estado principal de tarefas com LocalStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('devflow_tasks_react_v2');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Estados de Filtro
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPriority, setSelectedPriority] = useState('todas');

  // Estados para Modais e Controle Visual do Virtual DOM
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultColumnStatus, setDefaultColumnStatus] = useState('a-fazer');
  const [isVdomModalOpen, setIsVdomModalOpen] = useState(false);
  const [highlightVdomUpdates, setHighlightVdomUpdates] = useState(true);

  // CONCEITO 9: useEffect - Persistência automática no LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('devflow_tasks_react_v2', JSON.stringify(tasks));
    } catch (err) {
      console.error('Falha ao salvar tarefas no LocalStorage:', err);
    }
  }, [tasks]);

  // Manipulador: Salvar Tarefa (Criação ou Edição)
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...taskData } : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [taskData, ...prev]);
    }
  };

  // Manipulador: Adicionar Nova Tarefa (vindo de NewTaskPage ou ApiExplorerPage)
  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
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

  // Manipulador: Abrir Modal para Edição Rápida
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Manipulador: Adição Rápida por Coluna
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

  // Manipulador: Simulação de Reconciliação do Virtual DOM
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

  // Filtragem dinâmica das tarefas no Kanban
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
      {/* CONCEITO 2: COMPONENTS & CONCEITO 11: REACT ROUTER */}
      <Navbar
        tasksCount={tasks.length}
        onOpenVdomModal={() => setIsVdomModalOpen(true)}
        highlightVdomUpdates={highlightVdomUpdates}
        onToggleHighlight={() => setHighlightVdomUpdates((prev) => !prev)}
      />

      {/* CONCEITO 11: REACT ROUTER - Roteamento com <Routes> e <Route> */}
      <Routes>
        {/* Rota 1: Quadro Kanban Principal */}
        <Route
          path="/"
          element={
            <TaskBoardPage
              tasks={tasks}
              filteredTasks={filteredTasks}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              onResetFilters={handleResetFilters}
              onMoveTask={handleMoveTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onQuickAdd={handleQuickAdd}
              highlightVdomUpdates={highlightVdomUpdates}
            />
          }
        />

        {/* Rota 2: Formulário Avançado de Nova Tarefa */}
        <Route
          path="/nova-tarefa"
          element={<NewTaskPage onAddTask={handleAddTask} />}
        />

        {/* Rota 3: Consumo de APIs REST (Fetch & Async/Await) */}
        <Route
          path="/integracao-api"
          element={<ApiExplorerPage onImportTask={handleAddTask} />}
        />

        {/* Rota 4: Detalhes da Tarefa com Parâmetro Dinâmico :id */}
        <Route
          path="/tarefa/:id"
          element={
            <TaskDetailPage
              tasks={tasks}
              onMoveTask={handleMoveTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />

        {/* Rota 5: Central Documentada dos 11 Conceitos */}
        <Route path="/conceitos" element={<ConceptsPage />} />

        {/* Rota Fallback: Redireciona para o Quadro */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modais Globais */}
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

      {/* Barra Flutuante de Atalho Didático (visível em todas as páginas) */}
      <footer className="floating-footer">
        <div className="floating-footer-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              DevFlow: <strong>11/11 Conceitos Implementados</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
