import { beforeAll, it, describe, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { IHashProvider } from '@/domain/contracts/providers'

import { HashProvider } from '@/infra/providers/bcrypt-hash-provider'

import { User } from '@/domain/entities/user'

import { UpdateUserPasswordUseCase } from './update-user-password-usecase'

import { id } from '@/shared/utils/id'

import { ForbiddenException } from '@/shared/exceptions'

const name = UpdateUserPasswordUseCase.name

describe(`[${name}] Tests`, () => {
  let resetUserPasswordUseCase: UpdateUserPasswordUseCase
  let userRepository: IUsersRepository
  let hashProvider: IHashProvider

  let user: User

  beforeAll(async () => {
    userRepository = {
      findById: vi.fn(),
      update: vi.fn()
    } as unknown as IUsersRepository

    hashProvider = new HashProvider()

    resetUserPasswordUseCase = new UpdateUserPasswordUseCase(
      userRepository,
      hashProvider
    )

    user = User.create({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: await hashProvider.generateHash(faker.internet.password()),
      phone: faker.phone.number(),
      picture: faker.image.avatar()
    })
  })

  it('test if the password has been updated', async () => {
    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)
    vi.spyOn(userRepository, 'update').mockResolvedValueOnce(user)
    vi.spyOn(hashProvider, 'compareHash').mockResolvedValueOnce(true)

    await resetUserPasswordUseCase.execute(id(), {
      oldPassword: faker.internet.password(),
      newPassword: faker.internet.password()
    })
  })

  it('test if the password hasn\'t been updated because the old password is incorrect', async () => {
    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)

    try {
      await resetUserPasswordUseCase.execute(id(), {
        oldPassword: faker.internet.password(),
        newPassword: faker.internet.password()
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException)
    }
  })

  it('test if the password hasn\'t been updated because the new password is same old password', async () => {
    const password = faker.internet.password()
    const hashedPassword = await hashProvider.generateHash(password)

    const user = User.create({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: hashedPassword,
      phone: faker.phone.number(),
      picture: faker.image.avatar()
    })

    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)

    try {
      await resetUserPasswordUseCase.execute(id(), {
        oldPassword: password,
        newPassword: password
      })
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException)
    }
  })
})
