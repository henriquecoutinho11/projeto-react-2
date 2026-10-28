import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Cpu, 
  ArrowRight,
  ExternalLink,
  Code
} from 'lucide-react';

/**
 * CONCEITO 7: STATE & useState - Estados para 'apiTasks', 'loading', 'error', 'importedIds'
 * CONCEITO 9: useEffect - Requisição assíncrona automática ao montar o componente
 * CONCEITO 10: CONSUMO DE APIS - Uso da API Fetch com try/catch, async/await, tratamento de erros e parsing JSON
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Exibição de spinner de carregamento, alertas de erro ou lista de dados
 */
export default function ApiExplorerPage({ onImportTask }) {
  const [apiTasks, setApiTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [importedIds, setImportedIds] = useState(new Set());
  const [apiSource, setApiSource] = useState('dummyjson'); // 'dummyjson' | 'github'

  // CONCEITO 10: CONSUMO DE APIS
  // Função assíncrona que consome uma API REST externa real usando fetch()
  const fetchTasksFromApi = async (source = apiSource) => {
    setLoading(true);
    setError(null);

    try {
      if (source === 'github') {
        // Consome issues reais do repositório público do React no GitHub
        const response = await fetch('https://api.github.com/repos/facebook/react/issues?per_page=6');
        
        if (!response.ok) {
          throw new Error(`Erro na API do GitHub: Status ${response.status}`);
        }
        
        const data = await response.json();
        const mapped = data.map((issue) => ({
          id: `gh-${issue.id}`,
          title: issue.title,
          description: issue.body ? issue.body.slice(0, 160) + '...' : 'Sem descrição na issue do GitHub.',
          category: 'Frontend',
          priority: issue.comments > 2 ? 'Alta' : 'Média',
          status: 'a-fazer',
          dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          assignee: issue.user ? issue.user.login : 'GitHub Dev',
          sourceUrl: issue.html_url
        }));
        
        setApiTasks(mapped);
      } else {
        // Consome dados da API DummyJSON Todos
        const response = await fetch('https://dummyjson.com/todos?limit=8');
        
        if (!response.ok) {
          throw new Error(`Falha ao carregar dados da API: Status ${response.status}`);
        }

        const data = await response.json();
        const mapped = data.todos.map((todo) => ({
          id: `api-${todo.id}`,
          title: todo.todo,
          description: `Tarefa sincronizada via API externa (ID #${todo.id}). Integrada com o ciclo de vida do React.`,
          category: todo.id % 2 === 0 ? 'Backend' : 'Frontend',
          priority: todo.completed ? 'Baixa' : (todo.id % 3 === 0 ? 'Alta' : 'Média'),
          status: todo.completed ? 'concluido' : 'a-fazer',
          dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
          assignee: `Dev #${todo.userId}`,
          completed: todo.completed
        }));

        setApiTasks(mapped);
      }
    } catch (err) {
      console.error('Erro ao consumir API:', err);
      setError(err.message || 'Falha na conexão com o servidor externo.');
      
      // Fallback didático caso o usuário esteja sem conexão com a internet
      setApiTasks([
        {
          id: 'api-fallback-1',
          title: '[Offline Fallback] Otimizar renderização do Virtual DOM',
          description: 'Tarefa de demonstração gerada pelo fallback de resiliência caso não haja conexão com a internet.',
          category: 'Performance',
          priority: 'Alta',
          status: 'a-fazer',
          dueDate: new Date().toISOString().split('T')[0],
          assignee: 'Offline System'
        }
      ]);
    } finally {
      // Finaliza o estado de carregamento
      setLoading(false);
    }
  };

  // CONCEITO 9: useEffect
  // Executa a requisição assíncrona assim que a página é montada no DOM
  useEffect(() => {
    fetchTasksFromApi(apiSource);
  }, [apiSource]);

  // Manipulador para importar uma tarefa da API para o quadro Kanban
  const handleImport = (task) => {
    onImportTask({
      id: `task-imported-${Date.now()}-${task.id}`,
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      assignee: task.assignee
    });

    setImportedIds((prev) => new Set(prev).add(task.id));
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '32px 20px' }}>
      {/* Banner de Apresentação do Conceito */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-default)',
          padding: '24px 28px',
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
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 107, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange-primary)',
                border: '1px solid var(--orange-glow)'
              }}
            >
              <Globe2 size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Consumo de APIs REST no React
                </h1>
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
                  Conceito 10
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Demonstração prática de <code>fetch()</code>, <code>async/await</code>, <code>useEffect</code> e estados de carregamento
              </p>
            </div>
          </div>
        </div>

        {/* Seleção de API e Botão Recarregar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={apiSource}
            onChange={(e) => setApiSource(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            <option value="dummyjson">API 1: DummyJSON (Todos API)</option>
            <option value="github">API 2: GitHub (React Public Issues)</option>
          </select>

          <button
            onClick={() => fetchTasksFromApi(apiSource)}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#000000',
              backgroundColor: 'var(--orange-primary)',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            <RefreshCw size={14} className={loading ? 'spinning-icon' : ''} />
            {loading ? 'Buscando dados...' : 'Atualizar API'}
          </button>
        </div>
      </div>

      {/* Explicação Didática Rápida em Card */}
      <div
        style={{
          backgroundColor: 'rgba(255, 107, 0, 0.05)',
          border: '1px solid var(--orange-glow)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code size={20} color="var(--orange-primary)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Como funciona:</strong> Ao carregar o componente, o hook <code>useEffect(..., [])</code> dispara uma requisição <code>fetch()</code> assíncrona. Os estados <code>loading</code>, <code>error</code> e <code>data</code> controlam a interface condicionalmente.
          </span>
        </div>
      </div>

      {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Loading vs Error vs Data */}
      {loading ? (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '3px solid var(--border-subtle)',
              borderTopColor: 'var(--orange-primary)',
              margin: '0 auto 16px auto',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Consumindo API Externa...
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Aguardando resposta do servidor assíncrono (JSON)
          </p>
        </div>
      ) : error ? (
        <div
          style={{
            padding: '30px 24px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-danger)',
            textAlign: 'center'
          }}
        >
          <AlertTriangle size={32} color="var(--color-danger)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-danger)' }}>
            Houve um erro na requisição da API
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '6px 0 16px 0' }}>
            {error} (Usando dados locais de fallback para apresentação).
          </p>
          <button
            onClick={() => fetchTasksFromApi(apiSource)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: 'var(--orange-primary)',
              color: '#000000'
            }}
          >
            Tentar Novamente
          </button>
        </div>
      ) : (
        /* CONCEITO 5: LISTAS E KEYS - Itera sobre os dados obtidos da API */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '18px'
          }}
        >
          {apiTasks.map((item) => {
            const isImported = importedIds.has(item.id);

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: isImported ? '1px solid var(--color-success)' : '1px solid var(--border-subtle)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {item.id}
                    </span>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--orange-primary)',
                        backgroundColor: 'var(--orange-subtle)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                      lineHeight: 1.4
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Resp: <strong>{item.assignee}</strong>
                  </span>

                  {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Importada vs Botão de Importar */}
                  {isImported ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--color-success)'
                      }}
                    >
                      <CheckCircle2 size={14} /> Importada!
                    </span>
                  ) : (
                    <button
                      onClick={() => handleImport(item)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--orange-subtle)',
                        color: 'var(--orange-primary)',
                        border: '1px solid var(--orange-glow)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--orange-primary)';
                        e.currentTarget.style.color = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--orange-subtle)';
                        e.currentTarget.style.color = 'var(--orange-primary)';
                      }}
                    >
                      <Download size={13} />
                      Importar p/ Quadro
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
