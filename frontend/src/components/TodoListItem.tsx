import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";
interface todoListItemProps {
  todo: Todo;
}
export default function TodoListItem({ todo }: todoListItemProps) {
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
