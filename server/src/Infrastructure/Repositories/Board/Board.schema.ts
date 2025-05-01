import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BoardSize } from '@Entities/Board/Domain/Board.types';

import { MongoSchemaBase } from '@Infrastructure/Repositories/MongoDB/MongoSchema.base';

import { BoardCardType } from '@ValueObjects/BoardCard/BoardCard.types';

export type BoardDocument = HydratedDocument<BoardRecord>;

@Schema({ _id: false })
class CardRecord {
  @Prop({ type: String })
  public type: BoardCardType;
  @Prop()
  public isOpen: boolean;
  @Prop({ type: [Number] })
  public position: [number, number];
}
const CardSchema = SchemaFactory.createForClass(CardRecord);

@Schema({ collection: 'boards' })
export class BoardRecord extends MongoSchemaBase {
  @Prop({ type: String })
  public size: BoardSize;
  @Prop()
  public gameId: string;
  @Prop({ type: [CardSchema] })
  public cards: Array<CardRecord>;
}

export const BoardSchema = SchemaFactory.createForClass(BoardRecord);
