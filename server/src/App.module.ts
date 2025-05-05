import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestContextModule } from 'nestjs-request-context';

import { JWTModule } from '@Infrastructure/JWT/JWT.module';
import { MongoExceptionsFilter } from '@Infrastructure/Repositories/MongoDB/MongoExceptions.filter';

import { ContextInterceptor } from '@Libs/Application/ContextInterceptor';
import { MiddlewareModule } from '@Libs/Application/Middleware.module';
import { ConfigModule } from '@Libs/Config/Config.module';
import { ConfigSchema } from '@Libs/Config/Config.schema';
import { AllExceptionsFilter } from '@Libs/Exceptions/AllExceptions.filter';

import { AuthModule } from '@Modules/Auth/Auth.module';
import { UserModule } from '@Modules/User/User.module';

import { HealthcheckController } from './HealthcheckController';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_FILTER,
    useClass: MongoExceptionsFilter,
  },
];

const httpControllers = [HealthcheckController];

@Module({
  imports: [
    ConfigModule,
    MiddlewareModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: (configSchema: ConfigSchema) => ({
        uri: configSchema.mongo.connectionString,
      }),
      inject: [ConfigSchema],
    }),
    RequestContextModule,
    JWTModule,
    AuthModule,
    UserModule,
  ],
  controllers: [...httpControllers],
  providers: [...interceptors],
})
export class AppModule {}
