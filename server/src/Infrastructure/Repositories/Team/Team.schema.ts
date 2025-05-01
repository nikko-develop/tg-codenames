import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { TeamType } from '@Entities/Team/Domain/Team.types';

import { MongoSchemaBase } from '@Infrastructure/Repositories/MongoDB/MongoSchema.base';

export type TeamDocument = HydratedDocument<TeamRecord>;

@Schema({ collection: 'teams' })
export class TeamRecord extends MongoSchemaBase {
  @Prop()
  public code: string;
  @Prop({ type: String })
  public type: TeamType;
  @Prop()
  public captainId: string;
  @Prop({ type: [String] })
  public memberIds: string[];
  @Prop()
  public bonusStep: number;
}

export const TeamSchema = SchemaFactory.createForClass(TeamRecord);
TeamSchema.index({ code: 1 }, { unique: true });
