import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function FilterChips() {
  const {
    filters,
    toggleArrayFilter,
    updateFilter,
    clearFilters,
    activeFilterCount,
  } = useApp()

  if (activeFilterCount === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Search chip */}
      {filters.search && (
        <Chip
          label={`Search: "${filters.search}"`}
          onRemove={() => updateFilter('search', '')}
        />
      )}

      {/* Category chips */}
      {filters.categories.map(cat => (
        <Chip
          key={cat}
          label={cat}
          onRemove={() => toggleArrayFilter('categories', cat)}
        />
      ))}

      {/* Difficulty chips */}
      {filters.difficulties.map(diff => (
        <Chip
          key={diff}
          label={diff.charAt(0).toUpperCase() + diff.slice(1)}
          onRemove={() => toggleArrayFilter('difficulties', diff)}
        />
      ))}

      {/* Seniority chips */}
      {filters.seniorities.map(level => (
        <Chip
          key={level}
          label={level.charAt(0).toUpperCase() + level.slice(1)}
          onRemove={() => toggleArrayFilter('seniorities', level)}
        />
      ))}

      {/* Status chip */}
      {filters.status !== 'all' && (
        <Chip
          label={`Status: ${filters.status}`}
          onRemove={() => updateFilter('status', 'all')}
        />
      )}

      {/* Clear all */}
      {activeFilterCount > 1 && (
        <button
          onClick={clearFilters}
          className="px-3 py-1 text-xs text-primary hover:text-primary-dark hover:underline transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  )
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}
