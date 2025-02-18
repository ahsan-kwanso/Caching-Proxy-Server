import { Injectable } from "@nestjs/common";
import { CacheStore, CacheEntry } from "./cache.store";

@Injectable()
export class CacheService {
  constructor(private cacheStore: CacheStore) {}

  setCacheEntry(url: string, data: any, headers: Record<string, string>): void {
    const entry: CacheEntry = {
      data,
      headers,
      timestamp: Date.now(),
    };
    this.cacheStore.set(url, entry);
  }

  getCacheEntry(url: string): CacheEntry | undefined {
    return this.cacheStore.get(url);
  }

  hasCache(url: string): boolean {
    return this.cacheStore.has(url);
  }

  clearCache(): void {
    this.cacheStore.clear();
  }
}
