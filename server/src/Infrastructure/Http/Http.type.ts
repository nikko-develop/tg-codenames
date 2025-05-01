import { FastifyReply, FastifyRequest } from 'fastify';

export type HttpFrameworkRequest = FastifyRequest;
export type HttpFrameworkResponse = FastifyReply;

export type HttpRequest<T = unknown> = HttpFrameworkRequest & {
  body: T;
  raw: FastifyRequest['raw'] & {
    id: string;
  };
};
export type HttpResponse = HttpFrameworkResponse;
