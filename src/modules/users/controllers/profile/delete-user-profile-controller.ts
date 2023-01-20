import { Controller, HttpAuth, HttpBody, Response } from '@/domain/contracts/controller'

import { DeleteUserProfileUseCase } from '../../core/usecases/profile/delete-user-profile-usecase'

import { okNoContent } from '@/infra/http/http'

export class DeleteUserProfileController implements Controller {
  constructor (protected readonly deleteUserProfileUseCase: DeleteUserProfileUseCase) {}

  public async handle (request: HttpBody & HttpAuth): Promise<Response> {
    const { password, reason } = request.body
    const userId = request.auth.id

    await this.deleteUserProfileUseCase.execute(userId, { password, reason })

    return okNoContent()
  }
}
