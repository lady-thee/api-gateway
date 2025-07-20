/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, LoginUserDto } from '@lady-thee/common-contracts';

@Controller('auth') //api/v1/auth
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  async onModuleInit() {
    await this.authClient.connect();
  }

  @ApiOperation({
    description: 'Register user',
  })
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const response = this.authClient.send(
      {
        cmd: 'create_user',
      },
      createUserDto,
    );
    return await firstValueFrom(response);
  }

  @ApiOperation({
    description: 'Log in user',
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const response = this.authClient.send(
      {
        cmd: 'login_user',
      },
      loginUserDto,
    );
    return await firstValueFrom(response);
  }
}
