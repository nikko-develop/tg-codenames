import { Tokens } from '@Infrastructure/JWT/JWT.types';

import { SignInResponseDto } from '@Modules/Auth/DTOs/Response/AuthToken.response';

export class TokenToDTOMapper {
  public toLoginDTO(tokens: Tokens): SignInResponseDto {
    return {
      accessToken: tokens.accessToken,
    };
  }
}
