import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({ description: 'ID пользователя' })
  @IsString()
  public readonly id: string;

  @ApiProperty({ description: 'Nickname пользователя' })
  @IsOptional()
  @IsString()
  public readonly nickname?: string;
}
