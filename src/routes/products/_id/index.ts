import {
  getProduct,
  patchProduct
} from './../../../services/database/dbProducts'
import { FastifyPluginCallback } from 'fastify'
import boom from '@hapi/boom'
import { validateEmptyRequiredParameters } from '../../../helpers/parse-parameters'

const route: FastifyPluginCallback = async (app, options, next) => {
  app.get('', async (req, res) => {
    const { id } = req.params as any
    validateEmptyRequiredParameters([{ name: 'ID', value: id, required: true }])

    try {
      const product = await getProduct(app.prisma, id)
      return res.send(app.pretty.response(200, product)).code(200)
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  app.patch('', async (req, res) => {
    const { id } = req.params as any
    const data = req.body as any

    validateEmptyRequiredParameters([
      { name: 'ID', value: id, required: true },
      { name: 'Body Content', value: data, required: true }
    ])

    try {
      const product = await patchProduct(app.prisma, id, data)
      return res.send(app.pretty.response(200, product)).code(200)
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  next()
}

export default route
