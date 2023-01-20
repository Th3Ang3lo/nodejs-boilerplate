import { deleteAcccount } from '@/infra/validations/delete-account'
import { expressValidationAdapter } from '../adapters/validation'

export const deleteAccountValidator = expressValidationAdapter(deleteAcccount)
