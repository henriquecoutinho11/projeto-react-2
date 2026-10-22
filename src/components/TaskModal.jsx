import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, User, Tag, AlertTriangle } from 'lucide-react';
import { CATEGORIES } from '../data/initialTasks';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe 'isOpen', 'onClose', 'onSaveTask', 'initialData', 'defaultStatus'
 * CONCEITO 5: LISTAS E KEYS - Mapeamento dinâmico de opções do formulário
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - 
 *    - Se isOpen for falso, o componente retorna 'null' (não renderiza nada no DOM)
 *    - Altera títulos e botões dependendo se é criação ou edição
 */
export default function TaskModal({
  isOpen,
  onClose,
  onSaveTask,
  initialData = null,
  defaultStatus = 'a-fazer'
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    priority: 'Média',
    status: defaultStatus,
    dueDate: '',
    assignee: ''
  });

  const [errors, setErrors] = useState({});

  // Sincroniza dados quando o modal abre para edição ou criação
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Frontend',
        priority: 'Média',
        status: defaultStatus || 'a-fazer',
        dueDate: new Date().toISOString().split('T')[0],
        assignee: ''
      });
    }
    setErrors({});
  }, [initialData, defaultStatus, isOpen]);

  // CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Curto-circuito que impede a renderização no Virtual DOM
  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'O título da tarefa é obrigatório.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Salva a tarefa (adiciona ou edita)
    onSaveTask({
      ...formData,
      id: initialData ? initialData.id : `task-${Date.now()}`
    });

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(5px)',
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
          maxWidth: '520px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar no corpo do modal
      >
        {/* Cabeçalho do Modal */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div>
            {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Título dinâmico */}
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {initialData ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Preencha os campos para atualizar seu quadro no DevFlow
            </p>
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
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Título */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Título da Tarefa *
            </label>
            <input
              type="text"
              placeholder="Ex: Otimizar build do Webpack"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                borderColor: errors.title ? 'var(--color-danger)' : 'var(--border-default)'
              }}
            />
            {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL de erro */}
            {errors.title && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                {errors.title}
              </span>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Descrição Detalhada *
            </label>
            <textarea
              rows={3}
              placeholder="Descreva o escopo e os critérios de aceitação..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                resize: 'none',
                borderColor: errors.description ? 'var(--color-danger)' : 'var(--border-default)'
              }}
            />
            {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL de erro */}
            {errors.description && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
                {errors.description}
              </span>
            )}
          </div>

          {/* Linha dupla: Categoria e Prioridade */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              >
                {/* CONCEITO 5: LISTAS E KEYS */}
                {CATEGORIES.filter((c) => c !== 'Todas').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Prioridade
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
          </div>

          {/* Linha dupla: Data Limite e Responsável */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Prazo de Entrega
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Responsável
              </label>
              <input
                type="text"
                placeholder="Ex: Henrique"
                value={formData.assignee}
                onChange={(e) => handleChange('assignee', e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Status Inicial */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Coluna / Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem'
              }}
            >
              <option value="a-fazer">A Fazer (Backlog)</option>
              <option value="em-progresso">Em Progresso (Doing)</option>
              <option value="concluido">Concluído (Done)</option>
            </select>
          </div>

          {/* Rodapé do Modal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
              marginTop: '10px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 20px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#000000',
                backgroundColor: 'var(--orange-primary)',
                boxShadow: 'var(--shadow-orange)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--orange-primary)')}
            >
              <Check size={16} strokeWidth={2.5} />
              {initialData ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
