import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUserRequestDto {
  @ApiProperty({ description: 'ID пользователя' })
  @IsString()
  public readonly id: string;
}
