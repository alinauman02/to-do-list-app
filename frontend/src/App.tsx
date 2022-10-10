import { FormEvent, useCallback, useRef, useEffect, useState } from "react";

import "./App.css";
import { Todo } from "./models";
import { deleteTodo, changeTodo, addTodo, fetchTodos } from "./apis/";
import { Filters, Input, TodoList, Category, Alert } from "./components";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<Category>(Category.ALL);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);

  document.title = "Todo App";

  const changeFilter = (check: Category): void => {
    loadTodos(check);
  };

  const onChangeTodo = async (id: string, isDone: boolean) => {
    setError(false);
    changeTodo(id, isDone);
    if (
      selectedFilter === Category.COMPLETED ||
      selectedFilter === Category.PENDING
    )
      setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== id));
    else {
      setTodos((currentTodos) => {
        return currentTodos.map((t) => {
          if (t.id === id) {
            return { ...t, isDone };
          }

          return t;
        });
      });
    }
  };

  const loadTodos = useCallback(
    async (check?: Category, signal?: AbortSignal) => {
      try {
        const tempTodos: Todo[] = await fetchTodos(check, signal);
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

  const onAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    setError(false);
    event.preventDefault();
    const trimmedTodoDescription: string = newTodoDescription.trim();
    if (trimmedTodoDescription.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      try {
        const response = await addTodo(trimmedTodoDescription);

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

  const onDeleteTodo = async (id: string) => {
    const status = await deleteTodo(id);
    if (status) {
      setTodos((currentTodo) => currentTodo.filter((todo) => todo.id !== id));
    }
  };

  const onFocusInput = () => {
    inputRef.current?.focus();
  };

  const onChange = (name: string, value: string) => {
    setError(false);
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
    <button onClick={onFocusInput} className="msg-box">
      <p className="msg-text">
        <b> No todos added yet!</b> Click here to add a new todo
      </p>
    </button>
  ) : (
    !loading &&
    todos.length === 0 &&
    selectedFilter !== Category.ALL && (
      <Alert onClick={onFocusInput} type="message">
        <span>
          <b>
            No {selectedFilter === "PENDING" ? "Pending" : "Completed"} Todo
            added!
          </b>
          click here to enter new todo
        </span>
      </Alert>
    )
  );

  useEffect(() => {
    const controller = new AbortController();
    loadTodos(Category.ALL, controller.signal);
    return () => {
      controller.abort();
    };
  }, [loadTodos]);
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
              inputRef={inputRef}
            />
            <input type="submit" className="add-button button" value="Add" />
          </form>
        </div>
        {error && (
          <Alert type="error">
            <span>
              <b>Invalid Description!</b> Please Enter valid Description
            </span>
          </Alert>
        )}
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
