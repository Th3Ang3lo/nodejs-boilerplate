import { id } from '@/shared/utils/id'

export interface UserProps {
  id?: string
  name: string
  email: string
  password: string
  picture: string
  phone: string
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  private id: string
  private name: string
  private email: string
  private password: string
  private picture: string
  private phone: string
  private createdAt: Date
  private updatedAt: Date

  private constructor (data: UserProps) {
    this.id = data.id ?? id()
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.picture = data.picture
    this.phone = data.phone
    this.createdAt = data.createdAt ?? new Date()
    this.updatedAt = data.updatedAt ?? new Date()
  }

  public static create (data: UserProps) {
    return new User(data)
  }

  public change (data: Partial<UserProps>) {
    this.id = data.id ?? this.id
    this.name = data.name ?? this.name
    this.email = data.email ?? this.email
    this.password = data.password ?? this.password
    this.picture = data.picture ?? this.picture
    this.phone = data.phone ?? this.phone
    this.createdAt = data.createdAt || this.createdAt || new Date()
    this.updatedAt = data.updatedAt || this.updatedAt || new Date()
  }

  public getPassword (): string {
    return this.password
  }

  public getData () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      picture: this.picture,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
