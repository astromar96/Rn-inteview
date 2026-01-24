import { Search, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useApp, CATEGORIES, DIFFICULTIES, SENIORITIES } from '../context/AppContext'
import clsx from 'clsx'

function FilterSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-surface-elevated transition-colors"
      >
        <span className="font-medium text-text-primary">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-text-muted" />
        ) : (
          <ChevronRight className="w-4 h-4 text-text-muted" />
        )}
      </button>
      {isOpen && (
        <div className="px-3 pb-3 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

function FilterCheckbox({ label, count, checked, onChange, color }) {
  return (
    <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-border bg-surface accent-primary"
      />
      <span className={clsx("flex-1 text-sm", checked ? "text-text-primary" : "text-text-secondary")}>
        {color && <span className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} />}
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-text-muted">({count})</span>
      )}
    </label>
  )
}

function FilterRadio({ label, value, currentValue, onChange }) {
  return (
    <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors">
      <input
        type="radio"
        checked={currentValue === value}
        onChange={() => onChange(value)}
        className="w-4 h-4 border-border bg-surface accent-primary"
      />
      <span className={clsx("text-sm", currentValue === value ? "text-text-primary" : "text-text-secondary")}>
        {label}
      </span>
    </label>
  )
}

export function FilterPanel() {
  const {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    activeFilterCount,
    stats,
    categoryCounts,
    difficultyCounts,
    seniorityCounts,
    sidebarOpen,
    setSidebarOpen,
  } = useApp()

  const difficultyColors = {
    beginner: 'bg-success',
    intermediate: 'bg-warning',
    advanced: 'bg-error',
  }

  const seniorityLabels = {
    junior: '🌱 Junior',
    mid: '🌿 Mid',
    senior: '🌳 Senior',
    staff: '🏔️ Staff+',
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:sticky top-0 lg:top-[73px] left-0 h-full lg:h-[calc(100vh-73px)] w-72 bg-surface border-r border-border z-50 lg:z-30",
          "transform transition-transform duration-200 ease-in-out",
          "overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-text-primary">Filters</h2>
            <p className="text-sm text-text-muted">
              {stats.filtered} of {stats.total} questions
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-surface-elevated"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => updateFilter('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-text-muted hover:text-text-primary" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <FilterSection title="Category" defaultOpen={false}>
          {CATEGORIES.map(category => (
            <FilterCheckbox
              key={category}
              label={category}
              count={categoryCounts[category]}
              checked={filters.categories.includes(category)}
              onChange={() => toggleArrayFilter('categories', category)}
            />
          ))}
        </FilterSection>

        {/* Difficulty Filter */}
        <FilterSection title="Difficulty">
          {DIFFICULTIES.map(diff => (
            <FilterCheckbox
              key={diff}
              label={diff.charAt(0).toUpperCase() + diff.slice(1)}
              count={difficultyCounts[diff]}
              checked={filters.difficulties.includes(diff)}
              onChange={() => toggleArrayFilter('difficulties', diff)}
              color={difficultyColors[diff]}
            />
          ))}
        </FilterSection>

        {/* Seniority Filter */}
        <FilterSection title="Seniority Level">
          {SENIORITIES.map(level => (
            <FilterCheckbox
              key={level}
              label={seniorityLabels[level]}
              count={seniorityCounts[level]}
              checked={filters.seniorities.includes(level)}
              onChange={() => toggleArrayFilter('seniorities', level)}
            />
          ))}
        </FilterSection>

        {/* Status Filter */}
        <FilterSection title="Status">
          <FilterRadio
            label="All Questions"
            value="all"
            currentValue={filters.status}
            onChange={(v) => updateFilter('status', v)}
          />
          <FilterRadio
            label="⭐ Bookmarked"
            value="bookmarked"
            currentValue={filters.status}
            onChange={(v) => updateFilter('status', v)}
          />
          <FilterRadio
            label="⊗ Skipped"
            value="skipped"
            currentValue={filters.status}
            onChange={(v) => updateFilter('status', v)}
          />
          <FilterRadio
            label="Pending"
            value="pending"
            currentValue={filters.status}
            onChange={(v) => updateFilter('status', v)}
          />
          <FilterRadio
            label="Completed"
            value="completed"
            currentValue={filters.status}
            onChange={(v) => updateFilter('status', v)}
          />
        </FilterSection>

        {/* Sort */}
        <FilterSection title="Sort By">
          <FilterRadio
            label="Category"
            value="category"
            currentValue={filters.sortBy}
            onChange={(v) => updateFilter('sortBy', v)}
          />
          <FilterRadio
            label="Difficulty"
            value="difficulty"
            currentValue={filters.sortBy}
            onChange={(v) => updateFilter('sortBy', v)}
          />
          <FilterRadio
            label="Seniority"
            value="seniority"
            currentValue={filters.sortBy}
            onChange={(v) => updateFilter('sortBy', v)}
          />
          <FilterRadio
            label="Alphabetical"
            value="alphabetical"
            currentValue={filters.sortBy}
            onChange={(v) => updateFilter('sortBy', v)}
          />
        </FilterSection>
      </aside>
    </>
  )
}
