import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RequestIdMiddleware } from './RequestId.middleware';
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class MiddlewareModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('/*');
  }
}
