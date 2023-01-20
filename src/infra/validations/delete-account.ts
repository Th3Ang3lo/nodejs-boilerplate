import * as yup from 'yup'

export const deleteAcccount = {
  reason: yup
    .string()
    .optional()
    .max(255, 'O motivo deve ter no máximo 255 caracteres.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(255, 'A senha deve ter no máximo 255 caracteres.')
    .required('Senha obrigatória.')
}
