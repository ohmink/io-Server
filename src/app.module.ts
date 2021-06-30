import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    }),
    ConfigModule.forRoot(),
    PostsModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
