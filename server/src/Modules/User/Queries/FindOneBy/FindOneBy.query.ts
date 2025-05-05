import { QueryBase } from '@Libs/cqrs/Query.base';

export class FindOneUserByQuery extends QueryBase {
  public readonly id?: string;
  public readonly nickname?: string;
  public readonly teamCodes?: string[];

  constructor(props: FindOneUserByQuery) {
    super();

    this.id = props.id;
    this.nickname = props.nickname;
    this.teamCodes = props.teamCodes;
  }
}
