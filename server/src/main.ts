import { fastifyCookie } from '@fastify/cookie';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigSchema } from '@Libs/Config/Config.schema';

import { version } from '../package.json';

import { AppModule } from './App.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn', 'log'] : ['error', 'warn', 'log', 'debug'],
    bufferLogs: true,
  });

  await app.register(fastifyCookie);

  const logger = new Logger('Bootstrap');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Nikko's Codenames")
    .setDescription('Template API')
    .setVersion(version)
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  const { port } = app.get(ConfigSchema);

  await app.listen(port, '0.0.0.0');
  logger.log(`Nikko\'s Codenames ${version} is ready on port ${port}`);
}

void bootstrap();
