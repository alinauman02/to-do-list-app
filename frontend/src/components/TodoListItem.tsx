import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";

interface TodoListItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
}
export default function TodoListItem({ todo, deleteTodo }: TodoListItemProps) {
  return (
    <li>
      <div className="list-item flex-container">
        <p className="list-item-p">{todo.description}</p>
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
