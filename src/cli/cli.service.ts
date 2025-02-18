import { Injectable } from '@nestjs/common';
import { Command } from 'commander';

@Injectable()
export class CliService {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  private setupCommands() {
    this.program
      .option('-p, --port <number>', 'Port number', '3000')
      .option('-o, --origin <url>', 'Origin server URL')
      .option('-c, --clear-cache', 'Clear the cache');
  }

  parseArguments(argv: string[]): {
    port: number;
    origin: string;
    clearCache: boolean;
  } {
    this.program.parse(argv);
    const options = this.program.opts();

    if (!options.origin) {
      throw new Error('Origin URL is required');
    }

    return {
      port: parseInt(options.port, 10),
      origin: options.origin,
      clearCache: !!options.clearCache,
    };
  }
}
