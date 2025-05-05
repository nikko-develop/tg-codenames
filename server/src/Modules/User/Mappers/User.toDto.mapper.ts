import { UserEntity } from '@Entities/User/Domain/User.entity';

import { UserResponseDto } from '@Modules/User/DTOs/Response/User.response';

export class UserToDTOMapper {
  public toDTO(entity: UserEntity): UserResponseDto {
    const propsCopy = entity.getPropsCopy();

    return {
      id: propsCopy.id,
      createdAt: propsCopy.createdAt,
      updatedAt: propsCopy.updatedAt,
      nickname: propsCopy.nickname,
      teamCodes: propsCopy.teamCodes,
    };
  }
}
