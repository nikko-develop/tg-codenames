import { Injectable, Logger } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { eventEmitter } from './EventEmitter';
import { EVENT_LISTENER_METADATA, OnEventMetadata } from './OnEvent.decorator';

@Injectable()
export class EventEmitterRegisterListenersService {
  private logger = new Logger(EventEmitterRegisterListenersService.name);

  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  public onModuleInit() {
    this.registerListeners();
  }

  private getListenersDescriptors() {
    const providers: InstanceWrapper[] = this.discoveryService.getProviders();

    const listeners = providers
      .map(({ instance }) => {
        if (!instance) return;
        const prototype = Object.getPrototypeOf(instance) || {};
        const methodNames = this.metadataScanner.getAllMethodNames(prototype);

        for (const method of methodNames) {
          const metadata = Reflect.getMetadata(EVENT_LISTENER_METADATA, instance[method]);
          if (metadata) return { listener: instance[method], instance };
        }
      })
      .filter((v) => v);

    return listeners;
  }

  private registerListeners() {
    const descriptors = this.getListenersDescriptors();

    for (const descriptor of descriptors) {
      const { listener, instance } = descriptor!;

      const [metadata]: OnEventMetadata[] = Reflect.getMetadata(EVENT_LISTENER_METADATA, listener);
      eventEmitter.on(metadata.event, listener.bind(instance), metadata.options);
    }
  }
}
