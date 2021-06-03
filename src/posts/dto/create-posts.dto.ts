import { IsString } from 'class-validator';

export class CreatePostsDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly tag: string;
  @IsString()
  readonly contents: string;
}
