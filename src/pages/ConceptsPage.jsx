import React, { useState } from 'react';
import { 
  Code, 
  Layers, 
  Share2, 
  Cpu, 
  List, 
  Shuffle, 
  ToggleLeft, 
  FileText, 
  Clock, 
  Globe2, 
  Navigation,
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * PÁGINA DOS 11 CONCEITOS DO REACT
 * Central de documentação e apresentação completa para a disciplina de Frameworks Front-End.
 */
export default function ConceptsPage() {
  const [selectedFilter, setSelectedFilter] = useState('todos'); // 'todos' | 'fundamentos' | 'avancados'

  const concepts = [
    {
      id: 1,
      title: "JSX (JavaScript XML)",
      category: "fundamentos",
      icon: <Code size={20} color="var(--orange-primary)" />,
      file: "src/components/TaskCard.jsx",
      route: "/",
      description: "Extensão de sintaxe que permite escrever elementos semelhantes ao HTML dentro de JavaScript, interpolando expressões lógicas com chaves {}.",
      snippet: `// Exemplo em TaskCard.jsx:
<h3 style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
  {task.title}
</h3>`
    },
    {
      id: 2,
      title: "Components (Componentes)",
      category: "fundamentos",
      icon: <Layers size={20} color="var(--orange-primary)" />,
      file: "src/components/*.jsx",
      route: "/",
      description: "Divisão modular da interface em blocos reutilizáveis com responsabilidade única (Header, TaskBoard, TaskColumn, TaskCard, Navbar).",
      snippet: `// Exemplo de composição em TaskBoard.jsx:
<TaskColumn column={column} tasks={columnTasks} onMove={onMoveTask} />`
    },
    {
      id: 3,
      title: "Props (Propriedades)",
      category: "fundamentos",
      icon: <Share2 size={20} color="var(--orange-primary)" />,
      file: "src/components/PriorityBadge.jsx & TaskColumn.jsx",
      route: "/",
      description: "Mecanismo unidirecional para transferir dados e funções de callback de um componente pai para componentes filhos.",
      snippet: `// Componente Pai passando dados e callbacks:
<PriorityBadge priority={task.priority} />
<TaskCard task={task} onMove={onMove} onDelete={onDelete} />`
    },
    {
      id: 4,
      title: "Virtual DOM (VDOM)",
      category: "fundamentos",
      icon: <Cpu size={20} color="var(--orange-primary)" />,
      file: "src/components/VirtualDomInspector.jsx & TaskCard.jsx",
      route: "/",
      description: "Árvore leve em memória onde o React compara (Diffing) o estado anterior com o novo e aplica patches cirúrgicos no DOM real apenas nos nós alterados.",
      snippet: `// Monitoramento de renders com useRef no TaskCard:
const renderCount = useRef(0);
renderCount.current += 1;
<span>vDOM #{renderCount.current}</span>`
    },
    {
      id: 5,
      title: "Listas e Keys",
      category: "fundamentos",
      icon: <List size={20} color="var(--orange-primary)" />,
      file: "src/components/TaskColumn.jsx & TaskBoard.jsx",
      route: "/",
      description: "Renderização de coleções com .map() onde a prop 'key' única identifica cada elemento para reconciliação otimizada do Virtual DOM.",
      snippet: `// Iterando sobre tarefas com chave estável:
{tasks.map((task) => (
  <TaskCard key={task.id} task={task} onMove={onMove} />
))}`
    },
    {
      id: 6,
      title: "Renderização Condicional",
      category: "fundamentos",
      icon: <Shuffle size={20} color="var(--orange-primary)" />,
      file: "src/components/EmptyState.jsx & TaskCard.jsx",
      route: "/",
      description: "Exibição dinâmica de nós com base em regras lógicas via operador ternário (? :), curto-circuito (&&) ou retornos antecipados.",
      snippet: `// 1. Ternário:
{tasks.length === 0 ? <EmptyState /> : <TaskList />}

// 2. Curto-circuito (&&):
{isUrgent && <span className="urgent-badge">Atenção!</span>}`
    },
    {
      id: 7,
      title: "State e useState",
      category: "avancados",
      icon: <ToggleLeft size={20} color="var(--orange-primary)" />,
      file: "src/App.jsx & src/pages/NewTaskPage.jsx",
      route: "/nova-tarefa",
      description: "Hook fundamental para gerenciar dados reativos locais em componentes funcionais. Quando o estado muda, o React dispara uma re-renderização.",
      snippet: `// Gerenciando múltiplos estados no App.jsx:
const [tasks, setTasks] = useState(INITIAL_TASKS);
const [searchTerm, setSearchTerm] = useState('');
const [highlightVdom, setHighlightVdom] = useState(true);`
    },
    {
      id: 8,
      title: "Formulários (Controlled Components)",
      category: "avancados",
      icon: <FileText size={20} color="var(--orange-primary)" />,
      file: "src/pages/NewTaskPage.jsx & src/components/TaskModal.jsx",
      route: "/nova-tarefa",
      description: "Formulários controlados onde o estado do React é a única fonte da verdade, com validação de inputs, contador de caracteres e prevenção de submit padrão.",
      snippet: `const handleSubmit = (e) => {
  e.preventDefault(); // Impede o reload do navegador
  if (!formData.title) return setErrors({ title: 'Obrigatório' });
  onAddTask(formData);
  navigate('/');
};`
    },
    {
      id: 9,
      title: "useEffect (Efeitos Colaterais)",
      category: "avancados",
      icon: <Clock size={20} color="var(--orange-primary)" />,
      file: "src/components/Navbar.jsx, TaskBoardPage.jsx & ApiExplorerPage.jsx",
      route: "/",
      description: "Hook para executar efeitos colaterais como sincronização com LocalStorage, timers com função de limpeza (cleanup) e requisições HTTP.",
      snippet: `// Relógio em tempo real com limpeza de intervalo:
useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer); // Cleanup crucial!
}, []);`
    },
    {
      id: 10,
      title: "Consumo de APIs REST (Fetch & Async/Await)",
      category: "avancados",
      icon: <Globe2 size={20} color="var(--orange-primary)" />,
      file: "src/pages/ApiExplorerPage.jsx",
      route: "/integracao-api",
      description: "Integração assíncrona com APIs externas usando fetch(), tratando os estados de Loading, Sucesso e Erro (Try/Catch) e importando dados para a aplicação.",
      snippet: `const fetchTasks = async () => {
  setLoading(true);
  try {
    const res = await fetch('https://dummyjson.com/todos');
    const data = await res.json();
    setApiTasks(data.todos);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};`
    },
    {
      id: 11,
      title: "React Router (Navegação SPA)",
      category: "avancados",
      icon: <Navigation size={20} color="var(--orange-primary)" />,
      file: "src/main.jsx, src/App.jsx & src/components/Navbar.jsx",
      route: "/",
      description: "Roteamento no lado do cliente com BrowserRouter, Routes, Route, NavLink, Link, useNavigate() e parâmetros dinâmicos de rota com useParams().",
      snippet: `// Configuração de rotas no App.jsx:
<Routes>
  <Route path="/" element={<TaskBoardPage />} />
  <Route path="/nova-tarefa" element={<NewTaskPage />} />
  <Route path="/integracao-api" element={<ApiExplorerPage />} />
  <Route path="/tarefa/:id" element={<TaskDetailPage />} />
</Routes>`
    }
  ];

  const filteredConcepts = concepts.filter((c) => {
    if (selectedFilter === 'fundamentos') return c.category === 'fundamentos';
    if (selectedFilter === 'avancados') return c.category === 'avancados';
    return true;
  });

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '36px 20px' }}>
      {/* Topo da Página */}
      <header
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-default)',
          padding: '28px 32px',
          marginBottom: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 107, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange-primary)',
                border: '1px solid var(--orange-glow)'
              }}
            >
              <BookOpen size={24} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  11 Conceitos de React no DevFlow
                </h1>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--orange-primary)',
                    color: '#000000',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  100% Implementados
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Guia de defesa e apresentação para a disciplina de Frameworks Front-End
              </p>
            </div>
          </div>
        </div>

        {/* Filtro das Categorias */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setSelectedFilter('todos')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: selectedFilter === 'todos' ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedFilter === 'todos' ? '#000000' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            Todos (11)
          </button>

          <button
            onClick={() => setSelectedFilter('fundamentos')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: selectedFilter === 'fundamentos' ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedFilter === 'fundamentos' ? '#000000' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            Fundamentos (6)
          </button>

          <button
            onClick={() => setSelectedFilter('avancados')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: selectedFilter === 'avancados' ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedFilter === 'avancados' ? '#000000' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            Avançados (5)
          </button>
        </div>
      </header>

      {/* Lista de Conceitos com Código */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredConcepts.map((item) => (
          <article
            key={item.id}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-default)',
              padding: '22px 26px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 107, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h2 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {item.id}. {item.title}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {item.file}
                </span>

                <Link
                  to={item.route}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--orange-primary)',
                    textDecoration: 'none',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--orange-glow)',
                    backgroundColor: 'var(--orange-subtle)'
                  }}
                >
                  Ver na tela <ExternalLink size={11} />
                </Link>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {item.description}
            </p>

            <pre
              style={{
                margin: 0,
                padding: '12px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: '#fb923c',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                overflowX: 'auto',
                lineHeight: 1.5
              }}
            >
              <code>{item.snippet}</code>
            </pre>
          </article>
        ))}
      </div>
    </div>
  );
}
