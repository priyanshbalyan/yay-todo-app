export interface Todo {
  _id: string;
  text: string;
  isDone: boolean;
  createdAt: number;
  username: string;
}

const BASE_URL =
  "https://nanameue-front-end-candidate-test.vercel.app/api/priyansh";

const headers = new Headers();
headers.append("Content-Type", "application/json");

async function jsonFetch(
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  body = {},
) {
  const requestOptions = {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(url, requestOptions);
  if (response.ok) return response.json();

  throw new Error("API error occurred");
}

export function fetchTodos(): Promise<Todo[]> {
  return jsonFetch(`${BASE_URL}/todos`);
}

export function createTodo(text: string): Promise<Todo> {
  return jsonFetch(`${BASE_URL}/todos/create`, "POST", { text });
}

export function deleteTodo(id: string): Promise<{ _id: string }> {
  return jsonFetch(`${BASE_URL}/todos/${id}`, "DELETE");
}

export function toggleTodo(id: string): Promise<Todo> {
  return jsonFetch(`${BASE_URL}/todos/${id}/toggle`, "PUT");
}
