import { beforeAll, it, describe, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { IJwtProvider } from '@/domain/contracts/providers'
import { HashProvider } from '@/infra/providers/bcrypt-hash-provider'
import { JwtProvider } from '@/infra/providers/jwt-provider'

import { User } from '@/domain/entities/user'

import { AuthUserUseCase } from './auth-user-usecase'

import { NotFoundException } from '@/shared/exceptions'

const name = AuthUserUseCase.name

describe(`[${name}] Tests`, () => {
  let authUserUseCase: AuthUserUseCase
  let userRepository: IUsersRepository
  let hashProvider: HashProvider
  let jwtProvider: IJwtProvider
  let user: User

  beforeAll(() => {
    userRepository = {
      findByEmail: vi.fn()
    } as unknown as IUsersRepository

    hashProvider = new HashProvider()
    jwtProvider = new JwtProvider(faker.word.noun())

    authUserUseCase = new AuthUserUseCase(
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

  it('test if the user has been authenticated', async () => {
    const { email, name } = user.getData()

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user)
    vi.spyOn(hashProvider, 'compareHash').mockResolvedValueOnce(true)

    const result = await authUserUseCase.execute({
      email,
      password: user.getPassword()
    })

    expect(result).toHaveProperty('token')
    expect(result.user.name).toBe(name)
    expect(result.user.email).toBe(email)
  })

  // test with incorrect password

  it('test if the user doesn\'t have account', async () => {
    try {
      const { email } = user.getData()

      vi.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null)

      await authUserUseCase.execute({
        email,
        password: user.getPassword()
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})
