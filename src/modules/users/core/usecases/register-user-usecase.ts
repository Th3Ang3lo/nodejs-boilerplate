import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { RegisterUserInput, RegisterUserOutput } from '@/modules/users/domain/contracts/usecases/register-user-usecase'

import { IHashProvider } from '@/domain/contracts/providers/bcrypt-hash-provider'
import { IJwtProvider } from '@/domain/contracts/providers'

import { ConflictException } from '@/shared/exceptions'
import { User } from '@/domain/entities/user'

import { Env } from '@/shared/env'

export class RegisterUserUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider,
    private readonly jwtProvider: IJwtProvider
  ) {}

  public async execute (data: RegisterUserInput): Promise<RegisterUserOutput> {
    const { name, email, password, phone } = data

    const findUser = await this.usersRepository.findByEmail(email)
    if (findUser) throw new ConflictException('E-mail indisponível.')

    const hashedPassword = await this.hashProvider.generateHash(password)

    const defaultPictureUrl = `${Env.getStorageUrl()}/users/default.png`
    const user = User.create({
      name,
      email,
      password: hashedPassword,
      picture: defaultPictureUrl,
      phone
    })

    const createUser = await this.usersRepository.create(user)
    const userData = createUser.getData()

    const token = this.jwtProvider.generateToken({
      id: userData.id
    })

    return {
      user: userData,
      token
    }
  }
}
