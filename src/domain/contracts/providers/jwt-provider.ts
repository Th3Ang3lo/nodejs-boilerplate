import { SignOptions } from 'jsonwebtoken'

export interface IJwtProvider {
  generateToken: (data: any, options?: SignOptions) => string
  decodeToken: (token: string) => Promise<any>
  verifyToken: (token: string, options?: SignOptions) => Promise<boolean>
}
