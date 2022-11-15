import { FastifyPluginCallback } from 'fastify'
import boom from '@hapi/boom'

const route: FastifyPluginCallback = async (app, options, next) => {
  app.get('/', (req, res) => {
    return res.send({ status: 'OK' }).code(200)
  })

  next()
}

export default route
