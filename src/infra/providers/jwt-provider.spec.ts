import { describe, beforeAll, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'

import { JwtProvider } from '@/infra/providers/jwt-provider'

import { IJwtProvider } from '@/domain/contracts/providers'

describe('Jwt provider', () => {
  let jwtProvider: IJwtProvider

  beforeAll(() => {
    jwtProvider = new JwtProvider(faker.word.noun())
  })

  it('should generate jwt', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() })

    expect(token).toBeTruthy()
  })

  it('should be valid jwt', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() })

    const isValidJwt = await jwtProvider.isValidToken(token)

    expect(token).toBeTruthy()
    expect(isValidJwt).toBeTruthy()
  })

  it('should if jwt can be decoded', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() })
    const decoded = await jwtProvider.decodeToken(token)

    expect(decoded).toHaveProperty('id')
  })

  it('should if jwt has expired', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() }, {
      expiresIn: '-1h'
    })

    const isValidToken = await jwtProvider.isValidToken(token)

    expect(isValidToken).toBeFalsy()
  })
})
