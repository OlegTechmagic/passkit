import '@config';

import { MemberController } from '@controllers';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDoc from './swagger';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use(new MemberController().route);

app.use('/api/v1', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/', (req: Request, res: Response) => {
  res.json('Pong');
});

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  console.log(err);
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export { app };
