import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

interface IPrettifierResponse {
  statusCode: number
  data: any
  message?: string
}

interface IPrettifier {
  response: (
    statusCode: number,
    data: any,
    message?: string
  ) => IPrettifierResponse
}

declare module 'fastify' {
  interface FastifyInstance {
    pretty: IPrettifier
  }
}

const friendlyResponsePlugin: FastifyPluginAsync = fp(
  async (server, options) => {
    const responseMethod = (
      statusCode: number,
      data: any,
      message: string | undefined = undefined
    ): IPrettifierResponse => ({ statusCode, message, data })

    server.decorate('pretty', {
      response: responseMethod
    })
  }
)

export default friendlyResponsePlugin
