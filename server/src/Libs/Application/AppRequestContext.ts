import { RequestContext } from 'nestjs-request-context';

import { HttpRequest, HttpResponse } from '@Infrastructure/Http/Http.type';

export type AppRequestContext = RequestContext<HttpRequest, HttpResponse>;

export class RequestContextService {
  public static getContext(): AppRequestContext | undefined {
    return RequestContext.currentContext as AppRequestContext | undefined;
  }

  public static setRequestId(id: string): void {
    const ctx = this.getContext();
    if (!ctx) return;
    ctx.req.id = id;
  }

  public static getRequestId(): string | undefined {
    return this.getContext()?.req.id;
  }
}
