import { DeleteUserProfileUseCaseInput } from '@/modules/users/domain/contracts/usecases/profile/delete-user-profile-usecase'

import { ForbiddenException, NotFoundException } from '@/shared/exceptions'
import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { IHashProvider } from '@/domain/contracts/providers'

export class DeleteUserProfileUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute (userId: string, deleteData: DeleteUserProfileUseCaseInput): Promise<void> {
    const { password } = deleteData
    const findUser = await this.usersRepository.findById(userId)

    if (!findUser) throw new NotFoundException('Usuário não encontrado.')

    const passwordMatches = await this.hashProvider.compareHash(password, findUser.getPassword())
    if (!passwordMatches) throw new ForbiddenException('A senha está incorreta.')

    await this.usersRepository.delete(userId)
  }
}
