export interface RegisterUserInput {
  name: string
  email: string
  password: string
  phone?: string
}

export interface RegisterUserOutput {
  user: {
    id: string
    name: string
    email: string
    picture: string
    phone?: string
  }
  token: string
}
