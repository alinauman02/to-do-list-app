import "./App.css";
import { FormEvent, useCallback, useEffect, useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo.model";
import Filters, { Category } from "./components/Filters";

const urlString = "http://localhost:3001/todos/";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<Category>(Category.ALL);

  const changeFilter = (check: Category): void => {
    loadTodos(check);
  };

  const changeTodo = (url: string, id: string, isDone: boolean) => {
    return fetch(url + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone }),
    });
  };

  const onChangeTodo = async (id: string, isDone: boolean) => {
    await changeTodo(urlString, id, isDone);
    if (
      selectedFilter === Category.COMPLETED ||
      selectedFilter === Category.PENDING
    )
      setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== id));
  };

  const fetchTodos = (url: string, signal?: AbortSignal) => {
    return fetch(url, {
      signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const loadTodos = useCallback(
    async (check?: Category, signal?: AbortSignal) => {
      try {
        const response = await fetchTodos(
          "http://localhost:3001/todos/?check=" + check,
          signal
        );
        const tempTodos: Todo[] = await response.json();

        setTodos(tempTodos);
        setLoading(false);
        if (check) setSelectedFilter(check);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    loadTodos(Category.ALL, controller.signal);
    return () => {
      controller.abort();
    };
  }, [loadTodos]);

  const addTodo = (url: string, description: string) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });
  };

  const onAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        if (selectedFilter !== Category.COMPLETED)
          setTodos((currentTodos) => [...currentTodos, newTodo]);
        else changeFilter(Category.ALL);
      } catch (error) {
        console.log(error);
      }
    }
    setNewTodoDescription("");
  };

  const deleteTodo = (url: string, id: string) => {
    return fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
    <TodoList
      todos={todos}
      onDeleteTodo={onDeleteTodo}
      onChangeTodo={onChangeTodo}
    ></TodoList>
  ) : !loading && todos.length === 0 && selectedFilter === Category.ALL ? (
    <h3 className="msg-text">NO TODOS</h3>
  ) : (
    !loading &&
    todos.length === 0 &&
    selectedFilter !== Category.ALL && (
      <h3 className="msg-text">NO {selectedFilter} TODOS</h3>
    )
  );

  return (
    <div className="todo-app-wrapper">
      <div className=" card">
        <div className="flex-container">
          <form className="todo-form" onSubmit={onAddTodo}>
            <Input
              onChange={onChange}
              value={newTodoDescription}
              placeholder="E.g Learn React"
              type="text"
              name="todo"
            />
            <input type="submit" className="add-button button" value="Add" />
          </form>
        </div>
        <br></br>
        <Filters
          categories={[Category.ALL, Category.PENDING, Category.COMPLETED]}
          selectedFilter={selectedFilter}
          changeFilter={changeFilter}
        />
        {content}
      </div>
    </div>
  );
}

export default App;
