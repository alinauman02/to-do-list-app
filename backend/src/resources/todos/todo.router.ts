import { NextFunction, Request, Response, Router } from 'express';
import { Todo } from './todo.model';

let todos: Todo[] = [];
const todosRouter = Router();

todosRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json(todos);
});

todosRouter.delete('/del', (req: Request, res: Response, next: NextFunction) => {
  if (todos.findIndex(todo => todo.id === req.query.id) !== -1) {
    todos = todos.filter(todo => todo.id !== req.query.id);
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

todosRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const todo: Todo = {
    id: Math.random().toString(36).substring(2, 7),
    description: req.body.description,
    isDone: false,
  };
  todos.push(todo);
  res.json(todo);
});

export { todosRouter };
