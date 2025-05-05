import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ description: 'Nickname пользователя' })
  @IsString()
  public readonly nickname: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  public readonly password: string;
}
