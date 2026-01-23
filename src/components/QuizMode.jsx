import { useState, useEffect, useCallback } from 'react'
import { X, Eye, EyeOff, ChevronRight, ChevronLeft, RotateCcw, Trophy, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import clsx from 'clsx'

export function QuizMode({ onClose }) {
  const { filteredQuestions } = useApp()
  const [quizQuestions, setQuizQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)

  // Initialize quiz with shuffled questions
  useEffect(() => {
    const shuffled = [...filteredQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, filteredQuestions.length))
    setQuizQuestions(shuffled)
  }, [])

  // Timer
  useEffect(() => {
    if (isComplete) return
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime, isComplete])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentQuestion = quizQuestions[currentIndex]

  const handleMarkAnswer = (isCorrect) => {
    setScore(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }))

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    const shuffled = [...filteredQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, filteredQuestions.length))
    setQuizQuestions(shuffled)
    setCurrentIndex(0)
    setShowAnswer(false)
    setScore({ correct: 0, incorrect: 0 })
    setIsComplete(false)
  }

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (quizQuestions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-surface rounded-2xl border border-border p-8 text-center max-w-md">
          <p className="text-text-secondary mb-4">No questions available for quiz.</p>
          <p className="text-sm text-text-muted mb-6">Adjust your filters to include more questions.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-background rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const difficultyStyles = {
    beginner: 'bg-success/20 text-success',
    intermediate: 'bg-warning/20 text-warning',
    advanced: 'bg-error/20 text-error',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-text-primary">Quiz Mode</h2>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock className="w-4 h-4" />
              {formatTime(elapsedTime)}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-success">{score.correct} correct</span>
              <span className="text-text-muted">|</span>
              <span className="text-error">{score.incorrect} incorrect</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {isComplete ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <Trophy className="w-16 h-16 text-warning mb-4" />
            <h3 className="text-2xl font-bold text-text-primary mb-2">Quiz Complete!</h3>
            <p className="text-text-secondary mb-6">
              You got {score.correct} out of {quizQuestions.length} questions correct
            </p>
            <div className="text-4xl font-bold mb-6">
              <span className={clsx(
                (score.correct / quizQuestions.length) >= 0.8 ? "text-success" :
                (score.correct / quizQuestions.length) >= 0.6 ? "text-warning" : "text-error"
              )}>
                {Math.round((score.correct / quizQuestions.length) * 100)}%
              </span>
            </div>
            <p className="text-sm text-text-muted mb-6">
              Time: {formatTime(elapsedTime)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="flex-shrink-0 px-4 pt-4">
              <div className="flex items-center justify-between text-sm text-text-muted mb-2">
                <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
                <span className={clsx(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  difficultyStyles[currentQuestion.difficulty]
                )}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <span className="text-xs text-text-muted bg-surface-elevated px-2 py-1 rounded">
                  {currentQuestion.icon} {currentQuestion.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                {currentQuestion.question}
              </h3>

              {/* Answer */}
              {showAnswer ? (
                <div className="border-t border-border pt-6">
                  <div
                    className="answer-content"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.answer }}
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-surface-elevated border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-all"
                  >
                    <Eye className="w-5 h-5" />
                    Reveal Answer
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {showAnswer && (
              <div className="flex-shrink-0 p-4 border-t border-border bg-surface-elevated">
                <p className="text-sm text-text-muted text-center mb-3">
                  How did you do?
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleMarkAnswer(false)}
                    className="flex items-center gap-2 px-6 py-2 bg-error/20 text-error rounded-lg font-medium hover:bg-error/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Incorrect
                  </button>
                  <button
                    onClick={() => handleMarkAnswer(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-success/20 text-success rounded-lg font-medium hover:bg-success/30 transition-colors"
                  >
                    <Trophy className="w-4 h-4" />
                    Got it!
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
