import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ description: 'Код статуса ответа', example: 400 })
  public statusCode: number;

  @ApiProperty({ description: 'Код ошибки', example: 'Bad request' })
  public error: string;

  @ApiProperty({ description: 'Описание ошибок', type: [String], example: ['userId must be a mongodb id'] })
  public message: string[];
}
