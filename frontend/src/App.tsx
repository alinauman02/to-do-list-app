import { FormEvent, useRef, useEffect, useState } from "react";

import "./App.css";
import { Todo } from "./models";
import { deleteTodo, changeTodo, addTodo, fetchTodos } from "./apis/";
import { Filters, Input, TodoList, Filter, Alert } from "./components";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(Filter.ALL);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Todo App";
  }, []);

  useEffect(() => {
    const loadTodos = async (signal: AbortSignal) => {
      try {
        const tempTodos: Todo[] = await fetchTodos(selectedFilter, signal);
        setTodos(tempTodos);
        setLoading(false);
      } catch (error) {
        if (error instanceof DOMException) {
          if (error.name !== "AbortError") console.log(error);
        }
      }
    };
    const controller = new AbortController();
    loadTodos(controller.signal);
    return () => {
      controller.abort();
    };
  }, [selectedFilter]);

  const changeFilter = (filter: Filter): void => {
    setSelectedFilter(filter);
  };

  const onChangeTodo = async (id: string, isDone: boolean) => {
    setError("");
    changeTodo(id, isDone);
    if (
      selectedFilter === Filter.COMPLETED ||
      selectedFilter === Filter.PENDING
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

  const onAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    setError("");
    event.preventDefault();
    const trimmedTodoDescription: string = newTodoDescription.trim();
    if (trimmedTodoDescription.length === 0) {
      setError("error");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      try {
        const response = await addTodo(trimmedTodoDescription);

        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }
        const newTodo: Todo = await response.json();
        if (selectedFilter !== Filter.COMPLETED)
          setTodos((currentTodos) => [...currentTodos, newTodo]);
        else changeFilter(Filter.ALL);
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
    setError("");
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
  ) : (
    <Alert onClick={onFocusInput} type="message">
      <span>
        <b>
          No{" "}
          {selectedFilter === "ALL"
            ? ""
            : selectedFilter === "COMPLETED"
            ? "completed"
            : "pending"}{" "}
          todo added!{" "}
        </b>
        Click here to enter new todo
      </span>
    </Alert>
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
              inputRef={inputRef}
            />
            <input type="submit" className="add-button button" value="Add" />
          </form>
        </div>
        {error !== "" && (
          <Alert type="error">
            <span>
              <b>Invalid Description!</b> Please Enter valid Description
            </span>
          </Alert>
        )}
        <br></br>
        <Filters
          categories={[Filter.ALL, Filter.PENDING, Filter.COMPLETED]}
          selectedFilter={selectedFilter}
          changeFilter={changeFilter}
        />
        {content}
      </div>
    </div>
  );
}

export default App;
