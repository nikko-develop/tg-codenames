import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { ulid } from 'ulid';

import { UserProps } from '@Entities/User/Domain/User.types';

import { Entity } from '@Libs/ddd/Entity.base';
import { ULID } from '@Libs/types/ULID.type';

export class UserEntity extends Entity<UserProps> {
  private readonly logger = new Logger(UserEntity.name);

  public static create(create: UserProps, id?: ULID, createdAt?: Date, updatedAt?: Date) {
    const newId = id ? id : ulid();
    const now = new Date(Date.now());
    const newCreatedAt = createdAt ?? now;
    const newUpdatedAt = updatedAt ?? now;
    const props: UserProps = { ...create };

    return new UserEntity({ id: newId, createdAt: newCreatedAt, updatedAt: newUpdatedAt, props });
  }

  public update(update: Partial<Pick<UserProps, 'nickname' | 'teamCodes'>>): void {
    Object.assign(this.props, _.omitBy(_.pick(update, ['nickname', 'teams']), _.isNil.bind(_)));
  }

  public validate(): void {}
}
