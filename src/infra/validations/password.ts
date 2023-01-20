import * as yup from 'yup'

export const updatePassword = {
  oldPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(255, 'A senha deve ter no máximo 255 caracteres.')
    .required('Senha obrigatória.'),
  newPassword: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(255, 'A senha deve ter no máximo 255 caracteres.')
    .required('Senha obrigatória.')
}

export const resetPassword = {
  newPassword: yup
    .string()
    .min(6, 'A nova senha deve ter no mínimo 6 caracteres.')
    .max(255, 'A nova senha deve ter no máximo 255 caracteres.')
    .required('A nova senha é obrigatória.'),
  token: yup
    .string()
    .max(255, 'O token deve ter no máximo 255 caracteres.')
    .required('O token é obrigatório.')
}
