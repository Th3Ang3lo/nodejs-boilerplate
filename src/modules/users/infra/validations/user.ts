import * as yup from 'yup'

export const updateUser = {
  name: yup
    .string()
    .max(255, 'O nome deve ter no máximo 255 caracteres.')
    .optional(),
  phone: yup
    .string()
    .optional()
    .nullable()
    .min(10, 'Número de celular inválido.')
    .max(11, 'Número de celular inválido.')
    .transform((value) => value || null),
  email: yup
    .string()
    .email('E-mail inválido.')
    .max(255, 'O e-mail deve ter no máximo 255 caracteres.')
    .optional()
}
