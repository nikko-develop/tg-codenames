import { Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { HttpRequest, HttpResponse } from '@Infrastructure/Http/Http.type';

import { routesV1 } from '@Libs/Config/App.routes';

import { SignOutResponseDto } from '@Modules/Auth/DTOs/Response/SignOut.response';

@ApiTags(routesV1.auth.tag)
@Controller(routesV1.version)
export class SignOutHttpController {
  public readonly logger = new Logger(SignOutHttpController.name);

  @Post(routesV1.auth.signout)
  @ApiOkResponse({ description: 'Удалет refreshToken из cookies', type: SignOutResponseDto })
  @ApiBadRequestResponse({ description: 'Неправильный формат запроса' })
  public async execute(@Req() request: HttpRequest, @Res() response: HttpResponse): Promise<SignOutResponseDto> {
    const refreshToken = request.cookies.refreshToken;

    if (refreshToken) {
      response.setCookie('refreshToken', '', { httpOnly: true });
    }

    return response.send({ message: 'ok' });
  }
}
