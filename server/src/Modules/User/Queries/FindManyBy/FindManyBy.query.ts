import { QueryBase } from '@Libs/cqrs/Query.base';
import { OrderBy } from '@Libs/Ports/ReadRepositoryPort.base';

export class FindManyUsersByQuery extends QueryBase {
  public readonly id?: string;
  public readonly nickname?: string;
  public readonly teamCodes?: string[];

  public readonly page: number;
  public readonly limit: number;
  public readonly offset: number;
  public readonly orderBy: OrderBy;

  constructor(props: FindManyUsersByQuery) {
    super();

    this.id = props.id;
    this.nickname = props.nickname;
    this.teamCodes = props.teamCodes;
    this.page = props.page;
    this.limit = props.limit;
    this.offset = props.offset;
    this.orderBy = props.orderBy;
  }
}
