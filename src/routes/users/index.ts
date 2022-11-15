import { getAllUsers } from './../../services/database/dbUsers'
import { FastifyPluginCallback } from 'fastify'
import boom from '@hapi/boom'

const route: FastifyPluginCallback = async (app, options, next) => {
  app.get('/', async (req, res) => {
    try {
      const users = await getAllUsers(app.prisma)
      return res.send(app.pretty.response(200, users)).code(200)
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  next()
}

export default route
