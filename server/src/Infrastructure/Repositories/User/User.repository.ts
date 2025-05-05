import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';

import { UserEntity } from '@Entities/User/Domain/User.entity';
import { UserSearchParams } from '@Entities/User/Domain/User.types';
import { UserRepositoryPort } from '@Entities/User/Ports/User.repository.port';

import { MongoRepository } from '@Infrastructure/Repositories/MongoDB/Mongo.repository';
import { UserMapper } from '@Infrastructure/Repositories/User/User.mapper';
import { UserDocument, UserRecord } from '@Infrastructure/Repositories/User/User.schema';

import { NotFoundException } from '@Libs/Exceptions';
import { Paginated, PaginatedQueryParams } from '@Libs/Ports/ReadRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

@Injectable()
export class UserRepository extends MongoRepository<UserEntity, UserRecord> implements UserRepositoryPort {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    protected readonly mapper: UserMapper,
    @InjectModel(UserRecord.name) protected readonly model: Model<UserDocument>,
  ) {
    super(mapper);
  }

  public async save(entity: UserEntity): Promise<void> {
    const persistence = this.mapper.toPersistence(entity);
    await this.model.findOneAndUpdate({ id: entity.id }, { ...persistence, updatedAt: new Date() }, { upsert: true });
  }

  public async search(value: string): Promise<UserEntity[]> {
    return this.processSearch(value);
  }

  public async findOneBy(filter: UserSearchParams): Promise<UserEntity> {
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
  ): Promise<{ data: UserEntity[]; count: number }> {
    const users = await this.processFindMany(
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

    return users;
  }

  public async existsBy(filter: UserSearchParams): Promise<boolean> {
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

  private async processSearch(value: string): Promise<UserEntity[]> {
    const userRecords = await this.model
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
    return userRecords.map((record) => this.mapper.toDomain(record));
  }

  private async processFindOne(filter: ObjectLiteral): Promise<UserEntity> {
    const userRecord = await this.model.findOne(filter);
    if (!userRecord) throw new NotFoundException(`Пользователь не найден - filter: ${JSON.stringify(filter)}`);
    return this.mapper.toDomain(userRecord);
  }

  private async processFindMany(
    filter: ObjectLiteral,
    pagination?: PaginatedQueryParams,
  ): Promise<{ data: UserEntity[]; count: number }> {
    const userRecords = pagination
      ? await this.model.find(filter).skip(pagination.offset).limit(pagination.limit).sort(pagination.orderBy).lean()
      : await this.model.find(filter).lean();
    const count = await this.model.countDocuments();
    return {
      data: userRecords.map((record) => this.mapper.toDomain(record)),
      count: count,
    };
  }
}
