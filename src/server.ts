import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import { join } from 'path'

import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import autoLoad from '@fastify/autoload'
import swagger from '@fastify/swagger'

import { setupSwaggerOptions } from './config/swagger'

const HOST = '0.0.0.0'
const PORT = Number(process.env.PORT) || 3000

export async function startServer() {
  const app = fastify({
    logger: { level: 'info' },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'true'
  })

  app.log.info(`--- Starting application...`)

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  app.log.info(`--- Loading plugins...`)
  const swaggerOptions = setupSwaggerOptions(HOST, PORT)
  app.register(swagger, swaggerOptions)
  app.register(cors)
  app.register(helmet, { contentSecurityPolicy: false })
  app.register(autoLoad, { dir: join(__dirname, 'plugins') })
  app.log.info(`--- All plugins loaded!`)

  // This loads all plugins defined in services
  // define your routes in one of these
  app.log.info(`--- Loading Routes...`)
  app.register(autoLoad, { dir: join(__dirname, 'routes'), routeParams: true })
  app.log.info(`--- Routes loaded!`)

  try {
    await app.listen({ port: PORT, host: HOST })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
