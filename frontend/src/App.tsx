import "./App.css";
import { useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { description: "Hello world", id: "244454", isDone: false },
    { description: "Hello Pakistan", id: "24454", isDone: false },
    { description: "Hello GB", id: "24433", isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState<Todo>({
    description: "Hello world",
    id: "244454",
    isDone: false,
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className="App">
      <div className=" card">
        <div className="flex-container">
          <Input
            onChange={onChange}
            value={newTodo.description}
            placeholder="E.g Learn React"
            type="text"
            name="todo"
          />
          <button className="inline-block add-button button">Add</button>
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
