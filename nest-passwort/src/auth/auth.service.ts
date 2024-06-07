import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  @Inject(UserService) private userService: UserService;
  valiteUser({ username, password }) {
    const user = this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码不正确');
    }
    const { password: _, ...result } = user;
    return result;
  }
}
