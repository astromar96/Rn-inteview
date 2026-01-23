import { useEffect, useMemo } from 'react'
import { X, TrendingUp, Target, Award, BookOpen } from 'lucide-react'
import { useApp, CATEGORIES, DIFFICULTIES, SENIORITIES } from '../context/AppContext'
import clsx from 'clsx'

export function Analytics({ onClose }) {
  const { questionsData, completedIds, bookmarkedIds } = useApp()

  // Calculate analytics data
  const analytics = useMemo(() => {
    // Category breakdown
    const categoryStats = CATEGORIES.map(category => {
      const questions = questionsData.filter(q => q.category === category)
      const completed = questions.filter(q => completedIds.has(q.id)).length
      return {
        name: category,
        total: questions.length,
        completed,
        percentage: Math.round((completed / questions.length) * 100) || 0,
        icon: questions[0]?.icon || '📚'
      }
    }).sort((a, b) => b.total - a.total)

    // Difficulty breakdown
    const difficultyStats = DIFFICULTIES.map(diff => {
      const questions = questionsData.filter(q => q.difficulty === diff)
      const completed = questions.filter(q => completedIds.has(q.id)).length
      return {
        name: diff,
        total: questions.length,
        completed,
        percentage: Math.round((completed / questions.length) * 100) || 0
      }
    })

    // Seniority breakdown
    const seniorityStats = SENIORITIES.map(level => {
      const questions = questionsData.filter(q => q.seniority === level)
      const completed = questions.filter(q => completedIds.has(q.id)).length
      return {
        name: level,
        total: questions.length,
        completed,
        percentage: Math.round((completed / questions.length) * 100) || 0
      }
    })

    // Weak areas (lowest completion %)
    const weakAreas = categoryStats
      .filter(c => c.total >= 2 && c.percentage < 50)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 5)

    // Strong areas (highest completion %)
    const strongAreas = categoryStats
      .filter(c => c.total >= 2 && c.percentage >= 50)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5)

    return {
      total: questionsData.length,
      completed: completedIds.size,
      bookmarked: bookmarkedIds.size,
      percentage: Math.round((completedIds.size / questionsData.length) * 100),
      categoryStats,
      difficultyStats,
      seniorityStats,
      weakAreas,
      strongAreas
    }
  }, [questionsData, completedIds, bookmarkedIds])

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

  const difficultyColors = {
    beginner: 'bg-success',
    intermediate: 'bg-warning',
    advanced: 'bg-error'
  }

  const seniorityLabels = {
    junior: '🌱 Junior',
    mid: '🌿 Mid',
    senior: '🌳 Senior',
    staff: '🏔️ Staff+'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-end/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-gradient-end" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">Progress Analytics</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-elevated rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-text-muted mb-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Total</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{analytics.total}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-success mb-2">
                <Target className="w-4 h-4" />
                <span className="text-sm">Completed</span>
              </div>
              <p className="text-2xl font-bold text-success">{analytics.completed}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-warning mb-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">Bookmarked</span>
              </div>
              <p className="text-2xl font-bold text-warning">{analytics.bookmarked}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl p-4 border border-border">
              <div className="flex items-center gap-2 text-primary mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Progress</span>
              </div>
              <p className="text-2xl font-bold text-primary">{analytics.percentage}%</p>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-surface-elevated rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-text-primary mb-4">By Difficulty</h3>
            <div className="space-y-3">
              {analytics.difficultyStats.map(stat => (
                <div key={stat.name} className="flex items-center gap-3">
                  <span className="w-28 text-sm text-text-secondary capitalize">{stat.name}</span>
                  <div className="flex-1 h-4 bg-surface rounded-full overflow-hidden">
                    <div
                      className={clsx("h-full transition-all", difficultyColors[stat.name])}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <span className="w-20 text-sm text-text-muted text-right">
                    {stat.completed}/{stat.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Seniority Breakdown */}
          <div className="bg-surface-elevated rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-text-primary mb-4">By Seniority Level</h3>
            <div className="space-y-3">
              {analytics.seniorityStats.map(stat => (
                <div key={stat.name} className="flex items-center gap-3">
                  <span className="w-28 text-sm text-text-secondary">{seniorityLabels[stat.name]}</span>
                  <div className="flex-1 h-4 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-gradient-end transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <span className="w-20 text-sm text-text-muted text-right">
                    {stat.completed}/{stat.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weak & Strong Areas */}
          <div className="grid md:grid-cols-2 gap-4">
            {analytics.weakAreas.length > 0 && (
              <div className="bg-surface-elevated rounded-xl p-4 border border-error/30">
                <h3 className="font-semibold text-error mb-3">Needs Work</h3>
                <div className="space-y-2">
                  {analytics.weakAreas.map(area => (
                    <div key={area.name} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{area.icon} {area.name}</span>
                      <span className="text-error">{area.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {analytics.strongAreas.length > 0 && (
              <div className="bg-surface-elevated rounded-xl p-4 border border-success/30">
                <h3 className="font-semibold text-success mb-3">Strong Areas</h3>
                <div className="space-y-2">
                  {analytics.strongAreas.map(area => (
                    <div key={area.name} className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{area.icon} {area.name}</span>
                      <span className="text-success">{area.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Details */}
          <div className="bg-surface-elevated rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-text-primary mb-4">All Categories</h3>
            <div className="grid gap-2 max-h-64 overflow-y-auto">
              {analytics.categoryStats.map(cat => (
                <div key={cat.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="flex-1 text-sm text-text-secondary truncate">{cat.name}</span>
                  <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className={clsx(
                        "h-full transition-all",
                        cat.percentage >= 80 ? "bg-success" :
                        cat.percentage >= 50 ? "bg-primary" :
                        cat.percentage >= 25 ? "bg-warning" : "bg-error"
                      )}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <span className="w-16 text-xs text-text-muted text-right">
                    {cat.completed}/{cat.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-surface-elevated">
          <button
            onClick={onClose}
            className="w-full py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
