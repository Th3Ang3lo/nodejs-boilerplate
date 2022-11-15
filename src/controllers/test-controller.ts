import { Controller, Request, Response } from '@/domain/contracts/controller'

import { TestUseCase } from '@/core/usecases/test-usecase'

import { ok } from '@/infra/http/http'

export class TestController implements Controller {
  constructor (
    private readonly testUseCase: TestUseCase
  ) {}

  public async handle (request: Request): Promise<Response> {
    const test = await this.testUseCase.execute()

    return ok(test)
  }
}
