import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FolderOpen, Plus } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleOpenMAS = async () => {
    try {
      const response = await fetch('/api/dialog/select-folder', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.path) {
        navigate(`/view?path=${encodeURIComponent(data.path)}`)
      }
    } catch (error) {
      console.error('Failed to open folder dialog:', error)
    }
  }

  const handleCreateMAS = () => {
    alert(t('home.createNotImplemented'))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with language switcher */}
      <header className="flex justify-end p-4">
        <LanguageSwitcher />
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('app.title')}</h1>
          <p className="text-lg text-gray-600">{t('app.subtitle')}</p>
        </div>

        <div className="flex gap-8 mb-12">
          <button
            onClick={handleOpenMAS}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500 cursor-pointer"
          >
            <FolderOpen className="w-16 h-16 text-blue-500 mb-4" />
            <span className="text-xl font-medium text-gray-700">{t('home.viewMas')}</span>
          </button>

          <button
            onClick={handleCreateMAS}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-green-500 cursor-pointer"
          >
            <Plus className="w-16 h-16 text-green-500 mb-4" />
            <span className="text-xl font-medium text-gray-700">{t('home.createMas')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
