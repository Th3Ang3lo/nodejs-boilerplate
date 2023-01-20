import { expressValidationAdapter } from '@/infra/http/adapters/validation'

import {
  auth,
  email
} from '@/infra/validations/auth'

export const authValidator = expressValidationAdapter(auth)
export const emailValidator = expressValidationAdapter(email)
