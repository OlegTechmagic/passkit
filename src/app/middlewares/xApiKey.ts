import { config } from '@config';
import { NextFunction, Request, Response } from 'express';

export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'API key is missing' });
  }

  if (apiKey !== config.X_API_KEY) {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  return next();
};
