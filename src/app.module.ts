import { Module } from '@nestjs/common';
import { CliModule } from './cli/cli.module';
import { ProxyModule } from './proxy/proxy.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [ProxyModule, CacheModule, CliModule],
})
export class AppModule {}
