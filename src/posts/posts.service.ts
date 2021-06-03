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
    return await this.postsModel.find().exec();
  }

  async getTagList(tag: string): Promise<Posts[]> {
    return await this.postsModel.find({ tag }, 'title tag').exec();
  }

  async getDetail(postsId: number) {
    return await this.postsModel.findOne({ _id: postsId }).exec();
  }

  async create(createPostsDto: CreatePostsDto): Promise<Posts> {
    const createdCat = new this.postsModel(createPostsDto);
    return await createdCat.save();
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
}
