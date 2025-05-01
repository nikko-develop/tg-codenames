import { BoardEntity } from '@Entities/Board/Domain/Board.entity';
import { UserEntity } from '@Entities/User/Domain/User.entity';

export interface GameProps {
  code: string;
  boardId: string;
  boardEntity?: BoardEntity;
  playerIds: string[];
  playerEntities?: UserEntity[];

  isPrivate: boolean;
  password?: string;
}

export type GameSearchParams = Partial<Pick<GameProps, 'code' | 'isPrivate'>>;
