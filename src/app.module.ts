import { Module } from '@nestjs/common';
// import { CatsModule } from './cats/cats.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:dhals02@localhost:27017/'),
    PostsModule,
  ],
})
export class AppModule {}
