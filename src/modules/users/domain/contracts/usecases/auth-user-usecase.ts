export interface AuthUserInput {
  email: string
  password: string
}

export interface AuthUserOutput {
  user: {
    id?: string
    name: string
    email: string
    picture: string
    phone?: string
  }
  token: string
}
