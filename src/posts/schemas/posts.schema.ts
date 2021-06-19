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

  @Prop()
  good: number;

  @Prop()
  views: number;

  @Prop()
  comments: string[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
