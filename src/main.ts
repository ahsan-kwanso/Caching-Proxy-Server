import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './cli/cli.service';
import { ProxyService } from './proxy/proxy.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Only create CLI service context for non-dev environments
  if (process.env.NODE_ENV !== 'development') {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const cliService = appContext.get(CliService);
    const proxyService = appContext.get(ProxyService);

    // Parse CLI arguments
    const { port, origin, clearCache } = cliService.parseArguments(
      process.argv,
    );
    console.log('origin', origin);

    if (clearCache) {
      console.log('Clearing cache...');
      const cacheService = appContext.get('CacheService');
      cacheService.clearCache();
      console.log('Cache cleared.');
      process.exit(0); // Stop execution if cache cleared
    }

    // Set origin URL for the proxy
    proxyService.setOriginUrl(origin);

    // Start the server with parsed port
    await app.listen(port);
    console.log(`Caching Proxy Server running at http://localhost:${port}`);
  } else {
    // For development, start the app without CLI logic
    await app.listen(3000); // or another port if specified in your dev setup
    console.log('App running in development mode at http://localhost:3000');
  }
}

bootstrap();
