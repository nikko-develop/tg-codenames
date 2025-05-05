import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { RefreshTokenRepositoryPort } from '@Entities/RefreshToken/Port/RefreshToken.repository.port';

import { JWT_SERVICE } from '@Infrastructure/JWT/JWT.di.tokens';
import { Tokens } from '@Infrastructure/JWT/JWT.types';
import { REFRESH_TOKEN_REPOSITORY } from '@Infrastructure/Repositories/RefreshToken/RefreshToken.di.tokens';

import { TokenServicePort } from '@Libs/Ports/TokenService.port';
import { QueryResponse } from '@Libs/types/CQRSResponse.type';

import { SignInCommand } from '@Modules/Auth/Commands/SignIn/SignIn.command';
import { FindOneUserByQuery } from '@Modules/User/Queries/FindOneBy/FindOneBy.query';
import { FindOneUserByQueryHandler } from '@Modules/User/Queries/FindOneBy/FindOneBy.queryHandler';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  private readonly logger = new Logger(SignInCommandHandler.name);

  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
    @Inject(JWT_SERVICE) private readonly tokenService: TokenServicePort,
    private readonly queryBus: QueryBus,
  ) {}

  public async execute(command: SignInCommand): Promise<Tokens> {
    if (!command.password) {
      const tempTokens = await this.tokenService.signTokens({
        payload: {
          userId: 'TEMP',
          user: {
            nickname: command.nickname,
          },
        },
      });

      return tempTokens;
    }

    const user = await this.queryBus.execute<FindOneUserByQuery, QueryResponse<FindOneUserByQueryHandler>>(
      new FindOneUserByQuery({
        nickname: command.nickname,
      }),
    );

    const tokens = this.tokenService.signTokens({
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
