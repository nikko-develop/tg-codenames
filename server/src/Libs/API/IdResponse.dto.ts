import { ApiProperty } from '@nestjs/swagger';

export class IdResponse {
  @ApiProperty({ example: '01BX5ZZKBKACTAV9WEVGEMMVRY' })
  public readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
