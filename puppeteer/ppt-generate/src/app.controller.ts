import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Sse('/getData')
  async getUniversityData() {
    console.log(999);
    return this.appService.getUniversityData();
  }
}
