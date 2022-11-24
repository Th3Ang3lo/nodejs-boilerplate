import { faker } from '@faker-js/faker'
import { TokenExpiredError } from 'jsonwebtoken'

import { JwtProvider } from '@/infra/providers/jwt-provider'

import { IJwtProvider } from '@/domain/contracts/providers'

describe('Jwt provider', () => {
  let jwtProvider: IJwtProvider

  beforeAll(() => {
    process.env.JWT_SECRET_USERS = faker.word.noun()
    process.env.JWT_SECRET_PARTNERS = faker.word.noun()
    process.env.JWT_EXPIRES = '1d'

    jwtProvider = new JwtProvider()
  })

  it('should generate jwt', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() })

    expect(token).toBeTruthy()
  })

  it('should be valid jwt', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() })

    const isValidJwt = await jwtProvider.verifyToken(token)

    expect(token).toBeTruthy()
    expect(isValidJwt).toBeTruthy()
  })

  it('should if jwt can be decoded', async () => {
    const token = jwtProvider.generateToken({ id: faker.datatype.uuid() })
    const decoded = await jwtProvider.decodeToken(token)

    expect(decoded).toHaveProperty('id')
  })

  it('should if jwt has expired', async () => {
    try {
      const token = jwtProvider.generateToken({ id: faker.datatype.uuid() }, {
        expiresIn: '-1h'
      })

      await jwtProvider.verifyToken(token)

      throw Error('Error.')
    } catch (error) {
      expect(error).toBeInstanceOf(TokenExpiredError)
    }
  })
})
