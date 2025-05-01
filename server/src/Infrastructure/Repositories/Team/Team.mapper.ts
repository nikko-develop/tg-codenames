import { Injectable } from '@nestjs/common';

import { TeamEntity } from '@Entities/Team/Domain/Team.entity';

import { TeamRecord } from '@Infrastructure/Repositories/Team/Team.schema';

import { Mapper } from '@Libs/ddd/Mapper.interface';

@Injectable()
export class TeamMapper implements Mapper<TeamEntity, TeamRecord> {
  public constructor() {}
  public toPersistence(entity: TeamEntity): TeamRecord {
    const propsCopy = entity.getPropsCopy();
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      code: propsCopy.code,
      type: propsCopy.type,
      captainId: propsCopy.captainId,
      memberIds: propsCopy.memberIds,
      bonusStep: propsCopy.bonusStep,
    };
  }

  public toDomain(record: TeamRecord): TeamEntity {
    return TeamEntity.create(
      {
        code: record.code,
        type: record.type,
        captainId: record.captainId,
        captainEntity: undefined,
        memberIds: record.memberIds,
        memberEntities: undefined,
        bonusStep: record.bonusStep,
      },
      record.id,
      record.createdAt,
      record.updatedAt,
    );
  }
}
