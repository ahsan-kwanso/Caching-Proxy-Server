import { Injectable } from "@nestjs/common";

export interface CacheEntry {
  data: any;
  headers: Record<string, string>;
  timestamp: number;
}

@Injectable()
export class CacheStore {
  private store: Map<string, CacheEntry> = new Map();

  set(key: string, value: CacheEntry): void {
    this.store.set(key, value);
  }

  get(key: string): CacheEntry | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }
}
