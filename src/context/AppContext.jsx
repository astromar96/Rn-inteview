import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import { questionsData } from '../data/questions'

const AppContext = createContext()

const STORAGE_KEY = 'rn-interview-completed'

// Extract unique values for filter options
export const CATEGORIES = [...new Set(questionsData.map(q => q.category))]
export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced']
export const SENIORITIES = ['junior', 'mid', 'senior', 'staff']

const initialFilters = {
  search: '',
  categories: [],
  difficulties: [],
  seniorities: [],
  status: 'all', // 'all' | 'pending' | 'completed'
  sortBy: 'category', // 'category' | 'difficulty' | 'seniority' | 'alphabetical'
}

export function AppProvider({ children }) {
  // Load completed from localStorage
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  const [filters, setFilters] = useState(initialFilters)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Persist completed to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedIds]))
  }, [completedIds])

  // Toggle question completion
  const toggleComplete = useCallback((id) => {
    setCompletedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // Reset all progress
  const resetProgress = useCallback(() => {
    setCompletedIds(new Set())
  }, [])

  // Filter helpers
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const toggleArrayFilter = useCallback((key, value) => {
    setFilters(prev => {
      const current = prev[key]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [key]: updated }
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    count += filters.categories.length
    count += filters.difficulties.length
    count += filters.seniorities.length
    if (filters.status !== 'all') count++
    return count
  }, [filters])

  // Filter and sort questions
  const filteredQuestions = useMemo(() => {
    let result = questionsData

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(q =>
        q.question.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query)
      )
    }

    // Category filter (multi-select)
    if (filters.categories.length > 0) {
      result = result.filter(q => filters.categories.includes(q.category))
    }

    // Difficulty filter (multi-select)
    if (filters.difficulties.length > 0) {
      result = result.filter(q => filters.difficulties.includes(q.difficulty))
    }

    // Seniority filter (multi-select)
    if (filters.seniorities.length > 0) {
      result = result.filter(q => filters.seniorities.includes(q.seniority))
    }

    // Status filter
    if (filters.status === 'completed') {
      result = result.filter(q => completedIds.has(q.id))
    } else if (filters.status === 'pending') {
      result = result.filter(q => !completedIds.has(q.id))
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'difficulty': {
          const order = { beginner: 0, intermediate: 1, advanced: 2 }
          return order[a.difficulty] - order[b.difficulty]
        }
        case 'seniority': {
          const order = { junior: 0, mid: 1, senior: 2, staff: 3 }
          return order[a.seniority] - order[b.seniority]
        }
        case 'alphabetical':
          return a.question.localeCompare(b.question)
        case 'category':
        default:
          return a.category.localeCompare(b.category)
      }
    })

    return result
  }, [filters, completedIds])

  // Group by category for display
  const groupedQuestions = useMemo(() => {
    const groups = {}
    filteredQuestions.forEach(q => {
      if (!groups[q.category]) {
        groups[q.category] = { icon: q.icon, questions: [] }
      }
      groups[q.category].questions.push(q)
    })
    return groups
  }, [filteredQuestions])

  // Stats
  const stats = useMemo(() => ({
    total: questionsData.length,
    completed: completedIds.size,
    filtered: filteredQuestions.length,
    percentage: Math.round((completedIds.size / questionsData.length) * 100),
  }), [completedIds, filteredQuestions])

  // Category counts for filter panel
  const categoryCounts = useMemo(() => {
    const counts = {}
    questionsData.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1
    })
    return counts
  }, [])

  const difficultyCounts = useMemo(() => {
    const counts = {}
    questionsData.forEach(q => {
      counts[q.difficulty] = (counts[q.difficulty] || 0) + 1
    })
    return counts
  }, [])

  const seniorityCounts = useMemo(() => {
    const counts = {}
    questionsData.forEach(q => {
      counts[q.seniority] = (counts[q.seniority] || 0) + 1
    })
    return counts
  }, [])

  const value = {
    // Data
    questionsData,
    filteredQuestions,
    groupedQuestions,
    stats,

    // Completion
    completedIds,
    toggleComplete,
    resetProgress,

    // Filters
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    activeFilterCount,

    // Filter counts
    categoryCounts,
    difficultyCounts,
    seniorityCounts,

    // Modal
    selectedQuestion,
    setSelectedQuestion,

    // UI
    sidebarOpen,
    setSidebarOpen,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
