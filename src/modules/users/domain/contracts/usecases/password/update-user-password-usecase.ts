export interface UpdateUserPasswordUseCaseInput {
  oldPassword: string
  newPassword: string
}

export interface IUpdateUserPasswordUseCase {
  execute: (userId: string, updatePasswordData: UpdateUserPasswordUseCaseInput) => Promise<void>
}
