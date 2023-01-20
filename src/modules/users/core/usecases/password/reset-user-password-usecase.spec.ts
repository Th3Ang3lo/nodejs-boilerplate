import { beforeAll, it, describe, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { IJwtProvider, IHashProvider } from '@/domain/contracts/providers'

import { JwtProvider } from '@/infra/providers/jwt-provider'
import { HashProvider } from '@/infra/providers/bcrypt-hash-provider'

import { User } from '@/domain/entities/user'

import { ResetUserPasswordUseCase } from './reset-user-password-usecase'

import { id } from '@/shared/utils/id'

import { ForbiddenException } from '@/shared/exceptions'

const name = ResetUserPasswordUseCase.name

describe(`[${name}] Tests`, () => {
  let resetUserPasswordUseCase: ResetUserPasswordUseCase
  let userRepository: IUsersRepository
  let jwtProvider: IJwtProvider
  let hashProvider: IHashProvider

  let user: User

  beforeAll(() => {
    userRepository = {
      findById: vi.fn(),
      update: vi.fn()
    } as unknown as IUsersRepository

    jwtProvider = new JwtProvider(faker.word.noun())
    hashProvider = new HashProvider()

    resetUserPasswordUseCase = new ResetUserPasswordUseCase(
      userRepository,
      jwtProvider,
      hashProvider
    )

    user = User.create({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      picture: faker.image.avatar()
    })
  })

  it('test if the password has been updated', async () => {
    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)
    vi.spyOn(userRepository, 'update').mockResolvedValueOnce(user)
    vi.spyOn(hashProvider, 'compareHash').mockResolvedValueOnce(false)

    const token = jwtProvider.generateToken({ id: id() })

    await resetUserPasswordUseCase.execute({
      newPassword: faker.internet.password(),
      token
    })
  })

  it('test if the password isn\'t updated because the token is invalid', async () => {
    try {
      await resetUserPasswordUseCase.execute({
        newPassword: faker.internet.password(),
        token: 'invalid_token'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException)
    }
  })

  it('test if the password isn\'t updated because the new password is the same old password', async () => {
    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)
    vi.spyOn(hashProvider, 'compareHash').mockResolvedValueOnce(true)

    try {
      const token = jwtProvider.generateToken({ id: id() })

      await resetUserPasswordUseCase.execute({
        newPassword: faker.internet.password(),
        token
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException)
    }
  })
})
