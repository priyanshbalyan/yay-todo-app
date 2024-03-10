import { useContext } from "react";
import { FilterType, Todo } from "@/interfaces";
import TodoItem from "@/components/TodoItem/TodoItem";
import { TodoContext, TodoState } from "@/providers/TodoProvider";

interface Props {
  filterType: FilterType;
}

function TodoList(props: Props) {
  const { filterType } = props;
  const { todos, isTodosLoading, deleteTodoItem, toggleTodoItem } =
    useContext<TodoState>(TodoContext);

  if (isTodosLoading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  if (todos.length === 0) {
    return <div className="text-slate-400">No todos</div>;
  }

  const filteredTodos = todos.filter((todo) => {
    if (filterType === "all") return true;
    if (filterType === "done") return todo.isDone;
    return !todo.isDone;
  });

  const sortedTodos = filteredTodos.sort((todoA, todoB) => {
    if (todoA.isDone) return 1;
    return todoB.createdAt - todoA.createdAt;
  });

  return (
    <>
      {sortedTodos.map((todo: Todo) => (
        <TodoItem
          key={todo._id}
          onDeleteClick={() => deleteTodoItem(todo._id)}
          onCheckboxClick={() => toggleTodoItem(todo._id)}
          title={todo.text}
          isChecked={todo.isDone}
        />
      ))}
    </>
  );
}

export default TodoList;
