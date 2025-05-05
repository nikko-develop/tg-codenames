import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserEntity } from '@Entities/User/Domain/User.entity';
import { UserRepositoryPort } from '@Entities/User/Ports/User.repository.port';

import { USER_REPOSITORY } from '@Infrastructure/Repositories/User/User.di.tokens';

import { FindOneUserByQuery } from '@Modules/User/Queries/FindOneBy/FindOneBy.query';

@QueryHandler(FindOneUserByQuery)
export class FindOneUserByQueryHandler implements IQueryHandler<FindOneUserByQuery> {
  public readonly logger = new Logger(FindOneUserByQueryHandler.name);

  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryPort) {}

  public async execute(query: FindOneUserByQuery): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      ...query,
    });
  }
}
