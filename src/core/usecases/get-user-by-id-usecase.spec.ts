import { describe, it, vi, beforeAll, expect } from 'vitest'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { GetUserByIdUseCase } from './get-user-by-id-usecase'

import { User } from '@/domain/entities/user'

import { NotFoundException } from '@/shared/exceptions'

const name = GetUserByIdUseCase.name

describe(`${name} Tests`, () => {
  let usersRepository: IUsersRepository
  let getUserByIdUseCase: GetUserByIdUseCase
  let user: User

  beforeAll(() => {
    usersRepository = {
      findById: vi.fn()
    } as unknown as IUsersRepository

    user = User.create({
      id: randomUUID(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      picture: faker.internet.avatar(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    getUserByIdUseCase = new GetUserByIdUseCase(usersRepository)

    vi.clearAllMocks()
  })

  it('Test if returns a user with success', async () => {
    vi.spyOn(usersRepository, 'findById').mockResolvedValueOnce(user)

    const result = await getUserByIdUseCase.execute(randomUUID())

    expect(result).toMatchObject(user.getData())
  })

  it('Test if returns not found exception', async () => {
    try {
      vi.spyOn(usersRepository, 'findById').mockResolvedValueOnce(null)

      await getUserByIdUseCase.execute(randomUUID())
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})
