import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { MongoSchemaBase } from '@Infrastructure/Repositories/MongoDB/MongoSchema.base';

export type UserDocument = HydratedDocument<UserRecord>;

@Schema({ collection: 'users' })
export class UserRecord extends MongoSchemaBase {
  @Prop()
  public nickname: string;
  @Prop({ type: [String] })
  public teamCodes: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserRecord);
UserSchema.index({ nickname: 1 }, { unique: true });
