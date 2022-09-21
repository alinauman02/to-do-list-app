import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";

interface TodoListItemProps {
  todo: Todo;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  return (
    <li>
      <div className="list-item flex-container">
        <p className="list-item-p">{todo.description}</p>
        <button className="delete-button button">
          <IconDelete />
        </button>
      </div>
    </li>
  );
}
