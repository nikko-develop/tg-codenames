import { ApiProperty } from '@nestjs/swagger';

import { Paginated } from '@Libs/Ports/ReadRepositoryPort.base';
import { ULID } from '@Libs/types/ULID.type';

export class PaginatedUserResponseDto extends Paginated<UserResponseDto> {}

export class UserResponseDto {
  @ApiProperty({ description: 'ID пользователя' })
  public readonly id: ULID;

  @ApiProperty({ description: 'Дата создания пользователя' })
  public readonly createdAt: Date;

  @ApiProperty({ description: 'Дата последнего обновления пользователя' })
  public readonly updatedAt: Date;

  @ApiProperty({ description: 'Никнейм пользователя' })
  public readonly nickname: string;

  @ApiProperty({ description: 'Коды команд пользователя' })
  public readonly teamCodes: string[];
}
