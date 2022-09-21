import "./App.css";
import { useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const onChange = (name: string, value: string) => {
    setNewTodoDescription(value);
  };

  async function getResponse(url: string, description: string) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description }),
    });
    if (!response.ok) {
      console.log("No response!");
    }
    const data: Todo = await response.json();
    setTodos([...todos, data]);
  }

  const addTask = () => {
    if (newTodoDescription.trim().length === 0) {
      alert("Enter valid description!");
    } else {
      const urlString = "http://localhost:3001/todos";
      getResponse(urlString, newTodoDescription);
    }
    setNewTodoDescription("");
  };

  return (
    <div className="todo-app-wrapper">
      <div className=" card">
        <div className="flex-container">
          <Input
            onChange={onChange}
            value={newTodoDescription}
            placeholder="E.g Learn React"
            type="text"
            name="todo"
          />
          <button className="inline-block add-button button" onClick={addTask}>
            Add
          </button>
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
