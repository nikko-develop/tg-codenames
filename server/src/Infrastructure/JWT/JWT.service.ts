import { Injectable } from '@nestjs/common';
import { createDecoder, SignerSync, VerifierSync } from 'fast-jwt';

import { JwtSignTokensDto } from '@Infrastructure/JWT/DTOs/JWT.signTokens.dto';
import { Tokens } from '@Infrastructure/JWT/JWT.types';

import { TokenServicePort } from '@Libs/Ports/TokenService.port';

@Injectable()
export class JWTService implements TokenServicePort {
  public verifyAccess: typeof VerifierSync;
  public verifyRefresh: typeof VerifierSync;
  public decode: ReturnType<typeof createDecoder>;

  private signRefresh: typeof SignerSync;
  private signAccess: typeof SignerSync;

  constructor() {
    this.decode = createDecoder();
  }

  public signTokens({ payload }: JwtSignTokensDto): Tokens {
    const accessToken = this.signAccess(payload);
    const refreshToken = this.signRefresh(payload);
    return { accessToken, refreshToken };
  }
}
