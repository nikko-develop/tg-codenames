import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { JWTModule } from '@Infrastructure/JWT/JWT.module';
import { RefreshTokenRepositoryModule } from '@Infrastructure/Repositories/RefreshToken/RefreshToken.repository.module';

import * as cqrs from '@Modules/Auth';
import { TokenToDTOMapper } from '@Modules/Auth/Mappers/Token.toDto.mapper';

const mappers: Provider[] = [TokenToDTOMapper];

const commands: Provider[] = [cqrs.RefreshTokenCommandHandler, cqrs.SignInCommandHandler];

const queries: Provider[] = [];

const controllers = [cqrs.RefreshTokenHttpController, cqrs.SignInHttpController, cqrs.SignOutHttpController];

@Module({
  imports: [ConfigModule, CqrsModule, JWTModule, RefreshTokenRepositoryModule],
  controllers: [...controllers],
  providers: [...mappers, ...commands, ...queries],
  exports: [...mappers],
})
export class AuthModule {}
