import { useEffect, useCallback } from 'react'
import { X, Check, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import clsx from 'clsx'

export function QuestionModal() {
  const { selectedQuestion, setSelectedQuestion, completedIds, toggleComplete } = useApp()

  const handleClose = useCallback(() => {
    setSelectedQuestion(null)
  }, [setSelectedQuestion])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedQuestion) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedQuestion])

  if (!selectedQuestion) return null

  const isCompleted = completedIds.has(selectedQuestion.id)

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-text-primary leading-relaxed mb-3">
                {selectedQuestion.question}
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className={clsx(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  difficultyStyles[selectedQuestion.difficulty]
                )}>
                  {selectedQuestion.difficulty}
                </span>
                {selectedQuestion.seniority && (
                  <span className={clsx(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    seniorityStyles[selectedQuestion.seniority]
                  )}>
                    {selectedQuestion.seniority}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface-elevated text-text-muted">
                  {selectedQuestion.icon} {selectedQuestion.category}
                </span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div
            className="answer-content"
            dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
          />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-surface-elevated flex items-center justify-between">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => toggleComplete(selectedQuestion.id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              isCompleted
                ? "bg-success/20 text-success hover:bg-success/30"
                : "bg-primary text-background hover:bg-primary-dark"
            )}
          >
            {isCompleted ? (
              <>
                <Check className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                Mark as Complete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
