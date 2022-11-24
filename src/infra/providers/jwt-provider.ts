import jwt, { SignOptions } from 'jsonwebtoken'

import { IJwtProvider } from '@/domain/contracts/providers/jwt-provider'

export class JwtProvider implements IJwtProvider {
  public readonly secret = process.env.JWT_SECRET

  public generateToken (data: any, options?: SignOptions): string {
    return jwt.sign(data, this.secret, {
      expiresIn: process.env.JWT_EXPIRES,
      ...options
    })
  }

  public async decodeToken (token: string): Promise<any> {
    return jwt.decode(token)
  }

  async verifyToken (token: string, options?: SignOptions): Promise<boolean> {
    return !!jwt.verify(token, this.secret, options)
  }
}
