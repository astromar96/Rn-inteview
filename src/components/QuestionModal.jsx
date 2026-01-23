import { useEffect, useCallback, useRef, useState } from 'react'
import { X, Check, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import clsx from 'clsx'

export function QuestionModal() {
  const { selectedQuestion, setSelectedQuestion, completedIds, toggleComplete } = useApp()
  const contentRef = useRef(null)

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

  // Add copy buttons to code blocks
  useEffect(() => {
    if (!contentRef.current || !selectedQuestion) return

    const preElements = contentRef.current.querySelectorAll('pre')

    preElements.forEach((pre) => {
      // Skip if already has copy button
      if (pre.querySelector('.copy-btn')) return

      // Make pre relative for absolute positioning
      pre.style.position = 'relative'

      // Create copy button
      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
      btn.title = 'Copy code'

      btn.onclick = async () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent || ''
        try {
          await navigator.clipboard.writeText(code)
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`
          btn.classList.add('copied')
          setTimeout(() => {
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
            btn.classList.remove('copied')
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      }

      pre.appendChild(btn)
    })
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
            ref={contentRef}
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
