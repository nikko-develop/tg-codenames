import { Global, Module, Provider } from '@nestjs/common';

import { JWT_SERVICE } from '@Infrastructure/JWT/JWT.di.tokens';
import { JWTService } from '@Infrastructure/JWT/JWT.service';

const JwtService: Provider = {
  provide: JWT_SERVICE,
  useClass: JWTService,
};

@Global()
@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class JWTModule {}
