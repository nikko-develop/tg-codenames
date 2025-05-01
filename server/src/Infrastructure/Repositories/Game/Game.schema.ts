import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { MongoSchemaBase } from '@Infrastructure/Repositories/MongoDB/MongoSchema.base';

export type GameDocument = HydratedDocument<GameRecord>;

@Schema({ collection: 'games' })
export class GameRecord extends MongoSchemaBase {
  @Prop()
  public code: string;
  @Prop()
  public boardId: string;
  @Prop({ type: [String] })
  public playerIds: string[];
  @Prop()
  public isPrivate: boolean;
  @Prop()
  public password?: string;
}

export const GameSchema = SchemaFactory.createForClass(GameRecord);
GameSchema.index({ code: 1 }, { unique: true });
GameSchema.index({ boardId: 1 });
