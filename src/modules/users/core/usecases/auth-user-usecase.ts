import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { AuthUserInput, AuthUserOutput } from '@/modules/users/domain/contracts/usecases/auth-user-usecase'

import { IHashProvider } from '@/domain/contracts/providers/bcrypt-hash-provider'
import { IJwtProvider } from '@/domain/contracts/providers'

import { NotFoundException } from '@/shared/exceptions'

export class AuthUserUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider,
    private readonly jwtProvider: IJwtProvider
  ) {}

  public async execute (authData: AuthUserInput): Promise<AuthUserOutput> {
    const { email, password } = authData

    const findUser = await this.usersRepository.findByEmail(email)
    if (!findUser) throw new NotFoundException('Usuário inexistente ou senha incorreta.')

    const user = findUser.getData()

    const comparePassword = await this.hashProvider.compareHash(password, findUser.getPassword())
    if (!comparePassword) throw new NotFoundException('Usuário inexistente ou senha incorreta.')

    const token = this.jwtProvider.generateToken({
      id: user.id
    })

    return {
      user,
      token
    }
  }
}
