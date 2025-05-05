import { VerifierSync } from 'fast-jwt';

import { JwtSignTokensDto } from '@Infrastructure/JWT/DTOs/JWT.signTokens.dto';
import { TokenPayload, Tokens } from '@Infrastructure/JWT/JWT.types';

export interface TokenServicePort {
  verifyRefresh(token: Buffer | string): ReturnType<typeof VerifierSync>;
  verifyAccess(token: Buffer | string): ReturnType<typeof VerifierSync>;
  decode(token: Buffer | string): TokenPayload;
  signTokens({ payload }: JwtSignTokensDto): Tokens;
}
