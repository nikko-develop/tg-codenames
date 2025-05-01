import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExceptionResponseDto {
  @ApiProperty({ description: 'Код ошибки' })
  public code: string;

  @ApiProperty({ description: 'Время возникновения ошибки', example: '2022-12-22T13:26:00.000Z' })
  public timestamp: string;

  @ApiProperty({ description: 'Текст сообщения об ошибке' })
  public message: string;

  @ApiPropertyOptional({ description: 'Correlation ID', example: '01BX5ZZKBKACTAV9WEVGEMMVRY' })
  public correlationId?: string;

  @ApiPropertyOptional({ description: 'Причина исключения', type: String })
  public cause?: string;

  @ApiPropertyOptional({ description: 'Стек трейс ошибки', type: String })
  public stack?: string;

  @ApiPropertyOptional({ description: 'Опциональные метаданные' })
  public metadata?: unknown;
}
