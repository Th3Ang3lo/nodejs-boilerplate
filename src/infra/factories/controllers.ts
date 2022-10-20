import { TestController } from '@/controllers/test-controller'
import { RequestHandler } from '@/domain/contracts/controller'

import { controllerAdapter as adapter } from '@/infra/http/adapters/controller'

import { testUseCase } from './usecases'

export const testController = (): RequestHandler => {
  return adapter(
    new TestController(
      testUseCase()
    )
  )
}
