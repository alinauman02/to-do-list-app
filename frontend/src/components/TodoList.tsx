import React from "react";
import { Todo } from "../models/todo.model";

import TodoListItem from "./TodoListItem";

export default function TodoList(props: any) {
  return (
    <div>
      <ul>
        {props.todos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoListItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
