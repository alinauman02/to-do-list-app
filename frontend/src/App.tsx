import "./App.css";
import { useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [todo, setTodo] = useState({ description: "", id: "", isDone: false });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ description: event.target.value, id: "", isDone: false });
  };
  const addTask = () => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: todo.description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let newtodos: Todo[] = [...todos, data];
        setTodos(newtodos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="App">
      <div className=" card">
        <div className="flex-container">
          <Input
            onChange={onChange}
            value={todo.description}
            placeholder="ENTER TASK"
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
