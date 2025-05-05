import { ulid } from 'ulid';

import { RequestContextService } from '@Libs/Application/AppRequestContext';
import { ArgumentNotProvidedException } from '@Libs/Exceptions';
import { Guard } from '@Libs/Guard';

export type CommandProps<T> = Omit<T, 'correlationId' | 'id'> & Partial<CommandBase>;

export class CommandBase {
  public readonly id: string;

  public readonly correlationId: string;

  public readonly causationId?: string;

  constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Command props should not be empty.');
    }

    const ctx = RequestContextService.getContext();
    this.correlationId = props.correlationId ?? ctx?.req.id ?? ulid();
    this.id = props.id ?? ulid();
  }
}
