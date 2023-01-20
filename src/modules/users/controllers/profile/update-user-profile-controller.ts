import { Controller, HttpAuth, HttpBody, HttpFile, Response } from '@/domain/contracts/controller'

import { UpdateUserProfileUseCase } from '../../core/usecases/profile/update-user-profile-usecase'

import { ok } from '@/infra/http/http'

export class UpdateUserProfileController implements Controller {
  constructor (private readonly updateUserProfileUseCase: UpdateUserProfileUseCase) { }

  public async handle (request: HttpAuth & HttpFile & HttpBody): Promise<Response> {
    const userId = request.auth.id
    const picture = request.file

    const { name, phone, email } = request.body

    const updateUserProfileService = await this.updateUserProfileUseCase.execute(userId, { name, phone, picture, email })

    return ok(updateUserProfileService)
  }
}
