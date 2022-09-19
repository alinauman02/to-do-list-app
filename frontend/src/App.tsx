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

  let newtodos: Todo[];

  let value: string = "";
  const onChange = function (e: React.ChangeEvent<any>) {
    newtodos = [
      ...todos,
      { description: e.target.value, id: "24445124", isDone: true },
    ];
  };

  function postTask(): void {
    setTodos(newtodos);
  }

  return (
    <div className="App">
      <div className=" card">
        <div className="flex-container">
          <Input
            onChange={onChange}
            value={value}
            placeholder="ENTER TASK"
            type="text"
            name="todo"
          />
          <button className="inline-block" onClick={postTask}>
            Post
          </button>
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
