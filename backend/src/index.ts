import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.info(`${req.method} ${req.url}`);
  next();
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({
    error: error.message,
  });
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
