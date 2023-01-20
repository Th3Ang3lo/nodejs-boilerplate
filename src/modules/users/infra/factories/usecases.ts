import { UsersRepository } from '@/infra/database/repositories/users-repository'

import { HashProvider } from '@/infra/providers/bcrypt-hash-provider'
import { JwtProvider } from '@/infra/providers/jwt-provider'
import { S3StorageProvider } from '@/infra/providers/s3-storage-provider'
import { MailProvider } from '@/infra/providers/mail-provider'

import { AuthUserUseCase } from '@/modules/users/core/usecases/auth-user-usecase'
import { RegisterUserUseCase } from '@/modules/users/core/usecases/register-user-usecase'
import { GetUserByIdUseCase } from '@/core/usecases/get-user-by-id-usecase'
import { UpdateUserProfileUseCase } from '@/modules/users/core/usecases/profile/update-user-profile-usecase'
import { DeleteUserProfileUseCase } from '@/modules/users/core/usecases/profile/delete-user-profile-usecase'
import { UpdateUserPasswordUseCase } from '@/modules/users/core/usecases/password/update-user-password-usecase'
import { RequestResetUserPasswordUseCase } from '@/modules/users/core/usecases/password/request-reset-user-password-usecase'
import { ResetUserPasswordUseCase } from '@/modules/users/core/usecases/password/reset-user-password-usecase'
import { Env } from '@/shared/env'

export const registerUserUseCase = (): RegisterUserUseCase => {
  return new RegisterUserUseCase(
    new UsersRepository(),
    new HashProvider(),
    new JwtProvider(Env.getJwtSecret())
  )
}

export const authUserUseCase = (): AuthUserUseCase => {
  return new AuthUserUseCase(
    new UsersRepository(),
    new HashProvider(),
    new JwtProvider(Env.getJwtSecret())
  )
}

export const showUserProfileUseCase = (): GetUserByIdUseCase => {
  return new GetUserByIdUseCase(
    new UsersRepository()
  )
}

export const updateUserProfileUseCase = (): UpdateUserProfileUseCase => {
  return new UpdateUserProfileUseCase(
    new UsersRepository(),
    new S3StorageProvider()
  )
}

export const deleteUserProfileUseCase = (): DeleteUserProfileUseCase => {
  return new DeleteUserProfileUseCase(
    new UsersRepository(),
    new HashProvider()
  )
}

export const updateUserPasswordUseCase = (): UpdateUserPasswordUseCase => {
  return new UpdateUserPasswordUseCase(
    new UsersRepository(),
    new HashProvider()
  )
}

export const requestResetUserPasswordUseCase = (): RequestResetUserPasswordUseCase => {
  return new RequestResetUserPasswordUseCase(
    new UsersRepository(),
    new JwtProvider(Env.getJwtSecretPasswordReset()),
    new MailProvider()
  )
}

export const resetUserPasswordUseCase = (): ResetUserPasswordUseCase => {
  return new ResetUserPasswordUseCase(
    new UsersRepository(),
    new JwtProvider(Env.getJwtSecretPasswordReset()),
    new HashProvider()
  )
}
