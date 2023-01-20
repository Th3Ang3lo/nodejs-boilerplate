import { NextFunction, Response } from 'express'

import { JwtProvider } from '@/infra/providers/jwt-provider'

import { UnauthorizedException } from '@/shared/exceptions'
import { HttpAuth, HttpHeaders } from '@/domain/contracts/controller'

import { Env } from '@/shared/env'

export const authenticated = async (request: HttpHeaders & HttpAuth, response: Response, next: NextFunction): Promise<void> => {
  const authHeader = request.headers.authorization

  if (authHeader) {
    const jwtProvider = new JwtProvider(Env.getJwtSecret())

    const [Bearer, token, ...rest] = authHeader.split(' ')

    try {
      if (Bearer !== 'Bearer' || rest.length > 0) {
        throw new Error()
      }

      const verify = await jwtProvider.isValidToken(token)

      if (verify) {
        const decoded = await jwtProvider.decodeToken(token)

        request.auth = {
          id: decoded.id
        }

        return next()
      } else {
        throw new Error()
      }
    } catch (err) {
      response.status(401).json(new UnauthorizedException('Jwt token invalid.'))
    }
  } else {
    response.status(401).json(new UnauthorizedException('Jwt token is missing.'))
  }
}
