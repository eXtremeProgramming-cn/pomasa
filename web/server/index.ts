import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs/promises'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

async function buildFileTree(dirPath: string): Promise<FileNode[]> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const nodes: FileNode[] = []

  // 排序：目录在前，文件在后
  const sortedEntries = entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1
    if (!a.isDirectory() && b.isDirectory()) return 1
    return a.name.localeCompare(b.name)
  })

  for (const entry of sortedEntries) {
    // 跳过隐藏文件和node_modules
    if (entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue
    }

    const fullPath = path.join(dirPath, entry.name)
    const node: FileNode = {
      name: entry.name,
      path: fullPath,
      type: entry.isDirectory() ? 'directory' : 'file'
    }

    if (entry.isDirectory()) {
      node.children = await buildFileTree(fullPath)
    }

    nodes.push(node)
  }

  return nodes
}

// 打开文件夹选择对话框
app.post('/api/dialog/select-folder', async (_req, res) => {
  try {
    // 使用 osascript 打开 macOS 原生文件夹选择对话框
    const { stdout } = await execAsync(`osascript -e 'POSIX path of (choose folder with prompt "选择MAS目录")'`)
    const selectedPath = stdout.trim().replace(/\/$/, '') // 移除末尾斜杠
    res.json({ path: selectedPath })
  } catch (error) {
    // 用户取消选择
    res.json({ path: null })
  }
})

// 获取MAS信息
app.get('/api/mas/info', async (req, res) => {
  const masPath = req.query.path as string
  if (!masPath) {
    return res.status(400).json({ error: 'Missing path parameter' })
  }

  try {
    const stat = await fs.stat(masPath)
    if (!stat.isDirectory()) {
      return res.status(400).json({ error: 'Path is not a directory' })
    }

    const tree = await buildFileTree(masPath)
    const name = path.basename(masPath)

    res.json({
      name,
      path: masPath,
      tree
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' })
  }
})

// 读取文件内容
app.get('/api/mas/file', async (req, res) => {
  const filePath = req.query.path as string
  if (!filePath) {
    return res.status(400).json({ error: 'Missing path parameter' })
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    res.json({ content })
  } catch (error) {
    res.status(500).json({ error: 'Failed to read file' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
