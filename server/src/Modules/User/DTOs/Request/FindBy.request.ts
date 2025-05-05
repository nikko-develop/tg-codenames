import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginatedQueryRequestDto } from '@Modules/Base/Paginated.request';

export class FindUserByRequestDto extends PaginatedQueryRequestDto {
  @ApiProperty({ description: 'ID пользователя' })
  @IsOptional()
  @IsString()
  public readonly id?: string;

  @ApiProperty({ description: 'Nickname пользователя' })
  @IsOptional()
  @IsString()
  public readonly nickname?: string;

  @ApiProperty({ description: 'Коды команд' })
  @IsOptional()
  @IsString()
  public readonly teamCodes?: string[];
}
