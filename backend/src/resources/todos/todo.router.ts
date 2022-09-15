import { NextFunction, Request, Response, Router } from 'express';
import { Todo } from './todo.model';

const todos: Todo[] = [];
const todosRouter = Router();

todosRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Todo: Implement',
  });
});

todosRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const Itodo: Todo = {
    id: Math.random().toString(36).substring(2, 7),
    description: req.body.description,
    isDone: false,
  };
  todos.push(Itodo);
  res.json(Itodo);
});

export { todosRouter };
