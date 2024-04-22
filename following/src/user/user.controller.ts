import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/init')
  findAll() {
    return this.userService.initData();
  }
  // 获取关注关系
  @Get('/follow-relationship')
  async followRelationShip(@Query('id') id: string) {
    if (!id) {
      throw new BadRequestException('userId 不能为空');
    }
    console.log(id);
    return this.userService.getFollowRelationship(+id);
  }
  // 关注
  @Get('follow')
  async follow(@Query('id1') userId1: string, @Query('id2') userId2: string) {
    await this.userService.follow(+userId1, +userId2);
    return 'done';
  }
}
