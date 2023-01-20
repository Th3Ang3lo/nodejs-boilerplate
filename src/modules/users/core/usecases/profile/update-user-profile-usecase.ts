import { ConflictException, NotFoundException } from '@/shared/exceptions'

import { IUsersRepository } from '@/domain/contracts/repositories/users-repository'

import { IStorageProvider } from '@/domain/contracts/providers'

import { UpdateUserProfileInput, UpdateUserProfileOutput } from '@/modules/users/domain/contracts/usecases/profile/update-user-profile-usecase'

export class UpdateUserProfileUseCase {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly storageProvider: IStorageProvider
  ) { }

  public async execute (userId: string, updateData: UpdateUserProfileInput): Promise<UpdateUserProfileOutput> {
    const { name, picture, phone, email } = updateData

    const user = await this.usersRepository.findById(userId)
    if (!user) throw new NotFoundException('Usuário não encontrado.')

    if (email) {
      const findUserByEmail = await this.usersRepository.findByEmail(email)

      if (findUserByEmail && user.getData().id !== userId) throw new ConflictException('E-mail indisponível.')
    }

    const pictureUrl = picture
      ? await this.storageProvider.saveFile(picture, 'users/pictures')
      : undefined

    user.change({
      name,
      phone,
      picture: pictureUrl,
      email
    })

    const updateUser = await this.usersRepository.update(user)

    return {
      user: updateUser.getData()
    }
  }
}
