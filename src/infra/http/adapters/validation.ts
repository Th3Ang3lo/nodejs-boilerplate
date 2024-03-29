import * as yup from 'yup'
import * as dot from 'dot-object'

import { Request, Response, NextFunction } from 'express'

import { BadRequestException } from '@/shared/exceptions'
import { Env } from '@/shared/env'

export enum ValidationEnum {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
  FILE = 'file'
}

export const yupValidationAdapter = async (validation: any, data: any): Promise<void> => {
  try {
    const object = yup.object(validation)

    await object.validate(data)
  } catch (error) {
    throw new BadRequestException(error.message, error.path)
  }
}

export const expressValidationAdapter = (validation: any, type = ValidationEnum.BODY) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await yupValidationAdapter(validation, dot.pick(type, request))

      next()
    } catch (error) {
      if (!Env.isProduction()) {
        console.log(error)
      }

      return response.status(error.statusCode || 500).send({
        message: error.errorMessage || 'Internal Server Error',
        field: error.param || undefined
      })
    }
  }
