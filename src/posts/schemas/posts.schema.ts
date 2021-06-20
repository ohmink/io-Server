import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema({ timestamps: true })
export class Posts {
  @Prop()
  title: string;

  @Prop()
  tag: string;

  @Prop()
  contents: string;

  @Prop({ default: 0 })
  good: number;

  @Prop({ default: 0 })
  views: number;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
