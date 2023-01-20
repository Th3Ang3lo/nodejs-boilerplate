import { Router } from 'express'
import multer from 'multer'

import { authenticated } from '@/infra/http/middlewares/auth'

import {
  registerUserController,
  authUserController,
  showUserProfileController,
  updateUserProfileController,
  updateUserPasswordController,
  requestResetUserPasswordController,
  deleteUserProfileController,
  resetUserPasswordController
} from '@/modules/users/infra/factories/controllers'

import {
  registerValidator,
  authValidator,
  deleteAccountValidator,
  updatePasswordValidator,
  emailValidator,
  resetUserPasswordValidator
} from '@/infra/http/validations'

import { updateUserValidator } from '../validations'

const upload = multer()

export const UserRoutes = Router()

UserRoutes.post('/register', registerValidator, registerUserController())
UserRoutes.post('/auth', authValidator, authUserController())

UserRoutes.get('/profile', authenticated, showUserProfileController())
UserRoutes.put('/profile', authenticated, upload.single('picture'), updateUserValidator, updateUserProfileController())

UserRoutes.delete('/profile', authenticated, deleteAccountValidator, deleteUserProfileController())
UserRoutes.patch('/update-password', authenticated, updatePasswordValidator, updateUserPasswordController())
UserRoutes.post('/request-reset-password', emailValidator, requestResetUserPasswordController())
UserRoutes.post('/reset-password', resetUserPasswordValidator, resetUserPasswordController())
