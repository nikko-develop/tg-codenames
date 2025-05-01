import { Injectable } from '@nestjs/common';

import { BoardEntity } from '@Entities/Board/Domain/Board.entity';

import { BoardRecord } from '@Infrastructure/Repositories/Board/Board.schema';

import { Mapper } from '@Libs/ddd/Mapper.interface';

import { BoardCardVO } from '@ValueObjects/BoardCard/BoardCard.valueObject';

@Injectable()
export class BoardMapper implements Mapper<BoardEntity, BoardRecord> {
  public toPersistence(entity: BoardEntity): BoardRecord {
    const propsCopy = entity.getPropsCopy();
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      size: propsCopy.size,
      gameId: propsCopy.gameId,
      cards: propsCopy.cards.map((card) => {
        return {
          type: card.type,
          isOpen: card.isOpen,
          position: card.position,
        };
      }),
    };
  }

  public toDomain(record: BoardRecord): BoardEntity {
    return BoardEntity.create(
      {
        size: record.size,
        gameId: record.gameId,
        cards: record.cards.map((card) => {
          return {
            type: card.type,
            isOpen: card.isOpen,
            position: card.position,
          };
        }),
        cardsVO: record.cards.map((card) => {
          return new BoardCardVO(card);
        }),
      },
      record.id,
      record.createdAt,
      record.updatedAt,
    );
  }
}
