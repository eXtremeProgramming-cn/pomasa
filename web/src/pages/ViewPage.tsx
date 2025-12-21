import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

interface MasInfo {
  name: string
  path: string
  tree: FileNode[]
}

function FileTree({
  nodes,
  onSelect,
  selectedPath,
  expandedPaths,
  onToggle
}: {
  nodes: FileNode[]
  onSelect: (path: string) => void
  selectedPath: string | null
  expandedPaths: Set<string>
  onToggle: (path: string) => void
}) {
  return (
    <ul className="pl-2">
      {nodes.map((node) => (
        <li key={node.path}>
          <div
            className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 ${
              selectedPath === node.path ? 'bg-blue-100' : ''
            }`}
            onClick={() => {
              if (node.type === 'directory') {
                onToggle(node.path)
              } else {
                onSelect(node.path)
              }
            }}
          >
            {node.type === 'directory' ? (
              <>
                {expandedPaths.has(node.path) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500 mr-1" />
                )}
                <Folder className="w-4 h-4 text-yellow-500 mr-2" />
              </>
            ) : (
              <>
                <span className="w-4 mr-1" />
                <FileText className="w-4 h-4 text-gray-400 mr-2" />
              </>
            )}
            <span className="text-sm truncate">{node.name}</span>
          </div>
          {node.type === 'directory' && node.children && expandedPaths.has(node.path) && (
            <FileTree
              nodes={node.children}
              onSelect={onSelect}
              selectedPath={selectedPath}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ViewPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const masPath = searchParams.get('path')

  const [masInfo, setMasInfo] = useState<MasInfo | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!masPath) {
      navigate('/')
      return
    }

    const fetchMasInfo = async () => {
      try {
        const response = await fetch(`/api/mas/info?path=${encodeURIComponent(masPath)}`)
        if (!response.ok) {
          throw new Error(t('view.failedToLoadMas'))
        }
        const data = await response.json()
        setMasInfo(data)

        // Expand root directories by default
        const rootPaths = new Set<string>()
        data.tree.forEach((node: FileNode) => {
          if (node.type === 'directory') {
            rootPaths.add(node.path)
          }
        })
        setExpandedPaths(rootPaths)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMasInfo()
  }, [masPath, navigate, t])

  useEffect(() => {
    if (!selectedFile) {
      setFileContent('')
      return
    }

    const fetchFileContent = async () => {
      try {
        const response = await fetch(`/api/mas/file?path=${encodeURIComponent(selectedFile)}`)
        if (!response.ok) {
          throw new Error(t('view.failedToLoadFile'))
        }
        const data = await response.json()
        setFileContent(data.content)
      } catch (err) {
        setFileContent(`${t('common.error')}: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    fetchFileContent()
  }, [selectedFile, t])

  const handleToggle = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t('view.loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:underline"
        >
          {t('view.backToHome')}
        </button>
      </div>
    )
  }

  const isMarkdown = selectedFile?.endsWith('.md')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title={t('view.backToHome')}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">{masInfo?.name}</h1>
        <span className="text-sm text-gray-500 truncate flex-1">{masInfo?.path}</span>
        <LanguageSwitcher />
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar - File tree */}
        <aside className="w-72 border-r bg-gray-50 overflow-y-auto">
          <div className="p-2">
            {masInfo && (
              <FileTree
                nodes={masInfo.tree}
                onSelect={setSelectedFile}
                selectedPath={selectedFile}
                expandedPaths={expandedPaths}
                onToggle={handleToggle}
              />
            )}
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          {selectedFile ? (
            <div>
              <h2 className="text-sm text-gray-500 mb-4 font-mono">
                {selectedFile.replace(masPath + '/', '')}
              </h2>
              {isMarkdown ? (
                <article className="prose prose-slate lg:prose-lg max-w-none prose-headings:border-b prose-headings:pb-2 prose-headings:border-gray-200 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-table:border prose-th:bg-gray-100 prose-th:p-2 prose-td:p-2 prose-td:border">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {fileContent}
                  </ReactMarkdown>
                </article>
              ) : (
                <pre className="text-sm font-mono whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {fileContent}
                </pre>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-20">
              {t('view.selectFileToView')}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
