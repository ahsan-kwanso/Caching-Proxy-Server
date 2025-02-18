import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './cli/cli.service';
import { ProxyService } from './proxy/proxy.service';

async function bootstrap() {
  // Create a minimal app instance to use CliService
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const cliService = appContext.get(CliService);
  const proxyService = appContext.get(ProxyService);

  // Parse CLI arguments
  const { port, origin, clearCache } = cliService.parseArguments(process.argv);
  console.log('origin', origin);
  if (clearCache) {
    console.log('Clearing cache...');
    const cacheService = appContext.get('CacheService'); // Get CacheService
    cacheService.clearCache();
    console.log('Cache cleared.');
    process.exit(0);
  }

  // Set origin URL for the proxy
  proxyService.setOriginUrl(origin);

  // Start the server
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Caching Proxy Server running at http://localhost:${port}`);
}

bootstrap();
