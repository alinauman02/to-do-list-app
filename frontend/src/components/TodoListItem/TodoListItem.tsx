import { ChangeEvent } from "react";

import "./TodoListItem.css";
import { Todo } from "../../models/";
import { IconDelete } from "../Icons/IconDelete";

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onChangeTodo: (id: string, check: boolean) => void;
}
export function TodoListItem({
  todo,
  onChangeTodo,
  onDeleteTodo,
}: TodoListItemProps) {
  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeTodo(todo.id, event.target.checked);
  };

  return (
    <li>
      <div className="list-item flex-container">
        <input
          className="check-box"
          type="checkbox"
          onChange={valueChangeHandler}
          checked={todo.isDone}
        />

        <p className="list-item-p">
          {!todo.isDone && todo.description}
          {todo.isDone && <s> {todo.description}</s>}
        </p>

        <button
          className="delete-button button"
          onClick={() => {
            onDeleteTodo(todo.id);
          }}
        >
          <IconDelete />
        </button>
      </div>
    </li>
  );
}
