import { UserEntity } from '@Entities/User/Domain/User.entity';
import { UserSearchParams } from '@Entities/User/Domain/User.types';

import { ReadRepositoryPort } from '@Libs/Ports/ReadRepositoryPort.base';
import { WriteRepositoryPort } from '@Libs/Ports/WriteRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

export interface UserRepositoryPort extends ReadRepositoryPort<UserEntity>, WriteRepositoryPort<UserEntity> {
  save(data: UserEntity): Promise<void>;

  search(value: string): Promise<UserEntity[]>;
  findOneBy(filter: UserSearchParams): Promise<UserEntity>;
  findManyBy(filter: ObjectLiteral, page?: number, perPage?: number): Promise<UserEntity[]>;

  existsBy(filter: UserSearchParams): Promise<boolean>;
}
