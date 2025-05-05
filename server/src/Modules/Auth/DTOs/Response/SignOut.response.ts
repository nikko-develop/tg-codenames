import { ApiProperty } from '@nestjs/swagger';

export class SignOutResponseDto {
  @ApiProperty({ description: 'Сообщение о процессе выполнения запроса' })
  public readonly message: string;
}
