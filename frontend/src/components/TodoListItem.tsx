import { ChangeEvent, useState } from "react";
import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onChangeTodo: (id: string, check: boolean) => void;
}
export default function TodoListItem({
  todo,
  onChangeTodo,
  onDeleteTodo,
}: TodoListItemProps) {
  const [check, setCheck] = useState(todo.isDone);
  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeTodo(todo.id, event.target.checked);
    todo.isDone = event.target.checked;
    setCheck(() => todo.isDone);
  };

  return (
    <li>
      <div className="list-item flex-container">
        <input
          className="check-box"
          type="checkbox"
          onChange={valueChangeHandler}
          checked={check}
        />

        <p className="list-item-p">
          {!check && todo.description}
          {check && <s> {todo.description}</s>}
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
