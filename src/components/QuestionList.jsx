import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { QuestionCard } from './QuestionCard'
import { FilterChips } from './FilterChips'
import clsx from 'clsx'

function CategorySection({ category, icon, questions, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const { completedIds } = useApp()

  const completedCount = questions.filter(q => completedIds.has(q.id)).length

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors"
      >
        <span className="text-xl">{icon}</span>
        <span className="flex-1 text-left font-semibold text-text-primary">
          {category}
        </span>
        <span className="text-sm text-text-muted">
          {completedCount}/{questions.length}
        </span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-text-muted" />
        ) : (
          <ChevronRight className="w-5 h-5 text-text-muted" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2 pl-2">
          {questions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  )
}

export function QuestionList() {
  const { groupedQuestions, filteredQuestions, stats, filters } = useApp()

  const categories = Object.keys(groupedQuestions)

  // Show flat list when sorted by something other than category
  const showFlatList = filters.sortBy !== 'category'

  if (filteredQuestions.length === 0) {
    return (
      <div className="flex-1 p-6">
        <FilterChips />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No questions match your filters
          </h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your filters or search term
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
      <FilterChips />

      {/* Results count */}
      <div className="mb-4 text-sm text-text-muted">
        Showing {stats.filtered} of {stats.total} questions
      </div>

      {/* Flat list view */}
      {showFlatList && (
        <div className="space-y-2">
          {filteredQuestions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}

      {/* Grouped by category view */}
      {!showFlatList && categories.map(category => (
        <CategorySection
          key={category}
          category={category}
          icon={groupedQuestions[category].icon}
          questions={groupedQuestions[category].questions}
        />
      ))}
    </div>
  )
}
