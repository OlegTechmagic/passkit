import '@config';

import { PassController } from '@controllers';
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use(new PassController().route);

app.use('/api/v1', apiRouter);

app.get('/', (req: Request, res: Response) => {
  res.json('Pong');
});

app.use(function clientErrorHandler(error: any, req: Request, res: Response, _: unknown) {
  console.error(error);
  return res
    .status(error.statusCode ?? error.status ?? 500)
    .json({ message: error.message, error });
});

export { app };
