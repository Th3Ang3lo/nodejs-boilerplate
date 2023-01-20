import cuid from 'cuid'

export function id (): string {
  return cuid()
}
