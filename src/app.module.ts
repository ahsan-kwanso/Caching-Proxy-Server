import { Module } from '@nestjs/common';
import { CliModule } from './cli/cli.module';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './proxy/proxy.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProxyModule,
    CacheModule,
    CliModule,
  ],
})
export class AppModule {}
