/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth') //api/v1/auth
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  async onModuleInit() {
    await this.authClient.connect();
  }

  @Post('register')
  async createUser(@Body() createUserDto: any) {
    const response = this.authClient.send(
      {
        cmd: 'create_user',
      },
      createUserDto,
    );
    return await firstValueFrom(response);
  }

  async login(@Body() loginUserDto: any) {
    const response = this.authClient.send(
      {
        cmd: 'login_user',
      },
      loginUserDto,
    );
    return await firstValueFrom(response);
  }
}
