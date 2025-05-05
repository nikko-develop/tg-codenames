import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '@Libs/Config/App.routes';
import { QueryResponse } from '@Libs/types/CQRSResponse.type';

import { FindUserByRequestDto } from '@Modules/User/DTOs/Request/FindBy.request';
import { UserResponseDto } from '@Modules/User/DTOs/Response/User.response';
import { UserToDTOMapper } from '@Modules/User/Mappers/User.toDto.mapper';
import { FindOneUserByQuery } from '@Modules/User/Queries/FindOneBy/FindOneBy.query';
import { FindOneUserByQueryHandler } from '@Modules/User/Queries/FindOneBy/FindOneBy.queryHandler';

@ApiTags(routesV1.user.tag)
@Controller(routesV1.version)
export class FindOneUserByHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: UserToDTOMapper,
  ) {}

  @Post(routesV1.user.findOne)
  @ApiOkResponse({ description: 'Возвращает пользователя', type: UserResponseDto })
  public async execute(@Body() dto: FindUserByRequestDto): Promise<UserResponseDto> {
    const user = await this.queryBus.execute<FindOneUserByQuery, QueryResponse<FindOneUserByQueryHandler>>(
      new FindOneUserByQuery({ ...dto }),
    );

    return this.mapper.toDTO(user);
  }
}
