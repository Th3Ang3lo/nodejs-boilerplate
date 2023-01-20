import { User } from '@/domain/entities/user'

export function jsonToUser (data: Record<string, any>): User {
  const {
    id,
    name,
    email,
    password,
    picture,
    phone,
    created_at,
    updated_at
  } = data

  const user = User.create({
    id,
    name,
    email,
    password,
    picture,
    phone,
    createdAt: created_at,
    updatedAt: updated_at
  })

  return user
}

export function userToJson (user: User) {
  const data = user.getData()

  const password = user.getPassword()

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password,
    picture: data.picture,
    phone: data.phone,
    created_at: data.createdAt,
    updated_at: data.updatedAt
  }
}
