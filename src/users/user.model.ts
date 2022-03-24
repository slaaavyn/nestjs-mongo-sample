import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { RolesEnum } from './roles.enum';

@Schema()
export class User extends Document {
  @ApiProperty({ example: '888-9999-1111' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'user@domain.com' })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({ example: 'asdkasdmsekmf', description: 'hashed password' })
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty({ example: 'false' })
  @Prop({ type: Boolean, default: false })
  banned: boolean;

  @Prop({ type: [String], required: true })
  roles: RolesEnum[];
}

export const UserSchema = SchemaFactory.createForClass(User);
