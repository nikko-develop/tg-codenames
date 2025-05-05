import { Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { HttpRequest, HttpResponse } from '@Infrastructure/Http/Http.type';

import { routesV1 } from '@Libs/Config/App.routes';
import { ArgumentNotProvidedException } from '@Libs/Exceptions';
import { CommandResponse } from '@Libs/types/CQRSResponse.type';

import { RefreshTokenCommand } from '@Modules/Auth/Commands/RefreshToken/RefreshToken.command';
import { RefreshTokenCommandHandler } from '@Modules/Auth/Commands/RefreshToken/RefreshToken.commandHandler';
import { TokenToDTOMapper } from '@Modules/Auth/Mappers/Token.toDto.mapper';

@ApiTags(routesV1.auth.tag)
@Controller(routesV1.version)
export class RefreshTokenHttpController {
  private readonly logger = new Logger(RefreshTokenHttpController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly mapper: TokenToDTOMapper,
  ) {}

  @Post(routesV1.auth.refresh)
  @ApiOkResponse({ description: 'Обновляет refresh токен' })
  @ApiBadRequestResponse({ description: 'Неправильный формат запроса' })
  public async execute(@Req() request: HttpRequest, @Res() response: HttpResponse): Promise<void> {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) throw new ArgumentNotProvidedException('В cookies нет refreshToken');
    const tokens = await this.commandBus.execute<RefreshTokenCommand, CommandResponse<RefreshTokenCommandHandler>>(
      new RefreshTokenCommand({
        refreshToken,
      }),
    );

    response.setCookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    await response.send(this.mapper.toLoginDTO(tokens));
  }
}
