import "./TodoList.css";
import { Todo } from "../../models/";
import { TodoListItem } from "../";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onChangeTodo: (id: string, isDone: boolean) => void;
}

export function TodoList({ todos, onDeleteTodo, onChangeTodo }: TodoListProps) {
  return (
    <div>
      <ul className="ul-todos">
        {todos.map((todo) => (
          <TodoListItem
            onChangeTodo={onChangeTodo}
            onDeleteTodo={onDeleteTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
}
