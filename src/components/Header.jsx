import { RotateCcw, Menu } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Header() {
  const { stats, resetProgress, sidebarOpen, setSidebarOpen } = useApp()

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40">
      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl lg:text-2xl font-bold text-text-primary truncate">
              React Native Interview Prep
            </h1>
            <p className="text-sm text-text-secondary hidden sm:block">
              Master your next interview
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">
                  {stats.completed} / {stats.total} completed
                </span>
                <span className="text-primary font-semibold">
                  {stats.percentage}%
                </span>
              </div>
              <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

            {/* Mobile progress */}
            <div className="sm:hidden flex items-center gap-2">
              <span className="text-primary font-semibold text-sm">
                {stats.percentage}%
              </span>
              <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-gradient-end transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
              title="Reset all progress"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
