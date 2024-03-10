import { createTodo, deleteTodo, fetchTodos, toggleTodo } from "@/api/api";
import { useToast } from "@/components/ui/use-toast";
import { Todo } from "@/interfaces";
import { createContext, useEffect, useState } from "react";

export interface TodoState {
  todos: Todo[];
  isTodosLoading: boolean;
  createTodoItem: (text: string) => Promise<void>;
  deleteTodoItem: (id: string) => Promise<void>;
  toggleTodoItem: (id: string) => Promise<void>;
  allowPointerEvents: boolean;
}

export const TodoContext = createContext<TodoState>({} as TodoState);

interface Props {
  children: React.ReactNode;
}

function TodoProvider(props: Props) {
  const { toast } = useToast();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [allowPointerEvents, setAllowPointerEvents] = useState(true);

  const createTodoItem = (text: string) => {
    setAllowPointerEvents(false);
    return createTodo(text)
      .then((todo: Todo) => {
        setTodos([...todos, todo]);
        toast({ title: "To-do created" });
      })
      .catch(() => {
        toast({ title: "An error occurred while creating todo item" });
      })
      .finally(() => {
        setAllowPointerEvents(true);
      });
  };

  const deleteTodoItem = (id: string) => {
    setAllowPointerEvents(false);
    return deleteTodo(id)
      .then((item) => {
        toast({ title: "To-do deleted" });
        setTodos(todos.filter((todo) => todo._id !== item._id));
      })
      .catch(() => {
        toast({ title: "An error occurred while deleting todo item" });
      })
      .finally(() => {
        setAllowPointerEvents(true);
      });
  };

  const toggleTodoItem = (id: string) => {
    setAllowPointerEvents(false);
    return toggleTodo(id)
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
      })
      .finally(() => {
        setAllowPointerEvents(true);
      });
  };

  useEffect(() => {
    setAllowPointerEvents(false);
    fetchTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch(() => {
        toast({ title: "An error occurred while fetching todo items" });
      })
      .finally(() => {
        setIsTodosLoading(false);
        setAllowPointerEvents(true);
      });
  }, [toast]);

  const providerValues = {
    todos,
    isTodosLoading,
    createTodoItem,
    deleteTodoItem,
    toggleTodoItem,
    allowPointerEvents,
  };

  return (
    <TodoContext.Provider value={providerValues}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
