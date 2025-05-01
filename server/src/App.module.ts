import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestContextModule } from 'nestjs-request-context';

import { MongoExceptionsFilter } from '@Infrastructure/Repositories/MongoDB/MongoExceptions.filter';

import { ContextInterceptor } from '@Libs/Application/ContextInterceptor';
import { MiddlewareModule } from '@Libs/Application/Middleware.module';
import { ConfigModule } from '@Libs/Config/Config.module';
import { ConfigSchema } from '@Libs/Config/Config.schema';
import { EventEmitterModule } from '@Libs/EventEmitter/EventEmitter.module';
import { AllExceptionsFilter } from '@Libs/Exceptions/AllExceptions.filter';

import { HealthcheckController } from './HealthcheckController';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

const httpControllers = [HealthcheckController];

@Module({
  imports: [
    ConfigModule,
    MiddlewareModule,
    EventEmitterModule,
    MongooseModule.forRootAsync({
      useFactory: (configSchema: ConfigSchema) => ({
        uri: configSchema.mongo.connectionString,
      }),
      inject: [ConfigSchema],
    }),
    RequestContextModule,
  ],
  controllers: [...httpControllers],
  providers: [
    ...interceptors,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongoExceptionsFilter,
    },
  ],
})
export class AppModule {}
