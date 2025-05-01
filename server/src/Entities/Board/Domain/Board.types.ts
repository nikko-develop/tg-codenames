import { ULID } from '@Libs/types/ULID.type';

import { BoardCardProps } from '@ValueObjects/BoardCard/BoardCard.types';
import { BoardCardVO } from '@ValueObjects/BoardCard/BoardCard.valueObject';

export interface BoardProps {
  size: BoardSize;
  gameId: ULID;
  cards: BoardCardProps[];
  cardsVO: BoardCardVO[];
}

export type BoardSize = '4x4' | '5x4' | '5x5' | '6x5' | '6x6';

export type BoardSearchParams = Partial<Pick<BoardProps, 'gameId'>>;
