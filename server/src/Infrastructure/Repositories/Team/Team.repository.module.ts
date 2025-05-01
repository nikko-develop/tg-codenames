import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TEAM_REPOSITORY } from '@Infrastructure/Repositories/Team/Team.di.tokens';
import { TeamMapper } from '@Infrastructure/Repositories/Team/Team.mapper';
import { TeamRepository } from '@Infrastructure/Repositories/Team/Team.repository';
import { TeamRecord, TeamSchema } from '@Infrastructure/Repositories/Team/Team.schema';

const repositories: Provider[] = [
  {
    provide: TEAM_REPOSITORY,
    useClass: TeamRepository,
  },
];

const mappers: Provider[] = [TeamMapper];

@Module({
  imports: [MongooseModule.forFeature([{ name: TeamRecord.name, schema: TeamSchema }])],
  providers: [...repositories, ...mappers],
  exports: [...repositories, ...mappers],
})
export class TeamRepositoryModule {}
