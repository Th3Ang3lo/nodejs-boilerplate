import { expressValidationAdapter } from '@/infra/http/adapters/validation'

import { fileValidator } from '@/infra/http/validations/file'

import { updateUser } from '../../validations/user'

export const updateUserValidator = [expressValidationAdapter(updateUser), fileValidator]
