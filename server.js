const express = require('express')
const path = require('path')
const fs = require('fs').promises

const app = express()
const PORT = process.env.PORT || 3000
const DATA_PATH = path.join(process.cwd(), 'data', 'nutrition_log.json')
const DEFAULT_DATA = { calendar: {}, plan: {} }

app.use(express.json())

async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : DEFAULT_DATA
  } catch {
    return {}
  }
}

async function writeData(data) {
  const dir = path.dirname(DATA_PATH)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

app.get('/api/nutrition-log', async (_req, res) => {
  try {
    const data = await readData()
    const result = Object.keys(data).length > 0 ? data : DEFAULT_DATA
    res.json(result)
  } catch {
    res.status(500).json({})
  }
})

app.post('/api/nutrition-log', async (req, res) => {
  try {
    const body = req.body
    const data =
      typeof body === 'object' && body !== null ? body : DEFAULT_DATA
    await writeData(data)
    res.json({ success: true })
  } catch {
    res.status(500).json({ success: false })
  }
})

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  const next = require('next')
  const nextApp = next({ dev: true, dir: __dirname })
  const handle = nextApp.getRequestHandler()
  nextApp.prepare().then(() => {
    app.all('*', (req, res) => handle(req, res))
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server ready at http://localhost:${PORT}`)
    })
  })
} else {
  const outDir = path.join(__dirname, 'out')
  app.use(express.static(outDir, { index: 'index.html' }))
  app.get('*', (req, res) => {
    const filePath = path.join(outDir, req.path)
    const indexPath = path.join(filePath, 'index.html')
    fs.stat(filePath)
      .then(stat =>
        stat.isDirectory()
          ? res.sendFile(indexPath)
          : res.sendFile(filePath)
      )
      .catch(() => res.sendFile(path.join(outDir, 'index.html')))
  })
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}
