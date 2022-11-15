import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

interface PrettifierResponse {
  statusCode: number
  data: any
  message?: string
}

interface Prettifier {
  response: (
    statusCode: number,
    data: any,
    message?: string
  ) => PrettifierResponse
}

declare module 'fastify' {
  interface FastifyInstance {
    pretty: Prettifier
  }
}

const friendlyResponsePlugin: FastifyPluginAsync = fp(
  async (server, options) => {
    const responseMethod = (
      statusCode: number,
      data: any,
      message: string | undefined = undefined
    ): PrettifierResponse => ({ statusCode, message, data })

    server.decorate('pretty', {
      response: responseMethod
    })
  }
)

export default friendlyResponsePlugin
