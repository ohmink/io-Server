import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('signUp')
  async signUp(@Request() req) {
    const password = await this.authService.getHash(req.body.password);

    return this.userService.signUp({
      username: req.body.username,
      password: password,
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
