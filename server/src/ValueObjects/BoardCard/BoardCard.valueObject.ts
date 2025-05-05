import { ValueObject, ValueObjectProps } from '@Libs/ddd/ValueObject.base';

import { BoardCardProps } from '@ValueObjects/BoardCard/BoardCard.types';

export class BoardCardVO extends ValueObject<BoardCardProps> {
  // eslint-disable-next-line
  public validate(props: ValueObjectProps<BoardCardProps>): void {};
}
