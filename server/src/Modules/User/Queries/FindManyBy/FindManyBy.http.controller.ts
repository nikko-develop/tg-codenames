import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '@Libs/Config/App.routes';
import { QueryResponse } from '@Libs/types/CQRSResponse.type';

import { FindUserByRequestDto } from '@Modules/User/DTOs/Request/FindBy.request';
import { PaginatedUserResponseDto } from '@Modules/User/DTOs/Response/User.response';
import { UserToDTOMapper } from '@Modules/User/Mappers/User.toDto.mapper';
import { FindManyUsersByQuery } from '@Modules/User/Queries/FindManyBy/FindManyBy.query';
import { FindManyUsersByQueryHandler } from '@Modules/User/Queries/FindManyBy/FindManyBy.queryHandler';

@ApiTags(routesV1.user.tag)
@Controller(routesV1.version)
export class FindManyUsersByHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: UserToDTOMapper,
  ) {}

  @Post(routesV1.user.findMany)
  @ApiOkResponse({ description: 'Возвращает список пользователей', type: PaginatedUserResponseDto })
  public async execute(@Body() dto: FindUserByRequestDto): Promise<PaginatedUserResponseDto> {
    const result = await this.queryBus.execute<FindManyUsersByQuery, QueryResponse<FindManyUsersByQueryHandler>>(
      new FindManyUsersByQuery({ ...dto }),
    );

    return {
      data: result.data.map((elem) => this.mapper.toDTO(elem)),
      limit: dto.limit,
      page: dto.page,
      count: result.count,
    };
  }
}
