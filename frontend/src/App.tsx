import "./App.css";
import { useEffect, useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";

const urlString = "http://localhost:3001/todos/";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [loading, setLoading] = useState(true);

  function fetchTodos(url: string, signal: AbortSignal) {
    return fetch(url, {
      signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    const loadTodos = async () => {
      try {
        const response = await fetchTodos(urlString, controller.signal);
        const tempTodos: Todo[] = await response.json();
        setTodos(tempTodos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadTodos();

    return () => {
      controller.abort();
    };
  }, []);

  function addTodo(url: string, description: string) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });
  }

  const onAddTodo = async () => {
    const trimmedTodoDescription: string = newTodoDescription.trim();
    if (trimmedTodoDescription.length === 0) {
      alert("Enter valid description!");
    } else {
      try {
        const response = await addTodo(urlString, trimmedTodoDescription);

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

  function deleteTodo(url: string, id: string) {
    return fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const onDeleteTodo = async (id: string) => {
    const response = await deleteTodo(urlString, id);
    const { status } = await response.json();
    if (status) {
      setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== id));
    }
  };

  const onChange = (name: string, value: string) => {
    setNewTodoDescription(value);
  };

  const content = loading ? (
    <h3 className="msg-text">LOADING...</h3>
  ) : !loading && todos.length !== 0 ? (
    <TodoList todos={todos} deleteTodo={onDeleteTodo}></TodoList>
  ) : (
    !loading &&
    todos.length === 0 && <h3 className="msg-text">NO TASKS ADDED</h3>
  );

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
          <button
            className="inline-block add-button button"
            onClick={onAddTodo}
          >
            Add
          </button>
        </div>
        {content}
      </div>
    </div>
  );
}

export default App;
