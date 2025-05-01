import { OrderBy, PaginatedQueryParams } from '@Libs/Ports/ReadRepositoryPort.base';

export abstract class QueryBase {}

export abstract class PaginatedQueryBase extends QueryBase {
  public page: number;
  public limit: number;
  public offset: number;
  public orderBy: OrderBy;

  public constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super();
    this.limit = props.limit ?? 20;
    this.offset = props.page ? props.page * this.limit : 0;
    this.page = props.page ?? 0;
    this.orderBy = props.orderBy ?? { field: true, param: 'asc' };
  }
}

export type PaginatedParams<T> = Omit<T, 'offset' | 'perPage' | 'page'> & Partial<PaginatedQueryParams>;
