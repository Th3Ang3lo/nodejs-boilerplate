import { Controller, Response, HttpBody } from '@/domain/contracts/controller'

import { ResetUserPasswordUseCase } from '@/modules/users/core/usecases/password/reset-user-password-usecase'

import { okNoContent } from '@/infra/http/http'

export class ResetUserPasswordController implements Controller {
  constructor (private readonly resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

  public async handle (request: HttpBody): Promise<Response> {
    const { token, newPassword } = request.body

    await this.resetUserPasswordUseCase.execute({ token, newPassword })

    return okNoContent()
  }
}
