import React from 'react';
import { X, CheckCircle, Code, Layers, Share2, Cpu, List, Shuffle } from 'lucide-react';

/**
 * GUIA COMPLETO DOS 6 CONCEITOS DO PROJETO REACT
 * Apresentação pronta com explicação e trecho de código de cada conceito para a aula de Frameworks Front-End.
 */
export default function ConceptsGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const concepts = [
    {
      id: 1,
      title: "JSX (JavaScript XML)",
      icon: <Code size={20} color="var(--orange-primary)" />,
      file: "src/components/TaskCard.jsx",
      description: "Extensão de sintaxe que permite escrever estruturas semelhantes ao HTML dentro de arquivos JavaScript, permitindo interpolação de expressões entre chaves {}.",
      snippet: `// Exemplo em TaskCard.jsx:
<h3 style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
  {task.title}
</h3>`
    },
    {
      id: 2,
      title: "Components (Componentes)",
      icon: <Layers size={20} color="var(--orange-primary)" />,
      file: "src/components/*.jsx",
      description: "Blocos de código isolados, reutilizáveis e com responsabilidade única que compõem a interface (ex: Header, TaskBoard, TaskColumn, TaskCard, TaskModal, PriorityBadge).",
      snippet: `// Exemplo em TaskBoard.jsx:
<TaskColumn column={column} tasks={columnTasks} />`
    },
    {
      id: 3,
      title: "Props (Propriedades)",
      icon: <Share2 size={20} color="var(--orange-primary)" />,
      file: "src/components/PriorityBadge.jsx & TaskCard.jsx",
      description: "Mecanismo para passar dados de componentes pais para filhos de forma unidirecional, incluindo valores primitivos, objetos e funções de callback.",
      snippet: `// Pai passando props:
<PriorityBadge priority={task.priority} />

// Filho recebendo props:
export default function PriorityBadge({ priority }) { ... }`
    },
    {
      id: 4,
      title: "Virtual DOM (VDOM)",
      icon: <Cpu size={20} color="var(--orange-primary)" />,
      file: "src/components/VirtualDomInspector.jsx & TaskCard.jsx",
      description: "Árvore leve em memória onde o React compara (Diffing) o estado anterior com o novo e aplica patches cirúrgicos no DOM real apenas nos nós modificados.",
      snippet: `// Contador de re-renderização por nó VDOM usando useRef:
const renderCount = useRef(0);
renderCount.current += 1;
<span>vDOM #{renderCount.current}</span>`
    },
    {
      id: 5,
      title: "Listas e Keys",
      icon: <List size={20} color="var(--orange-primary)" />,
      file: "src/components/TaskColumn.jsx & TaskBoard.jsx",
      description: "Renderização dinâmica de arrays através de .map(), onde cada elemento precisa de uma prop 'key' única para que o Virtual DOM rastreie inserções, exclusões e reordenações.",
      snippet: `// Exemplo em TaskColumn.jsx:
{tasks.map((task) => (
  <TaskCard key={task.id} task={task} onMove={onMove} />
))}`
    },
    {
      id: 6,
      title: "Renderização Condicional",
      icon: <Shuffle size={20} color="var(--orange-primary)" />,
      file: "src/components/EmptyState.jsx, TaskCard.jsx & TaskModal.jsx",
      description: "Exibição de elementos ou estados visuais alternativos baseados em expressões booleanas (if/else, operador ternário ? : e operador de curto-circuito &&).",
      snippet: `// 1. Curto-circuito (&&):
{actionLabel && <button>{actionLabel}</button>}

// 2. Operador ternário (? :):
{tasks.length === 0 ? <EmptyState /> : <TasksList />}

// 3. Retorno nulo (early return):
if (!isOpen) return null;`
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Os 6 Conceitos no DevFlow
              </h2>
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
                100% Atendido
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Guia de apresentação para a disciplina de Frameworks Front-End
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <X size={22} />
          </button>
        </div>

        {/* Lista dos 6 conceitos */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {concepts.map((concept) => (
            <div
              key={concept.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 18px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {concept.icon}
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {concept.id}. {concept.title}
                  </h3>
                </div>
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
                  {concept.file}
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {concept.description}
              </p>

              <pre
                style={{
                  margin: 0,
                  padding: '10px 12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#fb923c',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflowX: 'auto'
                }}
              >
                <code>{concept.snippet}</code>
              </pre>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: 'var(--bg-card)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.84rem',
              fontWeight: 600,
              backgroundColor: 'var(--orange-primary)',
              color: '#000000'
            }}
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
}
