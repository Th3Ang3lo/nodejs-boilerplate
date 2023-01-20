import { Controller, Response, Request } from '@/domain/contracts/controller'

import { RegisterUserUseCase } from '../core/usecases/register-user-usecase'

import { ok } from '@/infra/http/http'

export class RegisterUserController implements Controller {
  constructor (
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {}

  public async handle (request: Request): Promise<Response> {
    const { name, email, phone, password } = request.body

    const registerUser = await this.registerUserUseCase.execute({
      name,
      email,
      phone,
      password
    })

    return ok(registerUser)
  }
}
