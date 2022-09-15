import { NextFunction, Request, Response, Router } from "express";

const todosRouter = Router();

todosRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Todo: Implement",
  });
});

export { todosRouter };
