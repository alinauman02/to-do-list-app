import React from "react";

import "./App.css";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";
let todos: Todo[] = [];
todos.push({ description: "Hello world", id: "244", isDone: true });
todos.push({ description: "Hello Pakistan", id: "244", isDone: true });
todos.push({ description: "Hello GB", id: "244", isDone: true });
function App() {
  return (
    <div className="App">
      <div className="card">
      <Input /> <button id="bt">Post</button>
      <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
