import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IsPublic } from './is-public.decorator';

interface IUser {
  username: string;
  userId: number;
}

declare module 'express' {
  interface Request {
    user: IUser;
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject(JwtService) jwtService: JwtService;

  @Get('/list')
  getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('/aaa')
  aaa(): string {
    return 'aaa';
  }
  @Get('/bbb')
  bbb(): string {
    return 'bbb';
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    console.log(req.user);
    const token = this.jwtService.sign(
      {
        userId: req.user.userId,
        username: req.user.username,
      },
      {
        expiresIn: '0.5h',
      },
    );
    return {
      token,
    };
  }
}
