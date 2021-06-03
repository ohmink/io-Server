import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('getAll') // get 모든 게시글
  getAll() {
    const answer = this.postsService.getAll();
    if (!answer) throw new NotFoundException('Not founded!');
    return answer;
  }

  @Get('getTagList') // get 태그 게시글
  getTagList(@Query('tag') tag: string) {
    return this.postsService.getTagList(tag);
  }

  @Get('getDetail/:id') // get 게시글 상세
  getDetail(@Param() postsId: number) {
    return this.postsService.getDetail(postsId);
  }

  @Post('create') // 게시글 생성
  create(@Body() postsData: CreatePostsDto) {
    return this.postsService.create(postsData);
  }

  @Delete('delete/:id') // 게시글 삭제
  delete(@Param('id') postsId: string) {
    return this.postsService.delete(postsId);
  }

  @Patch('patch/:id') // 게시글 수정
  update(@Param('id') postsId: string, @Body() updateData: UpdatePostsDto) {
    return this.postsService.update(postsId, updateData);
  }
}
