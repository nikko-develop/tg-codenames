import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({ description: 'Токен доступа', type: String })
  public readonly accessToken: string;
}
