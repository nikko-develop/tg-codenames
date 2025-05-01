import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { HttpRequest } from '@Infrastructure/Http/Http.type';

import { RequestContextService } from '@Libs/Application/AppRequestContext';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: HttpRequest = context.switchToHttp().getRequest();
    const requestId = request.raw.id;

    RequestContextService.setRequestId(requestId);

    return next.handle().pipe(
      tap(() => {
        // Если потребуется очистка
      }),
    );
  }
}
