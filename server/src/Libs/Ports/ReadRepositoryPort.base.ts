export class Paginated<T> {
  public readonly page: number;
  public readonly perPage: number;
  public readonly totalCount: number;
  public readonly data: T[];

  public constructor(props: Paginated<T>) {
    this.perPage = props.perPage;
    this.totalCount = props.totalCount;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy = { field: string | true; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  perPage?: number;
  page?: number;
};

export interface ReadRepositoryPort<Entity> {
  findById(id: string): Promise<Entity>;
  findAllPaginated(paging: PaginatedQueryParams): Promise<Paginated<Entity>>;
}
