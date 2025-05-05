import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

import { OrderBy } from '@Libs/Ports/ReadRepositoryPort.base';

export class PaginatedQueryRequestDto {
  @ApiPropertyOptional({ description: 'Страница пагинации', default: 1 })
  @IsOptional()
  @IsNumber()
  public readonly page: number = 1;

  @ApiPropertyOptional({ description: 'Количество возвращаемых элементов', default: 20 })
  @IsOptional()
  @IsNumber()
  public readonly limit: number = 20;

  @ApiPropertyOptional({ description: 'Количество пропускаемых элементов', default: 0 })
  @IsOptional()
  @IsNumber()
  public readonly offset: number = 0;

  @ApiPropertyOptional({ description: 'Сортировка', default: { createdAt: 'asc' } })
  @IsOptional()
  @IsObject()
  public readonly orderBy: OrderBy = { createdAt: 'asc' };
}
