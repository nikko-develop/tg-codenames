import { Controller, Get } from '@nestjs/common';

import { version } from '../package.json';

@Controller()
export class HealthcheckController {
  @Get('/')
  public async index(): Promise<string> {
    return Promise.resolve(`Nest template ${version} ready`);
  }

  @Get('/check/ready')
  public async ready(): Promise<string> {
    return Promise.resolve(`Nest template ${version} ready`);
  }

  @Get('/check/live')
  public async live(): Promise<string> {
    return Promise.resolve(`Nest template ${version} live`);
  }

  @Get('/check/startup')
  public async startup(): Promise<string> {
    return Promise.resolve(`Nest template ${version} started`);
  }
}
