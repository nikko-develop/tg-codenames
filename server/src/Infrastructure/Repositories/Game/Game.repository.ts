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
import { PaginatedQueryParams } from '@Libs/Ports/ReadRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

@Injectable()
export class GameRepository extends MongoRepository<GameEntity, GameRecord> implements GameRepositoryPort {
  protected readonly logger = new Logger(GameRepository.name);

  constructor(
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

  public async findManyBy(
    filter: ObjectLiteral,
    pagination?: PaginatedQueryParams,
  ): Promise<{ data: GameEntity[]; count: number }> {
    const games = await this.processFindMany(
      {
        $or: [
          ...Object.entries(filter).map(([key, value]) =>
            !Array.isArray(value)
              ? {
                  [key]: {
                    $regex: value,
                    $options: 'i',
                  },
                }
              : {
                  [key]: {
                    $in: value,
                  },
                },
          ),
        ],
      },
      pagination,
    );

    return games;
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

  private async processFindMany(
    filter: ObjectLiteral,
    pagination?: PaginatedQueryParams,
  ): Promise<{ data: GameEntity[]; count: number }> {
    const gameRecords = pagination
      ? await this.model.find(filter).skip(pagination.offset).limit(pagination.limit).sort(pagination.orderBy).lean()
      : await this.model.find(filter).lean();
    const count = await this.model.countDocuments();
    return {
      data: gameRecords.map((record) => this.mapper.toDomain(record)),
      count: count,
    };
  }
}
