import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { IHashProvider } from '@/domain/contracts/providers'

import { ForbiddenException, NotFoundException } from '@/shared/exceptions'

import { UpdateUserPasswordUseCaseInput } from '@/modules/users/domain/contracts/usecases/password/update-user-password-usecase'

export class UpdateUserPasswordUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute (userId: string, updatePasswordData: UpdateUserPasswordUseCaseInput): Promise<void> {
    const { oldPassword, newPassword } = updatePasswordData

    const user = await this.usersRepository.findById(userId)
    if (!user) throw new NotFoundException('Usuário inexistente.')

    const currentPassword = user.getPassword()

    const oldPasswordMatches = await this.hashProvider.compareHash(oldPassword, currentPassword)
    if (!oldPasswordMatches) throw new ForbiddenException('A senha antiga está incorreta.')

    const newPasswordMatches = await this.hashProvider.compareHash(newPassword, currentPassword)
    if (newPasswordMatches) throw new ForbiddenException('A nova senha não pode ser igual a antiga.')

    const hashedNewPassword = await this.hashProvider.generateHash(newPassword)

    user.change({
      password: hashedNewPassword
    })

    await this.usersRepository.update(user)
  }
}
