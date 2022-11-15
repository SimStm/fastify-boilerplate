import { getAllUsers, getUserFromAuth } from '../../services/database/dbUsers'
import { FastifyPluginCallback } from 'fastify'
import boom from '@hapi/boom'
import { isEmpty, omit } from 'lodash'

const FIELDS_TO_OMIT = ['password']

const route: FastifyPluginCallback = async (app, options, next) => {
  app.post('/auth', async (req, res) => {
    try {
      const { email, password } = req.body as any

      const payload = omit(
        await getUserFromAuth(app.prisma, email, password),
        FIELDS_TO_OMIT
      )
      if (isEmpty(payload)) throw boom.unauthorized('User/password not found')

      const token = app.jwt.sign({ payload }, { expiresIn: '1d' })

      return res
        .send(
          app.pretty.response(200, {
            token,
            user: omit(payload, FIELDS_TO_OMIT)
          })
        )
        .code(200)
    } catch (err: any) {
      throw boom.boomify(err)
    }
  })

  next()
}

export default route
