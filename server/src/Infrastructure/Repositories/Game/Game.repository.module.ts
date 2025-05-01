import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GAME_REPOSITORY } from '@Infrastructure/Repositories/Game/Game.di.tokens';
import { GameMapper } from '@Infrastructure/Repositories/Game/Game.mapper';
import { GameRepository } from '@Infrastructure/Repositories/Game/Game.repository';
import { GameRecord, GameSchema } from '@Infrastructure/Repositories/Game/Game.schema';

const repositories: Provider[] = [
  {
    provide: GAME_REPOSITORY,
    useClass: GameRepository,
  },
];

const mappers: Provider[] = [GameMapper];

@Module({
  imports: [MongooseModule.forFeature([{ name: GameRecord.name, schema: GameSchema }])],
  providers: [...repositories, ...mappers],
  exports: [...repositories, ...mappers],
})
export class GameRepositoryModule {}
