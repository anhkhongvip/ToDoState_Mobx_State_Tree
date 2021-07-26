import jsonServer from 'json-server'
import TodoItems from './TodoItems'
const server = jsonServer.create()
const router = jsonServer.router({TodoItems})
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// Use default router
server.use('/api', router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})