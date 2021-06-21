import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL ||
        'mongodb+srv://ohmink:dhals02@cluster0.l8qex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PostsModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
