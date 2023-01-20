import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { IMailProvider } from '@/domain/contracts/providers/mail-provider'

import { IJwtProvider } from '@/domain/contracts/providers'

import { Env } from '@/shared/env'

export class RequestResetUserPasswordUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly jwtProvider: IJwtProvider,
    private readonly mailProvider: IMailProvider
  ) { }

  public async execute (email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      const userData = user.getData()

      const to = userData.email

      const passwordResetToken = this.jwtProvider.generateToken({ id: userData.id }, { expiresIn: '15m' })

      await this.mailProvider.sendMail(to, {
        name: userData.name,
        resetPasswordUrl: Env.getResetPasswordUrl(),
        token: passwordResetToken
      }, 'Redefinição de senha', 'reset_password')
    }
  }
}
