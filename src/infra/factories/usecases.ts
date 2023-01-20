import { UsersRepository } from '@/infra/database/repositories/users-repository'

import { GetUserByIdUseCase } from '@/core/usecases/get-user-by-id-usecase'

export const getUserByIdUseCase = (): GetUserByIdUseCase => {
  return new GetUserByIdUseCase(
    new UsersRepository()
  )
}
