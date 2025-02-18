import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('*')
  async handleRequest(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('req.url', req.url);
      const { data, headers, cached } = await this.proxyService.forwardRequest(
        req.url,
      );
      console.log('data', data);
      // Set response headers
      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });

      // Set cache status header
      res.setHeader('X-Cache', cached ? 'HIT' : 'MISS');

      return res.json(data);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Failed to process request', message: error.message });
    }
  }
}
