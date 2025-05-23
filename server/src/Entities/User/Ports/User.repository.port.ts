import { UserEntity } from '@Entities/User/Domain/User.entity';
import { UserSearchParams } from '@Entities/User/Domain/User.types';

import { PaginatedQueryParams, ReadRepositoryPort } from '@Libs/Ports/ReadRepositoryPort.base';
import { WriteRepositoryPort } from '@Libs/Ports/WriteRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

export interface UserRepositoryPort extends ReadRepositoryPort<UserEntity>, WriteRepositoryPort<UserEntity> {
  save(data: UserEntity): Promise<void>;

  search(value: string): Promise<UserEntity[]>;
  findOneBy(filter: UserSearchParams): Promise<UserEntity>;
  findManyBy(filter: ObjectLiteral, pagination?: PaginatedQueryParams): Promise<{ data: UserEntity[]; count: number }>;

  existsBy(filter: UserSearchParams): Promise<boolean>;
}
