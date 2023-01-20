import { beforeAll, it, describe, vi } from 'vitest'
import { faker } from '@faker-js/faker'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'
import { IMailProvider, IJwtProvider } from '@/domain/contracts/providers'

import { User } from '@/domain/entities/user'

import { RequestResetUserPasswordUseCase } from './request-reset-user-password-usecase'
import { JwtProvider } from '@/infra/providers/jwt-provider'

const name = RequestResetUserPasswordUseCase.name

describe(`[${name}] Tests`, () => {
  let requestResetUserPasswordUseCase: RequestResetUserPasswordUseCase
  let userRepository: IUsersRepository
  let jwtProvider: IJwtProvider
  let mailProvider: IMailProvider

  let user: User

  beforeAll(() => {
    userRepository = {
      findByEmail: vi.fn()
    } as unknown as IUsersRepository

    mailProvider = {
      sendMail: vi.fn()
    } as unknown as IMailProvider

    jwtProvider = new JwtProvider(faker.word.noun())

    requestResetUserPasswordUseCase = new RequestResetUserPasswordUseCase(
      userRepository,
      jwtProvider,
      mailProvider
    )

    user = User.create({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      picture: faker.image.avatar()
    })
  })

  it('test if reset password has been requested', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user)

    await requestResetUserPasswordUseCase.execute(faker.internet.email())
  })
})
