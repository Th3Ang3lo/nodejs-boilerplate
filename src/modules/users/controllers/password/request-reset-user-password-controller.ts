import { Controller, Response, HttpBody } from '@/domain/contracts/controller'

import { RequestResetUserPasswordUseCase } from '../../core/usecases/password/request-reset-user-password-usecase'

import { okNoContent } from '@/infra/http/http'

export class RequestResetUserPasswordController implements Controller {
  constructor (
    private readonly requestResetUserPasswordUseCase: RequestResetUserPasswordUseCase
  ) { }

  public async handle (request: HttpBody): Promise<Response> {
    const { email } = request.body

    await this.requestResetUserPasswordUseCase.execute(email)

    return okNoContent()
  }
}
