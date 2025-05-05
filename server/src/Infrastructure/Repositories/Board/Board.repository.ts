import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';

import { BoardEntity } from '@Entities/Board/Domain/Board.entity';
import { BoardSearchParams } from '@Entities/Board/Domain/Board.types';
import { BoardRepositoryPort } from '@Entities/Board/Ports/Board.repository.port';

import { BoardMapper } from '@Infrastructure/Repositories/Board/Board.mapper';
import { BoardDocument, BoardRecord } from '@Infrastructure/Repositories/Board/Board.schema';
import { MongoRepository } from '@Infrastructure/Repositories/MongoDB/Mongo.repository';

import { NotFoundException } from '@Libs/Exceptions';
import { PaginatedQueryParams } from '@Libs/Ports/ReadRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

@Injectable()
export class BoardRepository extends MongoRepository<BoardEntity, BoardRecord> implements BoardRepositoryPort {
  protected readonly logger = new Logger(BoardRepository.name);

  constructor(
    protected readonly mapper: BoardMapper,
    @InjectModel(BoardRecord.name) protected readonly model: Model<BoardDocument>,
  ) {
    super(mapper);
  }

  public async save(entity: BoardEntity): Promise<void> {
    const persistence = this.mapper.toPersistence(entity);
    await this.model.findOneAndUpdate({ id: entity.id }, { ...persistence, updatedAt: new Date() }, { upsert: true });
  }

  public async search(value: string): Promise<BoardEntity[]> {
    return this.processSearch(value);
  }

  public async findOneBy(filter: BoardSearchParams): Promise<BoardEntity> {
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
  ): Promise<{ data: BoardEntity[]; count: number }> {
    const boards = await this.processFindMany(
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

    return boards;
  }

  public async existsBy(filter: BoardSearchParams): Promise<boolean> {
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

  private async processSearch(value: string): Promise<BoardEntity[]> {
    const boardRecords = await this.model
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
    return boardRecords.map((record) => this.mapper.toDomain(record));
  }

  private async processFindOne(filter: ObjectLiteral): Promise<BoardEntity> {
    const boardRecord = await this.model.findOne(filter);
    if (!boardRecord) throw new NotFoundException(`Игровое поле не найдено - filter: ${JSON.stringify(filter)}`);
    return this.mapper.toDomain(boardRecord);
  }

  private async processFindMany(
    filter: ObjectLiteral,
    pagination?: PaginatedQueryParams,
  ): Promise<{ data: BoardEntity[]; count: number }> {
    const boardRecords = pagination
      ? await this.model.find(filter).skip(pagination.offset).limit(pagination.limit).sort(pagination.orderBy).lean()
      : await this.model.find(filter).lean();
    const count = await this.model.countDocuments();
    return {
      data: boardRecords.map((record) => this.mapper.toDomain(record)),
      count: count,
    };
  }
}
