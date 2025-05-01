import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { EventEmitterRegisterListenersService } from '@Libs/EventEmitter/EventEmmiter.registerListeners.service';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [EventEmitterRegisterListenersService],
  exports: [],
})
export class EventEmitterModule {}
