import { Type } from 'class-transformer';
import { IsPort, IsString, ValidateNested } from 'class-validator';

import { MongoConfig } from '@Libs/Config/Schemas/Mongo.config.schema';

export class ConfigSchema {
  @ValidateNested()
  @Type(() => MongoConfig)
  public readonly mongo!: MongoConfig;

  @IsString()
  public readonly name!: string;

  @IsPort()
  @Type(() => String)
  public readonly port!: number;
}
