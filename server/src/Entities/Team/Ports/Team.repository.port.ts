import { TeamEntity } from '@Entities/Team/Domain/Team.entity';
import { TeamSearchParams } from '@Entities/Team/Domain/Team.types';

import { PaginatedQueryParams, ReadRepositoryPort } from '@Libs/Ports/ReadRepositoryPort.base';
import { WriteRepositoryPort } from '@Libs/Ports/WriteRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

export interface TeamRepositoryPort extends ReadRepositoryPort<TeamEntity>, WriteRepositoryPort<TeamEntity> {
  save(data: TeamEntity): Promise<void>;

  search(value: string): Promise<TeamEntity[]>;
  findOneBy(filter: TeamSearchParams): Promise<TeamEntity>;
  findManyBy(filter: ObjectLiteral, pagination?: PaginatedQueryParams): Promise<{ data: TeamEntity[]; count: number }>;

  existsBy(filter: TeamSearchParams): Promise<boolean>;
}
