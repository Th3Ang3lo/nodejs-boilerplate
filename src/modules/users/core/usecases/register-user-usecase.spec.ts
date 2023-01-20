import { beforeAll, it, describe, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { IJwtProvider } from '@/domain/contracts/providers'
import { HashProvider } from '@/infra/providers/bcrypt-hash-provider'
import { JwtProvider } from '@/infra/providers/jwt-provider'

import { User } from '@/domain/entities/user'

import { RegisterUserUseCase } from './register-user-usecase'
import { ConflictException } from '@/shared/exceptions'

const name = RegisterUserUseCase.name

describe(`[${name}] Tests`, () => {
  let registerUserUseCase: RegisterUserUseCase
  let userRepository: IUsersRepository
  let hashProvider: HashProvider
  let jwtProvider: IJwtProvider
  let user: User

  beforeAll(() => {
    userRepository = {
      findByEmail: vi.fn(),
      create: vi.fn()
    } as unknown as IUsersRepository

    hashProvider = new HashProvider()
    jwtProvider = new JwtProvider(faker.word.noun())

    registerUserUseCase = new RegisterUserUseCase(
      userRepository,
      hashProvider,
      jwtProvider
    )

    user = User.create({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      picture: faker.image.avatar()
    })
  })

  it('test if the user has registered', async () => {
    const { email, name, phone } = user.getData()

    vi.spyOn(userRepository, 'create').mockResolvedValueOnce(user)

    const result = await registerUserUseCase.execute({
      email,
      name,
      password: user.getPassword(),
      phone
    })

    expect(result.user.name).toBe(name)
    expect(result.user.email).toBe(email)
    expect(result.user.phone).toBe(phone)
  })

  it('test if the user already has registered', async () => {
    try {
      const { email, name, phone } = user.getData()

      vi.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user)

      await registerUserUseCase.execute({
        email,
        name,
        password: user.getPassword(),
        phone
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException)
    }
  })
})
