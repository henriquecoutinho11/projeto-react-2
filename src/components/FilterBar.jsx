import React from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';

/**
 * CONCEITO 2: COMPONENTS
 * CONCEITO 3: PROPS - Recebe filtros atuais e callbacks de alteração
 * CONCEITO 5: LISTAS E KEYS - Itera sobre as categorias e prioridades usando .map() e key única
 * CONCEITO 6: RENDERIZAÇÃO CONDICIONAL - Exibe botão de 'Resetar Filtros' apenas se houver filtros ativos
 */
export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  categories,
  priorities,
  onResetFilters,
  totalTasksCount,
  filteredTasksCount
}) {
  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'Todas' ||
    selectedPriority !== 'todas';

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Linha superior: Campo de busca e seletor de prioridade */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Campo de Busca */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Buscar por título, descrição ou responsável..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* Dropdown de Prioridade */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Prioridade:
          </span>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {/* CONCEITO 5: LISTAS E KEYS */}
            {priorities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* CONCEITO 6: RENDERIZAÇÃO CONDICIONAL */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--orange-primary)',
              backgroundColor: 'var(--orange-subtle)',
              border: '1px solid var(--orange-glow)'
            }}
            title="Limpar todos os filtros aplicados"
          >
            <RotateCcw size={13} />
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Linha inferior: Chips de categorias com .map() e contadores */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={12} /> Categoria:
          </span>

          {/* CONCEITO 5: LISTAS E KEYS com .map() */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--orange-primary)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#000000' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--orange-hover)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? '0 0 12px var(--orange-glow)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Indicador de resultados filtrados */}
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Mostrando <strong style={{ color: 'var(--orange-primary)' }}>{filteredTasksCount}</strong> de {totalTasksCount} tarefas
        </div>
      </div>
    </div>
  );
}
