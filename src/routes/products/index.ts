import { getAllProducts } from './../../services/database/dbProducts'
import { FastifyPluginCallback } from 'fastify'
import boom from '@hapi/boom'

const route: FastifyPluginCallback = async (app, options, next) => {
  app.get('/', async (req, res) => {
    try {
      const products = await getAllProducts(app.prisma)
      return res.send(app.pretty.response(200, products)).code(200)
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  next()
}

export default route
