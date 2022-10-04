export const urlString = "http://localhost:3001/todos/";

export const deleteTodo = (url: string, id: string) => {
  return fetch(url + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const changeTodo = (url: string, id: string, isDone: boolean) => {
  return fetch(url + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone }),
  });
};

export const addTodo = (url: string, description: string) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
};

export const fetchTodos = (url: string, signal?: AbortSignal) => {
  return fetch(url, {
    signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
