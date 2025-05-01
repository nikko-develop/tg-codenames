import { GameEntity } from '@Entities/Game/Domain/Game.entity';
import { GameProps, GameSearchParams } from '@Entities/Game/Domain/Game.types';

import { ReadRepositoryPort } from '@Libs/Ports/ReadRepositoryPort.base';
import { WriteRepositoryPort } from '@Libs/Ports/WriteRepositoryPort.base';
import { ObjectLiteral } from '@Libs/types/ObjectLiteral.type';

export interface GameRepositoryPort extends ReadRepositoryPort<GameEntity>, WriteRepositoryPort<GameEntity> {
  save(data: GameEntity): Promise<void>;

  search(value: string): Promise<GameEntity[]>;
  findOneBy(type: GameSearchParams, value: string): Promise<GameEntity>;
  findManyBy(filter: ObjectLiteral, page?: number, perPage?: number): Promise<GameEntity[]>;

  existsBy(type: GameSearchParams, value: string): Promise<boolean>;
}
