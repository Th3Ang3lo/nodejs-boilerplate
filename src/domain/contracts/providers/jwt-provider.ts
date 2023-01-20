import { SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken'

export interface IJwtProvider {
  generateToken: (data: any, options?: SignOptions) => string
  decodeToken: (token: string, options?: DecodeOptions) => Promise<any>
  isValidToken: (token: string, options?: VerifyOptions) => Promise<boolean>
}
