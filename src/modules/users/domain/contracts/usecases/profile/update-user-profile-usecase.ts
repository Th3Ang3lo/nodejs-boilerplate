export interface UpdateUserProfileInput {
  name?: string
  picture?: Express.Multer.File
  phone?: string
  email?: string
}

export interface UpdateUserProfileOutput {
  user: {
    id?: string
    name: string
    email: string
    phone?: string
    picture: string
    created_at?: string | Date
    updated_at?: string | Date
  }
}
