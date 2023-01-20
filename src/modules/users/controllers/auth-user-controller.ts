import { Controller, HttpBody, Response } from '@/domain/contracts/controller'

import { AuthUserUseCase } from '../core/usecases/auth-user-usecase'

import { ok } from '@/infra/http/http'

export class AuthUserController implements Controller {
  constructor (
    private readonly authUserUseCase: AuthUserUseCase
  ) {}

  public async handle (request: HttpBody): Promise<Response> {
    const { email, password } = request.body

    const authUser = await this.authUserUseCase.execute({
      email,
      password
    })

    return ok(authUser)
  }
}
