import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { ulid } from 'ulid';

import { GameProps } from '@Entities/Game/Domain/Game.types';

import { Entity } from '@Libs/ddd/Entity.base';
import { ULID } from '@Libs/types/ULID.type';

export class GameEntity extends Entity<GameProps> {
  private readonly logger = new Logger(GameEntity.name);

  public static create(create: GameProps, id?: ULID, createdAt?: Date, updatedAt?: Date) {
    const newId = id ? id : ulid();
    const now = new Date(Date.now());
    const newCreatedAt = createdAt ?? now;
    const newUpdatedAt = updatedAt ?? now;
    const props: GameProps = { ...create };

    return new GameEntity({ id: newId, createdAt: newCreatedAt, updatedAt: newUpdatedAt, props });
  }

  public update(update: Partial<Pick<GameProps, 'code' | 'boardId' | 'playerIds' | 'isPrivate' | 'password'>>): void {
    Object.assign(
      this.props,
      _.omitBy(_.pick(update, ['code', 'boardId', 'playerIds', 'isPrivate', 'password']), _.isNil.bind(_)),
    );
  }

  public validate(): void {}
}
