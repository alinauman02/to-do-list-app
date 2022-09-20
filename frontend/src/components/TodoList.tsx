import React from "react";
import { Todo } from "../models/todo.model";

import TodoListItem from "./TodoListItem";
interface todoListProps {
  todos: Todo[];
}
export default function TodoList({ todos }: todoListProps) {
  return (
    <div>
      <ul className="ul-todos">
        {todos.map((todo: Todo) => (
          <TodoListItem
            key={todo.id}
            todo={{
              description: todo.description,
              id: todo.id,
              isDone: todo.isDone,
            }}
          />
        ))}
      </ul>
    </div>
  );
}
