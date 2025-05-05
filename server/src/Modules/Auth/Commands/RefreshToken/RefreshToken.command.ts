import { CommandBase, CommandProps } from '@Libs/cqrs/Command.base';

export class RefreshTokenCommand extends CommandBase {
  public readonly refreshToken: string;

  constructor(props: CommandProps<RefreshTokenCommand>) {
    super(props);

    this.refreshToken = props.refreshToken;
  }
}
