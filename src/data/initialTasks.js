// Dados iniciais para o DevFlow
// Cada item possui um 'id' único essencial para a reconciliação e o uso de 'keys' nas listas React.
export const INITIAL_TASKS = [
  {
    id: "task-101",
    title: "Prototipar fluxo de navegação no Figma",
    description: "Criar telas em alta fidelidade com base nos requisitos da sprint e validar com o time de UX.",
    category: "Design",
    priority: "Média",
    status: "concluido",
    dueDate: "2026-10-20",
    assignee: "Beatriz Lima"
  },
  {
    id: "task-102",
    title: "Implementar autenticação JWT & Refresh Token",
    description: "Proteger rotas da API com middleware de autenticação, tempo de expiração e rota de refresh.",
    category: "Backend",
    priority: "Alta",
    status: "em-progresso",
    dueDate: "2026-10-23",
    assignee: "Henrique Coutinho"
  },
  {
    id: "task-103",
    title: "Otimizar reconciliação do Virtual DOM",
    description: "Isolar re-renderizações usando memoização e analisar a árvore de nós no React DevTools.",
    category: "Performance",
    priority: "Baixa",
    status: "em-progresso",
    dueDate: "2026-10-25",
    assignee: "Gabriel Santos"
  },
  {
    id: "task-104",
    title: "Configurar pipeline CI/CD no GitHub Actions",
    description: "Automatizar build, testes unitários e deploy da aplicação em ambiente de homologação.",
    category: "DevOps",
    priority: "Alta",
    status: "a-fazer",
    dueDate: "2026-10-26",
    assignee: "Carla Mendes"
  },
  {
    id: "task-105",
    title: "Desenvolver componentes reutilizáveis e Props",
    description: "Modularizar Cards, Badges, Modais e filtros desacoplando lógica de apresentação.",
    category: "Frontend",
    priority: "Alta",
    status: "a-fazer",
    dueDate: "2026-10-27",
    assignee: "Henrique Coutinho"
  },
  {
    id: "task-106",
    title: "Criar suite de testes automatizados com Jest",
    description: "Garantir cobertura mínima de 80% nos serviços principais e componentes de renderização condicional.",
    category: "QA",
    priority: "Média",
    status: "a-fazer",
    dueDate: "2026-10-28",
    assignee: "Lucas Rocha"
  }
];

export const CATEGORIES = [
  "Todas",
  "Frontend",
  "Backend",
  "Design",
  "DevOps",
  "Performance",
  "QA"
];

export const PRIORITIES = [
  { label: "Todas", value: "todas" },
  { label: "Alta", value: "Alta" },
  { label: "Média", value: "Média" },
  { label: "Baixa", value: "Baixa" }
];

export const STATUS_COLUMNS = [
  { id: "a-fazer", title: "A Fazer", description: "Tarefas no backlog prontas para iniciar", color: "#f97316" },
  { id: "em-progresso", title: "Em Progresso", description: "Itens sendo desenvolvidos atualmente", color: "#ff8c00" },
  { id: "concluido", title: "Concluído", description: "Tarefas testadas e finalizadas com sucesso", color: "#22c55e" }
];
