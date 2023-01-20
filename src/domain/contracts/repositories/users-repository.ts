import { User } from '@/domain/entities/user'

export interface IUsersRepository {
  create: (user: User) => Promise<User>
  update: (user: User) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
  delete: (id: string) => Promise<void>
}
