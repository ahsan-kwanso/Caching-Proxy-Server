# Caching Proxy Server Design Document

## Overview
A basic caching proxy server that forwards requests to an origin server and caches responses. The server will be built using NestJS framework and will implement a simple in-memory caching mechanism.

## Core Features
1. Start proxy server with configurable port and origin URL
2. Forward requests to origin server
3. Cache responses in memory
4. Add cache status headers (HIT/MISS)
5. Clear cache on demand

## Architecture

### 1. Command Line Interface
- Use `commander` package to handle CLI arguments
- Required arguments:
  - `--port`: Port number for proxy server
  - `--origin`: Origin server URL
- Optional arguments:
  - `--clear-cache`: Clear the cache

### 2. Core Components

#### 2.1 CLI Module
- Handles command line arguments parsing
- Validates input parameters
- Initializes the proxy server

#### 2.2 Proxy Module
- Main module handling request forwarding
- Components:
  - ProxyController: Handles incoming requests
  - ProxyService: Contains core proxy logic
  - RequestForwarder: Forwards requests to origin
  - ResponseTransformer: Adds cache headers

#### 2.3 Cache Module
- Manages in-memory cache
- Components:
  - CacheService: Handles cache operations
  - CacheStore: In-memory storage implementation
  - CacheKey: URL-based cache key generation

### 3. Data Flow
1. Request received by ProxyController
2. Check cache for existing response
3. If cached:
   - Return cached response with X-Cache: HIT
4. If not cached:
   - Forward request to origin
   - Cache response
   - Return response with X-Cache: MISS

### 4. Caching Strategy
- Simple in-memory Map/Object store
- Cache key: Full request URL
- Cached data structure:
  ```typescript
  interface CacheEntry {
    data: any;
    headers: Record<string, string>;
    timestamp: number;
  }
  ```

### 5. Error Handling
- Origin server errors
- Invalid CLI arguments
- Cache operations errors

## Implementation Phases

### Phase 1: Basic Setup
1. Initialize NestJS project
2. Set up CLI argument handling
3. Create basic module structure

### Phase 2: Core Functionality
1. Implement request forwarding
2. Add basic caching mechanism
3. Implement cache headers

### Phase 3: Cache Management
1. Add cache clearing functionality
2. Implement cache key generation
3. Add basic error handling

### Phase 4: Testing & Refinement
1. Add unit tests
2. Add integration tests
3. Documentation
4. Performance optimization

## Future Enhancements
1. TTL-based cache expiration
2. Cache size limits
3. Different caching strategies
4. Redis/external cache support
5. Cache compression
6. Request method-based caching rules
7. Cache invalidation patterns

## Technical Stack
- NestJS framework
- Node.js HTTP/HTTPS modules
- Commander.js for CLI
- Jest for testing
- Axios for HTTP requests

## Initial File Structure
```
src/
├── cli/
│   ├── cli.module.ts
│   └── cli.service.ts
├── proxy/
│   ├── proxy.module.ts
│   ├── proxy.controller.ts
│   └── proxy.service.ts
├── cache/
│   ├── cache.module.ts
│   ├── cache.service.ts
│   └── cache.store.ts
└── main.ts
```
