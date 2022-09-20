import React from "react";
import { Todo } from "../models/todo.model";

import TodoListItem from "./TodoListItem";
interface todoList {
  todos: Todo[];
}
export default function TodoList(props: todoList) {
  return (
    <div>
      <ul className="ul-todos">
        {props.todos.map((todo: Todo) => (
          <TodoListItem
            key={todo.id}
            description={todo.description}
            id={todo.id}
            isDone={todo.isDone}
          />
        ))}
      </ul>
    </div>
  );
}
