import "./App.css";
import { useEffect, useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

const urlString = "http://localhost:3001/todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");

  async function fetchTodos(url: string) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const loadTodos = async () => {
    const response = await fetchTodos(urlString);
    const tempTodos: Todo[] = await response.json();
    setTodos(() => [...tempTodos]);
  };

  useEffect(() => {
    loadTodos();
  }, [todos]);

  const onChange = (name: string, value: string) => {
    setNewTodoDescription(value);
  };

  async function createTodo(url: string, description: string) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });
  }

  const addTask = async () => {
    const trimmedTodoDescription: string = newTodoDescription.trim();
    if (trimmedTodoDescription.length === 0) {
      alert("Enter valid description!");
    } else {
      try {
        const urlString = "http://localhost:3001/todos";
        const response = await createTodo(urlString, trimmedTodoDescription);

        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }
        const newTodo: Todo = await response.json();

        setTodos((currentTodos) => [...currentTodos, newTodo]);
      } catch (error) {
        console.log(error);
      }
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
