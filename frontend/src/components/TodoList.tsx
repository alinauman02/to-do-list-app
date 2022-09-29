import React from "react";

import { Todo } from "../models/todo.model";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
}

export default function TodoList({ todos, deleteTodo }: TodoListProps) {
  return (
    <div>
      <ul className="ul-todos">
        {todos.map((todo: Todo) => (
          <TodoListItem
            deleteTodo={deleteTodo}
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
