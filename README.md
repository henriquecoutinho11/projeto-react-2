# ⚡ DevFlow • Quadro Kanban & Gestão Ágil

Projeto desenvolvido em **React 19** com **Vite** para a disciplina de **Frameworks Front-End**.
O sistema implementa uma interface moderna no tema **Preto e Laranja** com gestão completa de tarefas, filtros inteligentes, persistência em `localStorage` e demonstração didática dos **6 conceitos fundamentais do React**.

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

1. Instale as dependências (já instaladas):
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador no link indicado pelo Vite (geralmente `http://localhost:5173`).

---

## 📚 Os 6 Conceitos no Código (Para Apresentação)

| # | Conceito | Onde está implementado | O que faz no projeto |
|---|---|---|---|
| **1** | **JSX** | [`src/components/TaskCard.jsx`](file:///src/components/TaskCard.jsx), [`src/App.jsx`](file:///src/App.jsx) | Mescla sintaxe de marcação com JavaScript, classes dinâmicas, eventos `onClick`, `onSubmit` e interpolação de variáveis. |
| **2** | **Components** | [`src/components/`](file:///src/components/) | Divisão modular em componentes com responsabilidade única: `Header`, `FilterBar`, `TaskBoard`, `TaskColumn`, `TaskCard`, `PriorityBadge`, `CategoryBadge`, `TaskModal`, `VirtualDomInspector`, `EmptyState`. |
| **3** | **Props** | [`src/components/PriorityBadge.jsx`](file:///src/components/PriorityBadge.jsx), [`src/components/TaskColumn.jsx`](file:///src/components/TaskColumn.jsx) | Passagem unidirecional de dados (tarefas, colunas, categorias) e callbacks (`onMove`, `onDelete`, `onEdit`, `onSaveTask`) entre componentes pais e filhos. |
| **4** | **Virtual DOM** | [`src/components/VirtualDomInspector.jsx`](file:///src/components/VirtualDomInspector.jsx), [`src/components/TaskCard.jsx`](file:///src/components/TaskCard.jsx) | Laboratório interativo de diffing e reconciliação. Cada card possui um contador de renders em tempo real (`vDOM #X`) via `useRef` e feedback visual de nós atualizados. |
| **5** | **Listas e Keys** | [`src/components/TaskColumn.jsx`](file:///src/components/TaskColumn.jsx), [`src/components/FilterBar.jsx`](file:///src/components/FilterBar.jsx) | Renderização de coleções com `.map()` utilizando `key={task.id}`, `key={column.id}` e `key={category}` para permitir que o React identifique elementos sem re-renderizar a lista inteira. |
| **6** | **Renderização Condicional** | [`src/components/TaskCard.jsx`](file:///src/components/TaskCard.jsx), [`src/components/EmptyState.jsx`](file:///src/components/EmptyState.jsx), [`src/components/TaskModal.jsx`](file:///src/components/TaskModal.jsx) | Uso de operador ternário (`? :`), curto-circuito (`&&`) e retorno antecipado (`if (!isOpen) return null`) para exibir botões de avançar/voltar, alertas de urgência, cards concluídos e modais. |

---

## 🎯 Destaques e Diferenciais para Nota Máxima

- **Inspetor Interativo do Virtual DOM**: Botão no cabeçalho e no rodapé que abre uma janela demonstrando visualmente as 3 fases do Virtual DOM (Render -> Diffing -> Reconciliação).
- **Simulador de Atualização**: Permite disparar atualizações em nós únicos e ver apenas aquele componente sofrendo patch no DOM real.
- **Rastreador de Render por Card**: Cada card exibe sua contagem de re-renderizações (`vDOM #1`, `vDOM #2`, etc.).
- **Persistência Automática**: Tarefas criadas, movidas ou excluídas são salvas no `localStorage`.
- **Filtros Combinados**: Busca textual por título, descrição ou responsável combinada com chips de categorias e prioridades.
- **Design Responsivo & Acessível**: Paleta de alto contraste preto e laranja com tipografia moderna.
