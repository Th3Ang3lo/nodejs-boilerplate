import { beforeAll, it, describe, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { IStorageProvider } from '@/domain/contracts/providers'

import { User } from '@/domain/entities/user'

import { UpdateUserProfileUseCase } from './update-user-profile-usecase'

import { NotFoundException } from '@/shared/exceptions'

const name = UpdateUserProfileUseCase.name

describe(`[${name}] Tests`, () => {
  let updateUserProfileUseCase: UpdateUserProfileUseCase
  let userRepository: IUsersRepository
  let storageProvider: IStorageProvider
  let user: User

  beforeAll(() => {
    userRepository = {
      findById: vi.fn(),
      update: vi.fn(),
      findByEmail: vi.fn()
    } as unknown as IUsersRepository

    storageProvider = {
      saveFile: vi.fn()
    } as unknown as IStorageProvider

    updateUserProfileUseCase = new UpdateUserProfileUseCase(
      userRepository,
      storageProvider
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
    const { email, name, phone, id } = user.getData()

    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)
    vi.spyOn(userRepository, 'update').mockResolvedValueOnce(user)

    const result = await updateUserProfileUseCase.execute(id, {
      email,
      name,
      phone
    })

    expect(result.user.name).toBe(name)
    expect(result.user.email).toBe(email)
    expect(result.user.phone).toBe(phone)
  })

  it('test if the user email already exists with another user', async () => {
    try {
      const { id, email, name, phone } = user.getData()

      vi.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user)

      await updateUserProfileUseCase.execute(id, {
        email,
        name,
        phone
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })

  it('test if the user doesn\'t have account', async () => {
    try {
      const { id, email, name, phone } = user.getData()

      vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(null)

      await updateUserProfileUseCase.execute(id, {
        email,
        name,
        phone
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})
