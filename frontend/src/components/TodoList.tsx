import React from "react";
import { Todo } from "../models/todo.model";

import TodoListItem from "./TodoListItem";

export default function TodoList(props: any) {
  return (
    <div>
      <ul className="ul-todos">
        {props.todos.map((todo: Todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
