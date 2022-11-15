import boom from '@hapi/boom'
import { isEmpty } from 'lodash'

export interface IParameterValidator {
  name: string
  value: any
  required: boolean
}

export const validateEmptyRequiredParameters = (
  parameters: IParameterValidator[]
) => {
  for (const param of parameters) {
    if (isEmpty(param.value)) {
      throw boom.badRequest(`${param.name} is required`)
    }
  }
}

export const validateEmptyParameters = (parameters: IParameterValidator[]) => {
  for (const param of parameters) {
    if (isEmpty(param.value) && param.required) {
      throw boom.badRequest(`${param.name} is required`)
    }
  }
}
