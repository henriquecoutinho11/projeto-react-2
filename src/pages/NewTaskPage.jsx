import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  RotateCcw, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  X, 
  Calendar, 
  User, 
  Tag, 
  FileText 
} from 'lucide-react';
import { CATEGORIES } from '../data/initialTasks';

/**
 * CONCEITO 7: STATE & useState - Estados controlados para formulário, tags dinâmicas e mensagens de erro
 * CONCEITO 8: FORMULÁRIOS - Controlled Components, validação em tempo real, prevenção de submit padrão (e.preventDefault)
 * CONCEITO 11: REACT ROUTER - Uso do hook useNavigate() para redirecionamento programático após o salvamento
 */
export default function NewTaskPage({ onAddTask }) {
  const navigate = useNavigate();

  // CONCEITO 7: STATE & useState - Estado único agrupando os campos do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    priority: 'Média',
    status: 'a-fazer',
    dueDate: new Date().toISOString().split('T')[0],
    assignee: ''
  });

  // Estado para tags adicionais customizadas
  const [tags, setTags] = useState(['React', 'Frontend']);
  const [newTagInput, setNewTagInput] = useState('');

  // Estado para validação de erros e campos tocados
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manipulador genérico para campos controlados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove erro do campo ao digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Manipulador para adicionar tag customizada
  const handleAddTag = () => {
    const trimmed = newTagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setNewTagInput('');
    }
  };

  // Manipulador para remover tag
  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Resetar formulário
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Frontend',
      priority: 'Média',
      status: 'a-fazer',
      dueDate: new Date().toISOString().split('T')[0],
      assignee: ''
    });
    setTags(['React']);
    setErrors({});
    setIsSubmitted(false);
  };

  // CONCEITO 8: FORMULÁRIOS - Submissão controlada com prevenção padrão e validação
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página pelo navegador

    const validationErrors = {};
    if (!formData.title.trim()) {
      validationErrors.title = 'O título é obrigatório (mínimo 3 caracteres).';
    } else if (formData.title.trim().length < 3) {
      validationErrors.title = 'O título deve ter pelo menos 3 caracteres.';
    }

    if (!formData.description.trim()) {
      validationErrors.description = 'A descrição detalhada da tarefa é obrigatória.';
    }

    if (!formData.assignee.trim()) {
      validationErrors.assignee = 'Informe o desenvolvedor responsável pela tarefa.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Criação do novo objeto de tarefa
    const newTask = {
      id: `task-${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      assignee: formData.assignee.trim(),
      tags: tags
    };

    onAddTask(newTask);
    setIsSubmitted(true);

    // CONCEITO 11: REACT ROUTER - Redireciona para a rota raiz do Kanban
    setTimeout(() => {
      navigate('/');
    }, 400);
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px' }}>
      {/* Botão de Voltar */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <ArrowLeft size={16} />
          Voltar para o Quadro Kanban
        </Link>
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Cabeçalho do Formulário */}
        <header
          style={{
            padding: '24px 28px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Criar Nova Tarefa
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
                Conceito 8: Formulários
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Formulário 100% controlado com validação em tempo real e redirecionamento via React Router
            </p>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            * Campos obrigatórios
          </div>
        </header>

        {/* CONCEITO 8: FORMULÁRIOS - Tag <form> com onSubmit controlado */}
        <form onSubmit={handleSubmit} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Título com Contador de Caracteres */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Título da Tarefa *
              </label>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: formData.title.length > 70 ? 'var(--color-danger)' : 'var(--text-muted)'
                }}
              >
                {formData.title.length}/80 caracteres
              </span>
            </div>

            <input
              type="text"
              name="title"
              maxLength={80}
              placeholder="Ex: Implementar cache com Redis no microsserviço de autenticação"
              value={formData.title}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                borderColor: errors.title ? 'var(--color-danger)' : 'var(--border-default)'
              }}
            />

            {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL da mensagem de erro */}
            {errors.title && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'var(--color-danger)', marginTop: '5px' }}>
                <AlertCircle size={13} /> {errors.title}
              </span>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Descrição e Critérios de Aceitação *
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Explique o que precisa ser feito, quais endpoints ou componentes serão afetados..."
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                resize: 'vertical',
                minHeight: '90px',
                borderColor: errors.description ? 'var(--color-danger)' : 'var(--border-default)'
              }}
            />

            {errors.description && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'var(--color-danger)', marginTop: '5px' }}>
                <AlertCircle size={13} /> {errors.description}
              </span>
            )}
          </div>

          {/* Grade: Categoria, Prioridade e Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {/* Categoria */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              >
                {CATEGORIES.filter((c) => c !== 'Todas').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Prioridade */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Prioridade *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Alta">Alta (Crítica)</option>
                <option value="Média">Média (Padrão)</option>
                <option value="Baixa">Baixa (Pode esperar)</option>
              </select>
            </div>

            {/* Status / Coluna Inicial */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Coluna / Status Inicial *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="a-fazer">A Fazer (Backlog)</option>
                <option value="em-progresso">Em Progresso (Doing)</option>
                <option value="concluido">Concluído (Done)</option>
              </select>
            </div>
          </div>

          {/* Grade: Prazo de Entrega e Responsável */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <Calendar size={14} /> Prazo de Entrega
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <User size={14} /> Desenvolvedor Responsável *
              </label>
              <input
                type="text"
                name="assignee"
                placeholder="Ex: Henrique Coutinho"
                value={formData.assignee}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  borderColor: errors.assignee ? 'var(--color-danger)' : 'var(--border-default)'
                }}
              />
              {errors.assignee && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'var(--color-danger)', marginTop: '5px' }}>
                  <AlertCircle size={13} /> {errors.assignee}
                </span>
              )}
            </div>
          </div>

          {/* Tags Dinâmicas com State */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <Tag size={14} /> Tags Dinâmicas da Tarefa
            </label>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Adicionar tag (ex: Docker, GraphQL, Testes)..."
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem'
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                style={{
                  padding: '9px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>

            {/* Listas e Keys de Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--orange-subtle)',
                    color: 'var(--orange-primary)',
                    border: '1px solid var(--orange-glow)'
                  }}
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    style={{ color: 'var(--orange-primary)', display: 'flex', alignItems: 'center' }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Botões de Ação do Formulário */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              marginTop: '10px'
            }}
          >
            <button
              type="button"
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <RotateCcw size={15} />
              Limpar Formulário
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                to="/"
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none'
                }}
              >
                Cancelar
              </Link>

              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#000000',
                  backgroundColor: 'var(--orange-primary)',
                  boxShadow: 'var(--shadow-orange)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-primary)')}
              >
                <Check size={18} strokeWidth={2.8} />
                Salvar Tarefa
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
