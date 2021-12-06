import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('getAll')
  getAll() {
    const answer = this.postsService.getAll();
    if (!answer) throw new NotFoundException('Not founded!');
    return answer;
  }

  @Get('getListByTag/:tag')
  getListByTag(@Param() tag: { tag: string }) {
    const answer = this.postsService.getListByTag(tag.tag);
    if (!answer) throw new NotFoundException('Not founded!');
    return answer;
  }

  @Get('getDetail/:id')
  getDetail(@Param() postsId: { id: string }) {
    return this.postsService.getDetail(postsId.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() postsData: CreatePostsDto) {
    return this.postsService.create(postsData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id') postsId: string) {
    return this.postsService.delete(postsId.substring(1));
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('patch/:id')
  update(@Param('id') postsId: string, @Body() updateData: UpdatePostsDto) {
    return this.postsService.update(postsId.substring(1), updateData);
  }
}
