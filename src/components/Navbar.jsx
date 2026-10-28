import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  Kanban, 
  PlusCircle, 
  Globe2, 
  BookOpen, 
  Cpu, 
  Clock, 
  Eye, 
  EyeOff 
} from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS
 * CONCEITO 9: useEffect - Relógio em tempo real da Sprint com função de limpeza (cleanup)
 * CONCEITO 11: REACT ROUTER - Uso de NavLink com classes ativas dinâmicas e navegação SPA
 */
export default function Navbar({
  tasksCount = 0,
  onOpenVdomModal,
  highlightVdomUpdates,
  onToggleHighlight
}) {
  // CONCEITO 7: STATE & useState - Estado para o relógio da sprint
  const [sprintTime, setSprintTime] = useState(new Date().toLocaleTimeString('pt-BR'));

  // CONCEITO 9: useEffect - Atualização a cada segundo com função de limpeza (cleanup)
  // Essencial para evitar vazamento de memória (memory leaks) quando o componente for desmontado.
  useEffect(() => {
    const timerId = setInterval(() => {
      setSprintTime(new Date().toLocaleTimeString('pt-BR'));
    }, 1000);

    // Função de limpeza executada quando o componente desmonta
    return () => clearInterval(timerId);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        {/* Logo / Home */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--orange-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              boxShadow: 'var(--shadow-orange)'
            }}
          >
            <FolderGit2 size={22} strokeWidth={2.4} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}
              >
                Dev<span style={{ color: 'var(--orange-primary)' }}>Flow</span>
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  backgroundColor: 'var(--orange-subtle)',
                  color: 'var(--orange-primary)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--orange-glow)'
                }}
              >
                11 Conceitos React
              </span>
            </div>
          </div>
        </Link>

        {/* CONCEITO 11: REACT ROUTER - Links de navegação via NavLink */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
          >
            <Kanban size={15} />
            Quadro Kanban
            {tasksCount > 0 && (
              <span className="nav-badge">{tasksCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/nova-tarefa"
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
          >
            <PlusCircle size={15} />
            Nova Tarefa (Formulário)
          </NavLink>

          <NavLink
            to="/integracao-api"
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
          >
            <Globe2 size={15} />
            Consumo de API
          </NavLink>

          <NavLink
            to="/conceitos"
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
          >
            <BookOpen size={15} />
            11 Conceitos
          </NavLink>
        </div>

        {/* Ações Rápidas: Relógio com useEffect e Inspetor do Virtual DOM */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* CONCEITO 9: useEffect demonstrado com relógio */}
          <div
            title="Relógio sincronizado via useEffect (com clearInterval no cleanup)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <Clock size={13} color="var(--orange-primary)" />
            <span>{sprintTime}</span>
          </div>

          {/* Toggle de Realce Visual do Virtual DOM */}
          <button
            onClick={onToggleHighlight}
            title="Ativar/Desativar efeito visual quando nós do Virtual DOM são atualizados"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.74rem',
              fontWeight: 500,
              color: highlightVdomUpdates ? 'var(--orange-primary)' : 'var(--text-muted)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: highlightVdomUpdates ? '1px solid var(--orange-primary)' : '1px solid var(--border-subtle)'
            }}
          >
            {highlightVdomUpdates ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>vDOM: {highlightVdomUpdates ? 'ON' : 'OFF'}</span>
          </button>

          {/* Botão de abrir modal do VDOM */}
          <button
            onClick={onOpenVdomModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#000000',
              backgroundColor: 'var(--orange-primary)',
              boxShadow: 'var(--shadow-orange)'
            }}
          >
            <Cpu size={14} />
            Virtual DOM
          </button>
        </div>
      </div>
    </nav>
  );
}
