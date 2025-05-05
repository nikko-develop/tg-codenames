import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserRepositoryModule } from '@Infrastructure/Repositories/User/User.repository.module';

import * as cqrs from '@Modules/User';
import { UserToDTOMapper } from '@Modules/User/Mappers/User.toDto.mapper';

const mappers: Provider[] = [UserToDTOMapper];

const commands: Provider[] = [];

const queries: Provider[] = [cqrs.FindManyUsersByQueryHandler, cqrs.FindOneUserByQueryHandler];

const controllers = [cqrs.FindManyUsersByHttpController, cqrs.FindOneUserByHttpController];

@Module({
  imports: [CqrsModule, UserRepositoryModule],
  controllers: [...controllers],
  providers: [...mappers, ...commands, ...queries],
  exports: [...mappers],
})
export class UserModule {}
