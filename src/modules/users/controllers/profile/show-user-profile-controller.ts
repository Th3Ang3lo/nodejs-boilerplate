import { GetUserByIdUseCase } from '@/core/usecases/get-user-by-id-usecase'

import { Controller, HttpAuth, HttpBody, Response } from '@/domain/contracts/controller'

import { ok } from '@/infra/http/http'

export class ShowUserProfileController implements Controller {
  constructor (private readonly getUserByIdUseCase: GetUserByIdUseCase) { }

  public async handle (request: HttpBody & HttpAuth): Promise<Response> {
    const userId = request.auth.id

    const getUserById = await this.getUserByIdUseCase.execute(userId)

    return ok({
      user: getUserById
    })
  }
}
