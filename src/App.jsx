import { AppProvider } from './context/AppContext'
import { Header } from './components/Header'
import { FilterPanel } from './components/FilterPanel'
import { QuestionList } from './components/QuestionList'
import { QuestionModal } from './components/QuestionModal'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <FilterPanel />
          <main className="flex-1 flex flex-col overflow-hidden">
            <QuestionList />
          </main>
        </div>
        <QuestionModal />
      </div>
    </AppProvider>
  )
}

export default App
