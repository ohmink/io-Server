import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, PostsDocument } from './schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
  ) {}

  async getAll(): Promise<Posts[]> {
    return (await this.postsModel.find().select('-contents').exec()).reverse();
  }

  async getTagList(tag: string): Promise<Posts[]> {
    tag = tag.replace(':', '');
    return await this.postsModel.find({ tag }).select('-contents').exec();
  }

  async getDetail(postsId: string) {
    postsId = postsId.replace(':', '');
    const posts = await this.postsModel.findOne({ _id: postsId }).exec();
    await this.increaseViews(postsId, posts.views + 1);
    posts.views = posts.views + 1;
    return posts;
  }

  async create(createPostsDto: CreatePostsDto): Promise<Posts> {
    const newPost = new this.postsModel(createPostsDto);
    return await newPost.save();
  }

  async delete(postsId: string) {
    return await this.postsModel.deleteOne({ _id: postsId }).exec();
  }

  async update(postsId: string, updateData: UpdatePostsDto) {
    return await this.postsModel
      .updateOne(
        { _id: postsId },
        {
          title: updateData.title,
          tag: updateData.tag,
          contents: updateData.contents,
        },
      )
      .exec();
  }

  async increaseViews(postsId: string, viewCount: number) {
    return await this.postsModel
      .updateOne({ _id: postsId }, { views: viewCount })
      .exec();
  }
}
