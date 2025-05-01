import { BoardEntity } from '@Entities/Board/Domain/Board.entity';
import { BoardSearchParams } from '@Entities/Board/Domain/Board.types';

import { ReadRepositoryPort } from '@Libs/Ports/ReadRepositoryPort.base';
import { WriteRepositoryPort } from '@Libs/Ports/WriteRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

export interface BoardRepositoryPort extends ReadRepositoryPort<BoardEntity>, WriteRepositoryPort<BoardEntity> {
  save(data: BoardEntity): Promise<void>;

  search(value: string): Promise<BoardEntity[]>;
  findOneBy(type: BoardSearchParams, value: string): Promise<BoardEntity>;
  findManyBy(filter: ObjectLiteral, page?: number, perPage?: number): Promise<BoardEntity[]>;

  existsBy(type: BoardSearchParams, value: string): Promise<boolean>;
}
