import "./TodoList.css";
import { Todo } from "../../models/todo.model";
import { TodoListItem } from "../TodoListItem/TodoListItem";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onChangeTodo: (id: string, isDone: boolean) => void;
}

export function TodoList({ todos, onDeleteTodo, onChangeTodo }: TodoListProps) {
  return (
    <div>
      <ul className="ul-todos">
        {todos.map((todo: Todo) => (
          <TodoListItem
            onChangeTodo={onChangeTodo}
            onDeleteTodo={onDeleteTodo}
            key={todo.id}
            todo={{
              description: todo.description,
              id: todo.id,
              isDone: todo.isDone,
            }}
          />
        ))}
      </ul>
    </div>
  );
}
