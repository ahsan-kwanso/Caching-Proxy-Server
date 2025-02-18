import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CacheService } from '../cache/cache.service';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ProxyService {
  private static originUrl: string; // ✅ Make it static

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  setOriginUrl(url: string) {
    ProxyService.originUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    console.log('✅ Set Origin URL:', ProxyService.originUrl);
  }

  async forwardRequest(
    path: string,
  ): Promise<{ data: any; headers: Record<string, string>; cached: boolean }> {
    console.log('🔍 Origin URL in forwardRequest:', ProxyService.originUrl); // Debugging

    if (!ProxyService.originUrl) {
      throw new Error('❌ Origin URL is not set in ProxyService.');
    }

    const fullPath = `${ProxyService.originUrl}${path}`;
    console.log('✅ Full request path:', fullPath);

    // Check cache first
    if (this.cacheService.hasCache(fullPath)) {
      const cachedEntry = this.cacheService.getCacheEntry(fullPath);
      return {
        data: cachedEntry?.data,
        headers: { ...cachedEntry?.headers, 'X-Cache': 'HIT' },
        cached: true,
      };
    }

    // Forward request to origin
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(fullPath),
      );

      // Cache the response
      this.cacheService.setCacheEntry(
        fullPath,
        response.data,
        response.headers as Record<string, string>,
      );

      return {
        data: response.data,
        headers: { ...response.headers, 'X-Cache': 'MISS' } as any,
        cached: false,
      };
    } catch (error) {
      throw new Error(`Failed to fetch from origin: ${error.message}`);
    }
  }
}
