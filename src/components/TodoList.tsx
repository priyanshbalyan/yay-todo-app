import { useContext } from "react";
import { Todo } from "@/api/api";
import TodoItem from "@/components/TodoItem";
import { TodoContext, TodoState } from "@/providers/TodoProvider";

function TodoList() {
  const { isLoading, todos, deleteTodoItem, toggleTodoItem } =
    useContext<TodoState>(TodoContext);

  if (isLoading) {
    return <div className="text-slate-400">Loading...</div>;
  }

  if (todos.length === 0) {
    return <div className="text-slate-400">No todos</div>;
  }

  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo._id}
          onDeleteClick={() => {
            deleteTodoItem(todo._id);
          }}
          onCheckboxClick={() => {
            toggleTodoItem(todo._id);
          }}
          title={todo.text}
          isChecked={todo.isDone}
          disabled={false}
        />
      ))}
    </>
  );
}

export default TodoList;
