import { Controller, HttpAuth, HttpBody, Response } from '@/domain/contracts/controller'

import { UpdateUserPasswordUseCase } from '@/modules/users/core/usecases/password/update-user-password-usecase'

import { okNoContent } from '@/infra/http/http'

export class UpdateUserPasswordController implements Controller {
  public constructor (
    private readonly updatePasswordUseCase: UpdateUserPasswordUseCase
  ) {}

  public async handle (request: HttpBody & HttpAuth): Promise<Response> {
    const { oldPassword, newPassword } = request.body

    const userId = request.auth.id

    await this.updatePasswordUseCase.execute(userId, { oldPassword, newPassword })

    return okNoContent()
  }
}
