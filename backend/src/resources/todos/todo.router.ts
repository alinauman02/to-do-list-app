import { Request, Response, Router } from 'express';
import { Todo } from './todo.model';

let todos: Todo[] = [];
const todosRouter = Router();

todosRouter.get('/', (req: Request, res: Response) => {
  res.json(todos);
});

todosRouter.delete('/:id', (req: Request, res: Response) => {
  if (todos.findIndex(todo => todo.id === req.params.id) !== -1) {
    todos = todos.filter(todo => todo.id !== req.params.id);
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

todosRouter.patch('/:id', (req: Request, res: Response) => {
  if (!req.body.isDone) {
    throw new Error('Missing isDone in body');
  } else {
    const index: number = todos.findIndex(todo => todo.id === req.params.id);
    if (index !== -1) {
      todos[index].isDone = req.body.isDone;
      res.json(todos[index]);
    }
  }
});

todosRouter.post('/', (req: Request, res: Response) => {
  if (!req.body.description) {
    throw new Error('Missing Description in body');
  } else {
    const todo: Todo = {
      id: Math.random().toString(36).substring(2, 7),
      description: req.body.description,
      isDone: false,
    };
    todos.push(todo);
    res.json(todo);
  }
});

export { todosRouter };
