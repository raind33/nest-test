import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string) {
    const users = [
      {
        userId: 1,
        username: 'rain',
        password: '123456',
      },
      {
        userId: 2,
        username: 'rain2',
        password: '123456',
      },
    ];
    return users.find((item) => item.username === username);
  }
}
