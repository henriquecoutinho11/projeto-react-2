# ⚡ DevFlow • Quadro Kanban, Gestão Ágil & Os 11 Conceitos do React

Projeto desenvolvido em **React 19** com **Vite** e **React Router** para a disciplina de **Frameworks Front-End**.
O sistema conta com tema **Preto e Laranja**, gestão ágil de tarefas, integração com APIs externas, formulários avançados com validação, roteamento SPA e a implementação didática dos **11 conceitos essenciais do React**.

---

## 🎨 Paleta de Cores
- **Fundo Principal (Preto Profundo)**: `#090a0d`
- **Superfícies & Colunas (Grafite Escuro)**: `#11141a` / `#171b24`
- **Laranja Primário (Accent)**: `#ff6b00`
- **Laranja Hover**: `#ff8533`
- **Laranja Glow**: `rgba(255, 107, 0, 0.28)`
- **Bordas & Linhas Sutis**: `#222735` / `#2d3445`
- **Texto Primário**: `#f8fafc`

---

## 🚀 Como Executar o Projeto

1. Certifique-se de que as dependências estão instaladas:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento Vite:
   ```bash
   npm run dev
   ```

3. Acesse `http://localhost:5173` no seu navegador.

---

## 🧭 Rotas do Aplicativo (React Router)

| Rota | Descrição | Conceitos Principais Demonstrados |
|---|---|---|
| `/` | **Quadro Kanban Principal** | Components, Props, Virtual DOM, Listas & Keys, Renderização Condicional, useEffect (título da aba). |
| `/nova-tarefa` | **Formulário Completo** | Formulários controlados, validação em tempo real, State e useState, useNavigate(). |
| `/integracao-api` | **Consumo de APIs REST** | Fetch, async/await, try/catch, useEffect na montagem, estados de loading/error, importação para o Kanban. |
| `/tarefa/:id` | **Detalhes da Tarefa** | Rotas dinâmicas com `useParams()`, renderização condicional se não existir, atualização de status. |
| `/conceitos` | **Central dos 11 Conceitos** | Documentação interativa completa com filtros, explicações e trechos de código. |

---

## 📚 Tabela dos 11 Conceitos do React no Projeto

| # | Conceito | Onde está no código | Como funciona no DevFlow |
|---|---|---|---|
| **1** | **JSX** | [`src/components/TaskCard.jsx`](file:///src/components/TaskCard.jsx) | Mescla sintaxe HTML-like com expressões JS `{...}`, eventos `onClick`, interpolação e fragmentos. |
| **2** | **Components** | [`src/components/`](file:///src/components/), [`src/pages/`](file:///src/pages/) | Divisão modular e reutilizável (`Navbar`, `TaskBoard`, `TaskColumn`, `TaskCard`, `PriorityBadge`, etc.). |
| **3** | **Props** | [`src/components/TaskColumn.jsx`](file:///src/components/TaskColumn.jsx) | Passagem unidirecional de dados (tarefas, prioridades, status) e callbacks (`onMoveTask`, `onDeleteTask`). |
| **4** | **Virtual DOM** | [`src/components/VirtualDomInspector.jsx`](file:///src/components/VirtualDomInspector.jsx) | Laboratório interativo de diffing e reconciliação. Contador de render em tempo real (`vDOM #X`) via `useRef` em cada card. |
| **5** | **Listas e Keys** | [`src/components/TaskColumn.jsx`](file:///src/components/TaskColumn.jsx) | Iteração via `.map()` usando chaves únicas obrigatórias (`key={task.id}`) para estabilidade de nós no Virtual DOM. |
| **6** | **Renderização Condicional** | [`src/components/EmptyState.jsx`](file:///src/components/EmptyState.jsx), [`src/components/TaskCard.jsx`](file:///src/components/TaskCard.jsx) | Uso de operadores ternários (`? :`), curto-circuito (`&&`) e retornos antecipados (`if (!task) return ...`). |
| **7** | **State e useState** | [`src/App.jsx`](file:///src/App.jsx), [`src/pages/NewTaskPage.jsx`](file:///src/pages/NewTaskPage.jsx) | Gerenciamento de dados reativos para tarefas, filtros, campos de formulário, modais e tags dinâmicas. |
| **8** | **Formulários** | [`src/pages/NewTaskPage.jsx`](file:///src/pages/NewTaskPage.jsx) | Controlled Components com `value` e `onChange`, `e.preventDefault()`, validação de erros e contador de caracteres. |
| **9** | **useEffect** | [`src/components/Navbar.jsx`](file:///src/components/Navbar.jsx), [`src/pages/ApiExplorerPage.jsx`](file:///src/pages/ApiExplorerPage.jsx) | Relógio com intervalo e limpeza (`clearInterval`), sincronização com `localStorage` e requisição na montagem `[]`. |
| **10** | **Consumo de APIs** | [`src/pages/ApiExplorerPage.jsx`](file:///src/pages/ApiExplorerPage.jsx) | Requisições assíncronas com `fetch()`, `async/await`, tratamento com `try/catch/finally` e estados de `loading` e `error`. |
| **11** | **React Router** | [`src/main.jsx`](file:///src/main.jsx), [`src/App.jsx`](file:///src/App.jsx), [`src/components/Navbar.jsx`](file:///src/components/Navbar.jsx) | Single Page Application com `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate()` e `useParams()`. |

---

## 🎯 Roteiro Rápido para Apresentação em Aula

1. **Apresentar o Roteamento (React Router)**:
   - Navegue pela barra superior entre **Quadro Kanban**, **Nova Tarefa**, **Consumo de API** e **11 Conceitos**, mostrando que a URL muda sem recarregar a página.
2. **Apresentar Formulários e State (useState)**:
   - Vá na página `/nova-tarefa`.
   - Tente submeter o formulário vazio para mostrar a validação em tempo real e as mensagens de erro.
   - Digite o título para mostrar o contador de caracteres (`/80`), adicione tags dinâmicas com o botão `+` e salve a tarefa (redirecionamento automático com `useNavigate`).
3. **Apresentar Consumo de APIs e useEffect**:
   - Acesse `/integracao-api`.
   - Explique que o `useEffect` dispara a busca assíncrona com `fetch()` na montagem da tela.
   - Mostre o estado de carregamento (*spinner*) e clique em **"Importar p/ Quadro"** para trazer uma tarefa da API diretamente para o Kanban!
   - Aponte o relógio no topo da tela para mostrar um `useEffect` com função de limpeza (`clearInterval`).
4. **Apresentar o Virtual DOM e Parâmetro Dinâmico**:
   - Clique em qualquer título de card no Kanban para abrir a rota dinâmica `/tarefa/:id` (usando `useParams`).
   - Abra o **Inspetor Virtual DOM** no botão laranja para mostrar a simulação do algoritmo de diffing em tempo real.
