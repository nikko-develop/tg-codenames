import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ulid } from 'ulid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  public use(req: FastifyRequest, res: FastifyReply['raw'], next: () => void) {
    const requestId = req.headers['request-id'] ?? ulid();
    req.id = requestId as string;

    next();
  }
}
