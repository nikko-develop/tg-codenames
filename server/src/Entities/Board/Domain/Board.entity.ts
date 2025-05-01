import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { ulid } from 'ulid';

import { BoardProps } from '@Entities/Board/Domain/Board.types';

import { Entity } from '@Libs/ddd/Entity.base';
import { ULID } from '@Libs/types/ULID.type';

export class BoardEntity extends Entity<BoardProps> {
  private readonly logger = new Logger(BoardEntity.name);

  public static create(create: BoardProps, id?: ULID, createdAt?: Date, updatedAt?: Date) {
    const newId = id ? id : ulid();
    const now = new Date(Date.now());
    const newCreatedAt = createdAt ?? now;
    const newUpdatedAt = updatedAt ?? now;
    const props: BoardProps = { ...create };

    return new BoardEntity({ id: newId, createdAt: newCreatedAt, updatedAt: newUpdatedAt, props });
  }

  public validate(): void {}
}
