import { Check, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import clsx from 'clsx'

export function QuestionCard({ question }) {
  const { completedIds, toggleComplete, setSelectedQuestion } = useApp()
  const isCompleted = completedIds.has(question.id)

  const handleCardClick = (e) => {
    // Don't open modal if clicking checkbox
    if (e.target.closest('.checkbox-area')) return
    setSelectedQuestion(question)
  }

  const handleCheckboxClick = (e) => {
    e.stopPropagation()
    toggleComplete(question.id)
  }

  const difficultyStyles = {
    beginner: 'bg-success/20 text-success',
    intermediate: 'bg-warning/20 text-warning',
    advanced: 'bg-error/20 text-error',
  }

  const seniorityStyles = {
    junior: 'bg-success/20 text-success',
    mid: 'bg-primary/20 text-primary',
    senior: 'bg-purple-500/20 text-purple-400',
    staff: 'bg-warning/20 text-warning',
  }

  return (
    <div
      onClick={handleCardClick}
      className={clsx(
        "group p-4 bg-surface-elevated rounded-xl border cursor-pointer",
        "transition-all duration-200",
        "hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5",
        isCompleted
          ? "border-success/50 bg-gradient-to-r from-surface-elevated to-success/5"
          : "border-border"
      )}
    >
      <div className="flex gap-3">
        {/* Checkbox */}
        <div
          className="checkbox-area flex-shrink-0 mt-0.5"
          onClick={handleCheckboxClick}
        >
          <div
            className={clsx(
              "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
              isCompleted
                ? "bg-success border-success"
                : "border-border hover:border-primary"
            )}
          >
            {isCompleted && <Check className="w-3 h-3 text-background" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Question text */}
          <p className={clsx(
            "text-sm font-medium leading-relaxed mb-3",
            isCompleted ? "text-text-secondary" : "text-text-primary"
          )}>
            {question.question}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={clsx(
              "px-2 py-0.5 rounded text-xs font-medium",
              difficultyStyles[question.difficulty]
            )}>
              {question.difficulty}
            </span>

            {question.seniority && (
              <span className={clsx(
                "px-2 py-0.5 rounded text-xs font-medium",
                seniorityStyles[question.seniority]
              )}>
                {question.seniority}
              </span>
            )}

            <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface text-text-muted">
              {question.category}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="flex-shrink-0 w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}
