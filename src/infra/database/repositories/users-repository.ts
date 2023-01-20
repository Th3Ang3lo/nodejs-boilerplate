import { prismaClient } from '@/infra/database'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { User } from '@/domain/entities/user'

import { jsonToUser, userToJson } from '@/infra/mappers/user'

export class UsersRepository implements IUsersRepository {
  public async create (user: User): Promise<User> {
    const createUser = await prismaClient.users.create({
      data: userToJson(user)
    })

    return jsonToUser(createUser)
  }

  public async update (user: User): Promise<User | null> {
    const data = user.getData()

    user.change({ updatedAt: new Date() })

    const updateUser = await prismaClient.users.update({
      where: {
        id: data.id
      },
      data: userToJson(user)
    })

    if (updateUser) return jsonToUser(updateUser)

    return null
  }

  public async findByEmail (email: string): Promise<User | null> {
    const user = await prismaClient.users.findFirst({
      where: {
        email
      }
    })

    if (user) return jsonToUser(user)

    return null
  }

  public async findById (id: string): Promise<User | null> {
    const user = await prismaClient.users.findFirst({
      where: {
        id
      }
    })

    if (user) return jsonToUser(user)

    return null
  }

  public async delete (id: string): Promise<void> {
    await prismaClient.users.delete({
      where: {
        id
      }
    })
  }
}
