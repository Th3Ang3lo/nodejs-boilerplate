import * as yup from 'yup'

export const register = {
  name: yup
    .string()
    .max(255, 'O nome deve ter no máximo 255 caracteres.')
    .required('Nome obrigatório.'),
  email: yup
    .string()
    .email('E-mail inválido.')
    .max(255, 'O e-mail deve ter no máximo 255 caracteres.')
    .required('E-mail obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(255, 'A senha deve ter no máximo 255 caracteres.')
    .required('Senha obrigatória.'),
  phone: yup
    .string()
    .optional()
    .nullable()
    .min(10, 'Número de celular inválido.')
    .max(11, 'Número de celular inválido.')
    .transform((value) => value || null)
}
