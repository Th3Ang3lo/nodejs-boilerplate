import { expressValidationAdapter, ValidationEnum } from '../adapters/validation'

import { resetPassword, updatePassword } from '@/infra/validations/password'

export const updatePasswordValidator = expressValidationAdapter(updatePassword, ValidationEnum.BODY)
export const resetUserPasswordValidator = expressValidationAdapter(resetPassword)
