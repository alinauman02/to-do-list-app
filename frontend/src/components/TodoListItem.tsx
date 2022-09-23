import { Todo } from "../models/todo.model";
import { IconDelete } from "./Icons/IconDelete";

interface TodoListItemProps {
  todo: Todo;
}

const urlString = "http://localhost:3001/todos/";

export default function TodoListItem({ todo }: TodoListItemProps) {
  async function delTodo(url: string, id: string) {
    return fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const deleteTodo = async (id: string) => {
    const response = await delTodo(urlString, id);
    console.log(response.json());
  };

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
