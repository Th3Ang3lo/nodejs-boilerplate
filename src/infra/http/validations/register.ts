import { expressValidationAdapter } from '@/infra/http/adapters/validation'

import { register } from '@/infra/validations/register'

export const registerValidator = expressValidationAdapter(register)
