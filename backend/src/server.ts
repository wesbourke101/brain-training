import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify({ logger: true })

// ── Start ─────────────────────────────────────────────────────────────────────
const start = async () => {
  // CORS — allow requests from the Next.js dev server
  await server.register(cors, {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
  })

  // ── Root ────────────────────────────────────────────────────────────────────
  server.get('/', async () => {
    return { name: 'brain-training-api', version: '0.0.1' }
  })

  // ── Health ──────────────────────────────────────────────────────────────────
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  try {
    await server.listen({ port: 3001, host: '0.0.0.0' })
    console.log('Server listening at http://localhost:3001')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
