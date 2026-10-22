import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Layers, 
  GitCommit, 
  CheckCircle, 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  Info,
  Sliders
} from 'lucide-react';

/**
 * CONCEITO 4: VIRTUAL DOM - COMPONENTE DIDÁTICO E INTERATIVO
 * 
 * Este componente serve como o laboratório prático de demonstração do Virtual DOM.
 * Explica o funcionamento do algoritmo de reconciliação (Diffing), batching,
 * e por que o React manipula uma cópia leve em memória ao invés de atualizar o DOM real diretamente.
 */
export default function VirtualDomInspector({
  isOpen,
  onClose,
  tasks,
  onSimulateVdomUpdate,
  highlightVdomUpdates,
  onToggleHighlight
}) {
  const [activeTab, setActiveTab] = useState('how-it-works'); // 'how-it-works' | 'live-demo'
  const [simulationLog, setSimulationLog] = useState([]);

  if (!isOpen) return null;

  const handleRunSimulation = () => {
    if (tasks.length === 0) return;
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    const timestamp = new Date().toLocaleTimeString();

    onSimulateVdomUpdate(randomTask.id);

    const logEntry = {
      id: Date.now(),
      time: timestamp,
      taskTitle: randomTask.title,
      nodeId: randomTask.id,
      reconciledElements: 1,
      untouchedElements: tasks.length - 1
    };

    setSimulationLog((prev) => [logEntry, ...prev.slice(0, 4)]);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
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
          maxWidth: '760px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--orange-glow)',
          boxShadow: '0 0 35px rgba(255, 107, 0, 0.25)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 107, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange-primary)',
                border: '1px solid var(--orange-glow)'
              }}
            >
              <Cpu size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Laboratório do Virtual DOM
                </h2>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--orange-primary)',
                    color: '#000000',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  Conceito 4
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Demonstração visual do algoritmo de reconciliação e diffing do React 19
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <X size={22} />
          </button>
        </div>

        {/* Abas */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <button
            onClick={() => setActiveTab('how-it-works')}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: activeTab === 'how-it-works' ? 'var(--orange-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'how-it-works' ? '2px solid var(--orange-primary)' : 'none',
              backgroundColor: activeTab === 'how-it-works' ? 'rgba(255, 107, 0, 0.05)' : 'transparent'
            }}
          >
            <Layers size={16} /> Como o Virtual DOM Funciona
          </button>

          <button
            onClick={() => setActiveTab('live-demo')}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: activeTab === 'live-demo' ? 'var(--orange-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'live-demo' ? '2px solid var(--orange-primary)' : 'none',
              backgroundColor: activeTab === 'live-demo' ? 'rgba(255, 107, 0, 0.05)' : 'transparent'
            }}
          >
            <Zap size={16} /> Teste Prático & Simulação de Diffing
          </button>
        </div>

        {/* Conteúdo da Aba */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'how-it-works' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* O que é o Virtual DOM */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--orange-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={16} /> O que é o Virtual DOM?
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  O <strong>Virtual DOM (VDOM)</strong> é uma representação em memória leve da árvore do DOM real do navegador.
                  Manipular o DOM diretamente no navegador é uma das operações mais lentas da web (recalcula estilos, layouts e faz reflow da página inteira).
                  O React resolve isso trabalhando em três etapas:
                </p>
              </div>

              {/* Fluxo das 3 Etapas */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--orange-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Passo 1 • Estado Muda
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>
                    Render / Nova Árvore
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Quando um estado muda (ex: arrastar card ou editar), o React cria uma nova árvore no Virtual DOM em milissegundos.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--orange-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Passo 2 • Diffing
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>
                    Comparação de Nós
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    O algoritmo de reconciliação compara a nova árvore com a anterior e identifica <em>exatamente</em> quais propriedades ou nós mudaram.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--orange-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Passo 3 • Reconciliação
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>
                    Patch Cirúrgico no DOM
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    O React aplica um patch cirúrgico apenas no elemento modificado no DOM real, mantendo todo o resto intocado.
                  </p>
                </div>
              </div>

              {/* Por que Keys são cruciais no Virtual DOM */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 107, 0, 0.07)',
                  border: '1px solid var(--orange-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px'
                }}
              >
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--orange-primary)', marginBottom: '4px' }}>
                  🔑 Por que as 'Keys' em listas são fundamentais para o Virtual DOM?
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Sem a propriedade <code>key</code>, se você mover ou deletar um card, o Virtual DOM teria que recriar todos os itens da coluna. Com <code>key={'{task.id}'}</code>, o React sabe a identidade estável de cada nó e apenas move a posição dele na tela instantaneamente.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Painel de Controle da Simulação */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    Simular Reconciliação em Tempo Real
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Clique para disparar uma alteração isolada no estado e veja o Virtual DOM atualizar apenas 1 nó
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={onToggleHighlight}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      backgroundColor: highlightVdomUpdates ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.05)',
                      color: highlightVdomUpdates ? '#000000' : 'var(--text-secondary)',
                      border: '1px solid var(--border-default)'
                    }}
                  >
                    Efeito Flash: {highlightVdomUpdates ? 'Ligado' : 'Desligado'}
                  </button>

                  <button
                    onClick={handleRunSimulation}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--orange-primary)',
                      color: '#000000',
                      boxShadow: 'var(--shadow-orange)'
                    }}
                  >
                    <RefreshCw size={14} />
                    Disparar Atualização
                  </button>
                </div>
              </div>

              {/* Registro de Reconciliações */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  Histórico de Diffing do Virtual DOM:
                </h4>

                {simulationLog.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    Nenhuma simulação disparada ainda. Clique no botão acima para ver o diff em ação!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {simulationLog.map((log) => (
                      <div
                        key={log.id}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.8rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--orange-primary)', fontSize: '0.75rem' }}>
                            [{log.time}]
                          </span>
                          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            {log.taskTitle}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.75rem' }}>
                            ✓ 1 nó recalculado
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            {log.untouchedElements} nós poupados
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com Fechar */}
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
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
