import { Injectable } from '@nestjs/common';

import { GameEntity } from '@Entities/Game/Domain/Game.entity';

import { GameRecord } from '@Infrastructure/Repositories/Game/Game.schema';

import { Mapper } from '@Libs/ddd/Mapper.interface';

@Injectable()
export class GameMapper implements Mapper<GameEntity, GameRecord> {
  public toPersistence(entity: GameEntity): GameRecord {
    const propsCopy = entity.getPropsCopy();
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      code: propsCopy.code,
      boardId: propsCopy.boardId,
      playerIds: propsCopy.playerIds,
      isPrivate: propsCopy.isPrivate,
      password: propsCopy.password,
    };
  }

  public toDomain(record: GameRecord): GameEntity {
    return GameEntity.create(
      {
        code: record.code,
        boardId: record.boardId,
        boardEntity: undefined,
        playerIds: record.playerIds,
        playerEntities: undefined,
        isPrivate: record.isPrivate,
        password: record.password,
      },
      record.id,
      record.createdAt,
      record.updatedAt,
    );
  }
}
