import { it, describe, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { User } from '@/domain/entities/user'

const name = User.name

describe(`[${name}] Tests`, () => {
  it('test if the user entity has been created', async () => {
    const email = faker.internet.email()
    const name = faker.internet.userName()
    const phone = faker.phone.number()
    const picture = faker.image.avatar()

    const user = User.create({
      email,
      name,
      password: faker.internet.password(),
      phone,
      picture
    })

    const userData = user.getData()

    expect(name, userData.name)
    expect(email, userData.email)
    expect(phone, userData.phone)
    expect(picture, userData.picture)
  })
})
