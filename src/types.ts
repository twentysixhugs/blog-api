import * as express from 'express';

export interface ResponseError {
  status?: number;
  message?: string;
}

export type MiddlewareFn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => void;

export type ExpressUser = {
  id: string;
};
