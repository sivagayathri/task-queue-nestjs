import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return '🚀 Task Queue API is Live!';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  healthCheck() {
    return 'OK';
  }
}
