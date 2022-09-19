import "./App.css";
import { useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { description: "Hello world", id: "244454", isDone: true },
    { description: "Hello Pakistan", id: "24454", isDone: true },
    { description: "Hello GB", id: "24433", isDone: true },
  ]);

  return (
    <div className="App">
      <div className=" card">
        <div className="flex-container">
          <Input /> <button className="inline-block">Post</button>
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
