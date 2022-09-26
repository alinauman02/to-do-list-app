import { ChangeEvent, useState } from "react";
import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";

interface TodoListItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string, check: boolean) => void;
}
export default function TodoListItem({
  todo,
  deleteTodo,
  checkTodo,
}: TodoListItemProps) {
  const [check, setCheck] = useState(!todo.isDone);
  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    checkTodo(todo.id, event.target.checked);
    setCheck(!check);
  };

  return (
    <li>
      <div className="list-item flex-container">
        <input
          className="check-box"
          type="checkbox"
          onChange={valueChangeHandler}
          checked={!check}
        />

        <p className="list-item-p">
          {check && todo.description}
          {!check && <s> {todo.description}</s>}
        </p>

        <button
          className="delete-button button"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          <IconDelete />
        </button>
      </div>
    </li>
  );
}
