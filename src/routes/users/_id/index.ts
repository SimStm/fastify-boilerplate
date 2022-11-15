import { getUser } from './../../../services/database/dbUsers'
import { FastifyPluginCallback } from 'fastify'
import boom from '@hapi/boom'
import { validateEmptyRequiredParameters } from '../../../helpers/parse-parameters'

const route: FastifyPluginCallback = async (app, options, next) => {
  app.get('', async (req, res) => {
    const { id } = req.params as any
    validateEmptyRequiredParameters([{ name: 'ID', value: id, required: true }])

    try {
      const user = await getUser(app.prisma, id)
      return res.send(app.pretty.response(200, user)).code(200)
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  next()
}

export default route
