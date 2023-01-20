import { beforeAll, it, describe, vi, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { HashProvider } from '@/infra/providers/bcrypt-hash-provider'

import { User } from '@/domain/entities/user'

import { DeleteUserProfileUseCase } from './delete-user-profile-usecase'

import { NotFoundException } from '@/shared/exceptions'

const name = DeleteUserProfileUseCase.name

describe(`[${name}] Tests`, () => {
  let deleteUserProfileUseCase: DeleteUserProfileUseCase
  let userRepository: IUsersRepository
  let hashProvider: HashProvider
  let user: User

  beforeAll(() => {
    userRepository = {
      findById: vi.fn(),
      delete: vi.fn()
    } as unknown as IUsersRepository

    hashProvider = new HashProvider()

    deleteUserProfileUseCase = new DeleteUserProfileUseCase(
      userRepository,
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

  it('test if the user has been deleted', async () => {
    const { id } = user.getData()

    vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(user)
    vi.spyOn(hashProvider, 'compareHash').mockResolvedValueOnce(true)

    await deleteUserProfileUseCase.execute(id, {
      password: user.getPassword(),
      reason: faker.word.noun()
    })
  })

  it('test if the user doesn\'t have account', async () => {
    try {
      const { id } = user.getData()

      vi.spyOn(userRepository, 'findById').mockResolvedValueOnce(null)

      await deleteUserProfileUseCase.execute(id, {
        password: user.getPassword(),
        reason: faker.word.noun()
      })
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})
