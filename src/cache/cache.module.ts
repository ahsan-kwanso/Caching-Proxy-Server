import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheStore } from './cache.store';

@Module({
  providers: [CacheService, CacheStore],
  exports: [CacheService],
})
export class CacheModule {}
