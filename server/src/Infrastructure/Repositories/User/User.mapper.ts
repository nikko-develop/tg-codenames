import { Injectable } from '@nestjs/common';

import { UserEntity } from '@Entities/User/Domain/User.entity';

import { UserRecord } from '@Infrastructure/Repositories/User/User.schema';

import { Mapper } from '@Libs/ddd/Mapper.interface';

@Injectable()
export class UserMapper implements Mapper<UserEntity, UserRecord> {
  public toPersistence(entity: UserEntity): UserRecord {
    const propsCopy = entity.getPropsCopy();
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      nickname: propsCopy.nickname,
      teamCodes: propsCopy.teamCodes,
    };
  }

  public toDomain(record: UserRecord): UserEntity {
    return UserEntity.create(
      {
        nickname: record.nickname,
        teamCodes: record.teamCodes,
      },
      record.id,
      record.createdAt,
      record.updatedAt,
    );
  }
}
