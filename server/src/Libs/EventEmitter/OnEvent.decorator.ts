import { extendArrayMetadata } from '@nestjs/common/utils/extend-metadata.util';

export const EVENT_LISTENER_METADATA = 'event-emitter:metadata';

interface OnEventOptions {
  async?: boolean;
  nextTick?: boolean;
  objectify?: boolean;
  promisify?: boolean;
}

type OnEventType = string | symbol;

export interface OnEventMetadata {
  event: string;
  options: OnEventOptions;
}

export const OnEvent = (event: OnEventType, options?: OnEventOptions): MethodDecorator => {
  const decoratorFactory = (target: object, key?: any, descriptor?: any) => {
    extendArrayMetadata(EVENT_LISTENER_METADATA, [{ event, options }], descriptor.value);
    return descriptor;
  };
  decoratorFactory.KEY = EVENT_LISTENER_METADATA;
  return decoratorFactory;
};
