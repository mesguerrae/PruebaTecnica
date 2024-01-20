// error.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import {  Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use( req: Request, res: Response, next: NextFunction) {
    //res.errored
    //console.error(`Error: ${res.errored.message}`);
    res.status(501).json({ error: 'Internal Server Error', oth:res.errored });
  }
}
