import { AppProvider, useApp } from './context/AppContext'
import { Header } from './components/Header'
import { FilterPanel } from './components/FilterPanel'
import { QuestionList } from './components/QuestionList'
import { QuestionModal } from './components/QuestionModal'
import { QuizMode } from './components/QuizMode'
import { Analytics } from './components/Analytics'

function AppContent() {
  const { quizModeOpen, setQuizModeOpen, analyticsOpen, setAnalyticsOpen } = useApp()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <FilterPanel />
        <main className="flex-1 flex flex-col overflow-hidden">
          <QuestionList />
        </main>
      </div>
      <QuestionModal />
      {quizModeOpen && <QuizMode onClose={() => setQuizModeOpen(false)} />}
      {analyticsOpen && <Analytics onClose={() => setAnalyticsOpen(false)} />}
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
