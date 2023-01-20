import jwt, { SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken'

import { IJwtProvider } from '@/domain/contracts/providers/jwt-provider'

export class JwtProvider implements IJwtProvider {
  constructor (private readonly secret: string) {}

  public generateToken (data: any, options?: SignOptions): string {
    return jwt.sign(data, this.secret, {
      expiresIn: '7d',
      ...options
    })
  }

  public async decodeToken (token: string, options?: DecodeOptions): Promise<any> {
    return jwt.decode(token, options)
  }

  async isValidToken (token: string, options?: VerifyOptions): Promise<boolean> {
    try {
      jwt.verify(token, this.secret, options)

      return true
    } catch (error) {
      return false
    }
  }
}
