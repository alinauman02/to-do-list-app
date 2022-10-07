const urlString = "http://localhost:3001/todos/";

export const deleteTodo = async (id: string) => {
  const response = await fetch(urlString + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const changeTodo = (id: string, isDone: boolean) => {
  fetch(urlString + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone }),
  });
};

export const addTodo = (description: string) => {
  return fetch(urlString, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
};

export const fetchTodos = async (check?: string, signal?: AbortSignal) => {
  const newUrlString = urlString + "/?check=" + check;

  const response = await fetch(newUrlString, {
    signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
