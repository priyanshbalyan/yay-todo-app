import {
  Todo,
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleTodo,
} from "@/api/api";
import { useToast } from "@/components/ui/use-toast";
import { createContext, useEffect, useState } from "react";

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  createTodoItem: (text: string) => Promise<void>;
  deleteTodoItem: (id: string) => void;
  toggleTodoItem: (id: string) => void;
}

export const TodoContext = createContext<TodoState>({} as TodoState);

interface Props {
  children: React.ReactNode;
}

function TodoProvider(props: Props) {
  const { toast } = useToast();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const createTodoItem = (text: string) => {
    return createTodo(text)
      .then((todo: Todo) => {
        setTodos([...todos, todo]);
        toast({ title: "todo created" });
      })
      .catch(() => {
        toast({ title: "An error occurred while creating todo item" });
      });
  };

  const deleteTodoItem = (id: string) => {
    deleteTodo(id)
      .then((item) => {
        toast({ title: "Todo deleted" });
        setTodos(todos.filter((todo) => todo._id !== item._id));
      })
      .catch(() => {
        toast({ title: "An error occurred while deleting todo item" });
      });
  };

  const toggleTodoItem = (id: string) => {
    toggleTodo(id)
      .then((item) => {
        setTodos(
          todos.map((todo) => {
            if (todo._id === item._id) return { ...todo, isDone: item.isDone };
            return todo;
          }),
        );
      })
      .catch(() => {
        toast({ title: "An error occurred while toggling todo item state" });
      });
  };

  useEffect(() => {
    fetchTodos()
      .then((todos) => {
        setTodos(todos);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast({ title: "An error occurred while fetching todo items" });
      });
  }, []);

  const providerValues = {
    todos,
    isLoading,
    createTodoItem,
    deleteTodoItem,
    toggleTodoItem,
  };

  return (
    <TodoContext.Provider value={providerValues}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
