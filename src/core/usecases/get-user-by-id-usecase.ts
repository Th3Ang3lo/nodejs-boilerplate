import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { GetUserOutput } from '@/domain/contracts/usecases/get-user-usecase'

import { NotFoundException } from '@/shared/exceptions'

export class GetUserByIdUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository
  ) {}

  public async execute (userId: string): Promise<GetUserOutput> {
    const findUser = await this.usersRepository.findById(userId)

    if (!findUser) throw new NotFoundException('Usuário não encontrado.')

    return findUser.getData()
  }
}
