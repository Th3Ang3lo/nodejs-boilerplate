import { RequestHandler } from '@/domain/contracts/controller'
import { controllerAdapter as adapter } from '@/infra/http/adapters/controller'

import { RegisterUserController } from '@/modules/users/controllers/register-user-controller'
import { AuthUserController } from '@/modules/users/controllers/auth-user-controller'
import { ShowUserProfileController } from '@/modules/users/controllers/profile/show-user-profile-controller'
import { UpdateUserProfileController } from '@/modules/users/controllers/profile/update-user-profile-controller'
import { UpdateUserPasswordController } from '@/modules/users/controllers/password/update-user-password-controller'
import { DeleteUserProfileController } from '@/modules/users/controllers/profile/delete-user-profile-controller'
import { RequestResetUserPasswordController } from '@/modules/users/controllers/password/request-reset-user-password-controller'
import { ResetUserPasswordController } from '@/modules/users/controllers/password/reset-user-password-controller'

import {
  registerUserUseCase,
  authUserUseCase,
  updateUserProfileUseCase,
  updateUserPasswordUseCase,
  deleteUserProfileUseCase,
  requestResetUserPasswordUseCase,
  resetUserPasswordUseCase
} from './usecases'

import { getUserByIdUseCase } from '@/infra/factories/usecases'

export const registerUserController = (): RequestHandler => {
  return adapter(
    new RegisterUserController(
      registerUserUseCase()
    )
  )
}

export const authUserController = (): RequestHandler => {
  return adapter(
    new AuthUserController(
      authUserUseCase()
    )
  )
}

export const showUserProfileController = (): RequestHandler => {
  return adapter(
    new ShowUserProfileController(
      getUserByIdUseCase()
    )
  )
}

export const updateUserProfileController = (): RequestHandler => {
  return adapter(
    new UpdateUserProfileController(
      updateUserProfileUseCase()
    )
  )
}

export const updateUserPasswordController = (): RequestHandler => {
  return adapter(
    new UpdateUserPasswordController(
      updateUserPasswordUseCase()
    )
  )
}

export const deleteUserProfileController = (): RequestHandler => {
  return adapter(
    new DeleteUserProfileController(
      deleteUserProfileUseCase()
    )
  )
}

export const requestResetUserPasswordController = (): RequestHandler => {
  return adapter(
    new RequestResetUserPasswordController(
      requestResetUserPasswordUseCase()
    )
  )
}

export const resetUserPasswordController = (): RequestHandler => {
  return adapter(
    new ResetUserPasswordController(
      resetUserPasswordUseCase()
    )
  )
}
