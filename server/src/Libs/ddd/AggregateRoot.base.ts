import { RequestContextService } from '@Libs/Application/AppRequestContext';
import { DomainEvent } from '@Libs/ddd/DomainEvent.base';
import { Entity } from '@Libs/ddd/Entity.base';
import { eventEmitter } from '@Libs/EventEmitter/EventEmitter';
import { LoggerPort } from '@Libs/Ports/Logger.port';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  public async emitEvent(domainEvent: DomainEvent) {
    return eventEmitter.emitAsync(domainEvent.eventType, domainEvent);
  }

  public addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(logger: LoggerPort): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `[${RequestContextService.getRequestId()}] "${event.eventType}" event published for aggregate ${
            this.constructor.name
          } : ${this.id}`,
        );
        return eventEmitter.emitAsync(event.eventType, event);
      }),
    );
    this.clearEvents();
  }
}
