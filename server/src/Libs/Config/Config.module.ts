import { fileLoader, selectConfig, TypedConfigModule } from 'nest-typed-config';

import { ConfigSchema } from '@Libs/Config/Config.schema';

export const ConfigModule = TypedConfigModule.forRoot({
  schema: ConfigSchema,
  load: fileLoader({
    basename: 'default',
    searchFrom: `${process.cwd()}/config`,
  }),
  isGlobal: true,
});

export const Config = selectConfig(ConfigModule, ConfigSchema);
