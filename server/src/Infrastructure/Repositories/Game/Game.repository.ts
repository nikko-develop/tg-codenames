import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';

import { GameEntity } from '@Entities/Game/Domain/Game.entity';
import { GameSearchParams } from '@Entities/Game/Domain/Game.types';
import { GameRepositoryPort } from '@Entities/Game/Ports/Game.repository.port';

import { GameMapper } from '@Infrastructure/Repositories/Game/Game.mapper';
import { GameDocument, GameRecord } from '@Infrastructure/Repositories/Game/Game.schema';
import { MongoRepository } from '@Infrastructure/Repositories/MongoDB/Mongo.repository';

import { NotFoundException } from '@Libs/Exceptions';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

@Injectable()
export class GameRepository extends MongoRepository<GameEntity, GameRecord> implements GameRepositoryPort {
  protected readonly logger = new Logger(GameRepository.name);

  public constructor(
    protected readonly mapper: GameMapper,
    @InjectModel(GameRecord.name) protected readonly model: Model<GameDocument>,
  ) {
    super(mapper);
  }

  public async save(entity: GameEntity): Promise<void> {
    const persistence = this.mapper.toPersistence(entity);
    await this.model.findOneAndUpdate({ id: entity.id }, { ...persistence, updatedAt: new Date() }, { upsert: true });
  }

  public async search(value: string): Promise<GameEntity[]> {
    return this.processSearch(value);
  }

  public async findOneBy(filter: GameSearchParams): Promise<GameEntity> {
    return this.processFindOne({
      $or: [
        ...Object.entries(filter).map(([key, value]) => ({
          [key]: {
            $regex: value,
            $options: 'i',
          },
        })),
      ],
    });
  }

  public async findManyBy(filter: ObjectLiteral, page?: number, perPage?: number): Promise<GameEntity[]> {
    const Games = await this.processFindMany({
      $or: [
        ...Object.entries(filter).map(([key, value]) => ({
          [key]: {
            $regex: value,
            $options: 'i',
          },
        })),
      ],
    });

    if (page && perPage) {
      return this.processSlicePagination(Games, page, perPage);
    }

    return Games;
  }

  public async existsBy(filter: GameSearchParams): Promise<boolean> {
    return Boolean(
      await this.processFindOne({
        $or: [
          ...Object.entries(filter).map(([key, value]) => ({
            [key]: {
              $regex: value,
              $options: 'i',
            },
          })),
        ],
      }),
    );
  }

  private async processSearch(value: string): Promise<GameEntity[]> {
    const gameRecords = await this.model
      .find({
        $or: [
          {
            nickname: {
              $regex: value,
              $options: 'i',
            },
          },
        ],
      })
      .lean();
    return gameRecords.map((record) => this.mapper.toDomain(record));
  }

  private async processFindOne(filter: ObjectLiteral): Promise<GameEntity> {
    const gameRecord = await this.model.findOne(filter);
    if (!gameRecord) throw new NotFoundException(`Игровое поле не найдено - filter: ${JSON.stringify(filter)}`);
    return this.mapper.toDomain(gameRecord);
  }

  private async processFindMany(filter: ObjectLiteral): Promise<GameEntity[]> {
    const gameRecords = await this.model.find(filter).lean();
    return gameRecords.map((record) => this.mapper.toDomain(record));
  }

  private processSlicePagination(games: GameEntity[], page: number, perPage: number): GameEntity[] {
    const offset = (page - 1) * perPage;

    return games.slice(offset, offset + perPage);
  }
}
