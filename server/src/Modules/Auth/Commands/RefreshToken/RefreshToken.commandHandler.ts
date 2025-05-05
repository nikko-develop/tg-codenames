import { Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import _ from 'lodash';

import { RefreshTokenRepositoryPort } from '@Entities/RefreshToken/Port/RefreshToken.repository.port';

import { JWT_SERVICE } from '@Infrastructure/JWT/JWT.di.tokens';
import { TokenPayload, Tokens } from '@Infrastructure/JWT/JWT.types';
import { REFRESH_TOKEN_REPOSITORY } from '@Infrastructure/Repositories/RefreshToken/RefreshToken.di.tokens';

import { TokenServicePort } from '@Libs/Ports/TokenService.port';
import { QueryResponse } from '@Libs/types/CQRSResponse.type';

import { RefreshTokenCommand } from '@Modules/Auth/Commands/RefreshToken/RefreshToken.command';
import { FindOneUserByQuery } from '@Modules/User/Queries/FindOneBy/FindOneBy.query';
import { FindOneUserByQueryHandler } from '@Modules/User/Queries/FindOneBy/FindOneBy.queryHandler';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshTokenCommand> {
  private readonly logger = new Logger(RefreshTokenCommandHandler.name);

  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
    @Inject(JWT_SERVICE) private readonly tokenService: TokenServicePort,
    private readonly queryBus: QueryBus,
  ) {}

  public async execute(command: RefreshTokenCommand): Promise<Tokens> {
    try {
      this.tokenService.verifyRefresh(command.refreshToken);
    } catch (err) {
      throw new UnauthorizedException('Не валидный refresh токен');
    }
    const decoded = this.tokenService.decode(command.refreshToken) as TokenPayload;
    if ([decoded.userId].some((el) => _.isNil(el))) {
      throw new UnauthorizedException('Не верные данные в refresh токене');
    }
    const user = await this.queryBus.execute<FindOneUserByQuery, QueryResponse<FindOneUserByQueryHandler>>(
      new FindOneUserByQuery({ id: decoded.userId }),
    );
    const tokens = await this.tokenService.signTokens({
      payload: {
        userId: user.id,
        user: {
          nickname: user.getPropsCopy().nickname,
        },
      },
    });
    const refreshToken = await this.refreshTokenRepository.findByUserIdOrCreate(user.id);
    refreshToken.setHashFromToken(tokens.refreshToken);
    await this.refreshTokenRepository.save(refreshToken);

    return tokens;
  }
}
