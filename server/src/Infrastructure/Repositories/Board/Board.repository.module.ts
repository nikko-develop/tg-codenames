import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BOARD_REPOSITORY } from '@Infrastructure/Repositories/Board/Board.di.tokens';
import { BoardMapper } from '@Infrastructure/Repositories/Board/Board.mapper';
import { BoardRepository } from '@Infrastructure/Repositories/Board/Board.repository';
import { BoardRecord, BoardSchema } from '@Infrastructure/Repositories/Board/Board.schema';

const repositories: Provider[] = [
  {
    provide: BOARD_REPOSITORY,
    useClass: BoardRepository,
  },
];

const mappers: Provider[] = [BoardMapper];

@Module({
  imports: [MongooseModule.forFeature([{ name: BoardRecord.name, schema: BoardSchema }])],
  providers: [...repositories, ...mappers],
  exports: [...repositories, ...mappers],
})
export class BoardRepositoryModule {}
