import express from 'express';
import cors from 'cors';

import { errorHandler, logger } from './middleware';
import { todosRouter } from './resources/todos';

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/todos', todosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
