import { CommandBase, CommandProps } from '@Libs/cqrs/Command.base';

export class SignInCommand extends CommandBase {
  public readonly nickname: string;
  public readonly password?: string;

  constructor(props: CommandProps<SignInCommand>) {
    super(props);

    this.nickname = props.nickname;
    this.password = props.password;
  }
}
