import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import _ from 'lodash';

import { UserEntity } from '@Entities/User/Domain/User.entity';
import { UserRepositoryPort } from '@Entities/User/Ports/User.repository.port';

import { USER_REPOSITORY } from '@Infrastructure/Repositories/User/User.di.tokens';

import { FindManyUsersByQuery } from '@Modules/User/Queries/FindManyBy/FindManyBy.query';

@QueryHandler(FindManyUsersByQuery)
export class FindManyUsersByQueryHandler implements IQueryHandler<FindManyUsersByQuery> {
  private readonly logger = new Logger(FindManyUsersByQueryHandler.name);

  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort) {}

  public async execute(query: FindManyUsersByQuery): Promise<{ data: UserEntity[]; count: number }> {
    return this.userRepository.findManyBy(
      {
        ..._.pick(query, ['id', 'nickname', 'teamCodes']),
      },
      {
        ..._.pick(query, ['limit', 'page', 'offset', 'orderBy']),
      },
    );
  }
}
