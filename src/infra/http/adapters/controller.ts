import { RequestHandler, Response } from 'express'

import { Controller } from '@/domain/contracts/controller'
import { InternalServerErrorException } from '@/shared/exceptions'
import { Env } from '@/shared/env'

export type Adapter = (controller: Controller) => RequestHandler

export const controllerAdapter: Adapter = controller => async (request: any, response): Promise<Response> => {
  try {
    const dispatchController = await controller.handle(request)

    const { data, statusCode, redirectTo } = dispatchController

    if (data && statusCode) {
      return response.status(statusCode).send(data)
    }

    if (!data && statusCode) {
      return response.status(204).send()
    }

    if (redirectTo) {
      response.redirect(redirectTo)
      return
    }

    throw new InternalServerErrorException()
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
