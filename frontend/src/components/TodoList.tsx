import React from "react";
import { Todo } from "../models/todo.model";

import TodoListItem from "./TodoListItem";

export default function TodoList(props: any) {
  console.log(props.todos);
  return (
    <div>
      <table>
        {props.todos.map((todo: Todo) => (
          <tr>
            <TodoListItem todo={todo} />
          </tr>
        ))}
      </table>
    </div>
  );
}
