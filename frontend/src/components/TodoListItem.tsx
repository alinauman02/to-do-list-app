import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";
export default function TodoListItem(props: Todo) {
  return (
    <li>
      <div className="list-item flex-container">
        <p className="list-item-p">{props.description}</p>
        <button className="delete-button button">
          <IconDelete />
        </button>
      </div>
    </li>
  );
}
