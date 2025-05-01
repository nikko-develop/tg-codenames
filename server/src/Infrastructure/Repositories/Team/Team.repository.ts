import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { Model } from 'mongoose';

import { TeamEntity } from '@Entities/Team/Domain/Team.entity';
import { TeamSearchParams } from '@Entities/Team/Domain/Team.types';
import { TeamRepositoryPort } from '@Entities/Team/Ports/Team.repository.port';

import { MongoRepository } from '@Infrastructure/Repositories/MongoDB/Mongo.repository';
import { TeamMapper } from '@Infrastructure/Repositories/Team/Team.mapper';
import { TeamDocument, TeamRecord } from '@Infrastructure/Repositories/Team/Team.schema';

import { NotFoundException } from '@Libs/Exceptions';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

@Injectable()
export class TeamRepository extends MongoRepository<TeamEntity, TeamRecord> implements TeamRepositoryPort {
  protected readonly logger = new Logger(TeamRepository.name);

  public constructor(
    protected readonly mapper: TeamMapper,
    @InjectModel(TeamRecord.name) protected readonly model: Model<TeamDocument>,
  ) {
    super(mapper);
  }

  public async save(entity: TeamEntity): Promise<void> {
    const persistence = this.mapper.toPersistence(entity);
    await this.model.findOneAndUpdate({ id: entity.id }, { ...persistence, updatedAt: new Date() }, { upsert: true });
  }

  public async search(value: string): Promise<TeamEntity[]> {
    return this.processSearch(value);
  }

  public async findOneBy(filter: TeamSearchParams): Promise<TeamEntity> {
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

  public async findManyBy(filter: ObjectLiteral, page?: number, perPage?: number): Promise<TeamEntity[]> {
    const Teams = await this.processFindMany({
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
      return this.processSlicePagination(Teams, page, perPage);
    }

    return Teams;
  }

  public async existsBy(filter: TeamSearchParams): Promise<boolean> {
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

  private async processSearch(value: string): Promise<TeamEntity[]> {
    const teamRecords = await this.model
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
    return teamRecords.map((record) => this.mapper.toDomain(record));
  }

  private async processFindOne(filter: ObjectLiteral): Promise<TeamEntity> {
    const teamRecord = await this.model.findOne(filter);
    if (!teamRecord) throw new NotFoundException(`Пользователь не найден - filter: ${JSON.stringify(filter)}`);
    return this.mapper.toDomain(teamRecord);
  }

  private async processFindMany(filter: ObjectLiteral): Promise<TeamEntity[]> {
    const teamRecords = await this.model.find(filter).lean();
    return teamRecords.map((record) => this.mapper.toDomain(record));
  }

  private processSlicePagination(teams: TeamEntity[], page: number, perPage: number): TeamEntity[] {
    const offset = (page - 1) * perPage;

    return teams.slice(offset, offset + perPage);
  }
}
