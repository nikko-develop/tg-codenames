import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { ulid } from 'ulid';

import { TeamProps } from '@Entities/Team/Domain/Team.types';

import { Entity } from '@Libs/ddd/Entity.base';
import { ULID } from '@Libs/types/ULID.type';

export class TeamEntity extends Entity<TeamProps> {
  private readonly logger = new Logger(TeamEntity.name);

  public static create(create: TeamProps, id?: ULID, createdAt?: Date, updatedAt?: Date) {
    const newId = id ? id : ulid();
    const now = new Date(Date.now());
    const newCreatedAt = createdAt ?? now;
    const newUpdatedAt = updatedAt ?? now;
    const props: TeamProps = { ...create };

    return new TeamEntity({ id: newId, createdAt: newCreatedAt, updatedAt: newUpdatedAt, props });
  }

  public update(update: Partial<Pick<TeamProps, 'code' | 'type' | 'captainId' | 'memberIds' | 'bonusStep'>>): void {
    Object.assign(
      this.props,
      _.omitBy(_.pick(update, ['code', 'type', 'captain', 'members', 'bonusStep']), _.isNil.bind(_)),
    );
  }

  public validate(): void {}
}
