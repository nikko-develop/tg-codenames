import { Body, Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { HttpRequest, HttpResponse } from '@Infrastructure/Http/Http.type';

import { routesV1 } from '@Libs/Config/App.routes';
import { ArgumentNotProvidedException } from '@Libs/Exceptions';
import { CommandResponse } from '@Libs/types/CQRSResponse.type';

import { RefreshTokenCommand } from '@Modules/Auth/Commands/RefreshToken/RefreshToken.command';
import { RefreshTokenCommandHandler } from '@Modules/Auth/Commands/RefreshToken/RefreshToken.commandHandler';
import { SignInCommand } from '@Modules/Auth/Commands/SignIn/SignIn.command';
import { SignInCommandHandler } from '@Modules/Auth/Commands/SignIn/SignIn.commandHandler';
import { SignInRequestDto } from '@Modules/Auth/DTOs/Request/SignIn.request';
import { TokenToDTOMapper } from '@Modules/Auth/Mappers/Token.toDto.mapper';

@ApiTags(routesV1.auth.tag)
@Controller(routesV1.version)
export class SignInHttpController {
  private readonly logger = new Logger(SignInHttpController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly mapper: TokenToDTOMapper,
  ) {}

  @Post(routesV1.auth.signin)
  @ApiOkResponse({ description: 'Авторизует пользователя' })
  @ApiBadRequestResponse({ description: 'Неправильный формат запроса' })
  public async execute(@Body() dto: SignInRequestDto, @Res() response: HttpResponse): Promise<void> {
    const tokens = await this.commandBus.execute<SignInCommand, CommandResponse<SignInCommandHandler>>(
      new SignInCommand({ ...dto }),
    );

    response.setCookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    await response.send(this.mapper.toLoginDTO(tokens));
  }
}
