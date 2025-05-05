import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ description: 'Nickname пользователя' })
  @IsString()
  public readonly nickname: string;
  @ApiPropertyOptional({ description: 'Пароль, если не задан то авторизация временная' })
  @IsOptional()
  @IsString()
  public readonly password?: string;
}
