import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { IHashProvider, IJwtProvider } from '@/domain/contracts/providers'

import { ForbiddenException } from '@/shared/exceptions'

import { ResetUserPasswordUseCaseInput } from '@/modules/users/domain/contracts/usecases/password/reset-user-password-usecase'

export class ResetUserPasswordUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly jwtProvider: IJwtProvider,
    private readonly hashProvider: IHashProvider
  ) { }

  public async execute (resetPasswordData: ResetUserPasswordUseCaseInput): Promise<void> {
    const { token, newPassword } = resetPasswordData

    const isValidToken = await this.jwtProvider.isValidToken(token)
    if (!isValidToken) throw new ForbiddenException('Token expirado ou inválido.')

    const decodedToken = await this.jwtProvider.decodeToken(token)

    const user = await this.usersRepository.findById(decodedToken.id)

    const newPasswordMatches = await this.hashProvider.compareHash(newPassword, user.getPassword())
    if (newPasswordMatches) throw new ForbiddenException('A nova senha não pode ser igual a antiga.')

    const hashedNewPassword = await this.hashProvider.generateHash(newPassword)

    user.change({
      password: hashedNewPassword
    })

    await this.usersRepository.update(user)
  }
}
