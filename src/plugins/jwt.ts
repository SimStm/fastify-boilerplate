import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import { FastifyPluginAsync } from 'fastify'
import boom from '@hapi/boom'

const configuration = require('../config/configuration')

const ROUTES_TO_IGNORE = ['/users/auth', '/api-docs']

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, response: any) => void
  }
}

const jwtPlugin: FastifyPluginAsync = fp(async (server, options) => {
  server.register(fastifyJwt, {
    secret: configuration.default.secretKey
  })

  server.decorate('authenticate', async (request: any, response: any) => {
    try {
      await request.jwtVerify()
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  server.addHook('onRequest', async (request, response) => {
    for (const routeToIgnore of ROUTES_TO_IGNORE)
      if (request.url.startsWith(routeToIgnore)) return

    return await server.authenticate(request, response)
  })
})

export default jwtPlugin
