import "./App.css";
import { useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  //const [todo, setTodo] = useState({ description: "", id: "", isDone: false });
  const [newTodoDescription, setNewTodoDescription] = useState("");

    const onChange = (name: string, value: string) => {
    setNewTodoDescription(value);
  };

  const addTask = () => {
    
    if (newTodoDescription.trim().length === 0) {
      alert("Enter valid description!");
    } else {
      fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: newTodoDescription }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          const newtodos: Todo[] = [...todos, data];
          setTodos(newtodos);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
