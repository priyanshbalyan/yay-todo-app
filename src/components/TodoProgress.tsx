import { useContext } from "react";
import { TodoContext, TodoState } from "@/providers/TodoProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function TodoProgress() {
  const { todos } = useContext<TodoState>(TodoContext);

  const doneTodos = todos.filter((todo) => todo.isDone);
  const progress = (doneTodos.length / todos.length) * 100;

  return (
    <Card className="rounded-2xl bg-[#576371]">
      <CardContent className="mt-4 text-left text-white">
        <h2 className="text-2xl">Progress</h2>
        <Progress value={progress} className="my-2 h-2 transition-all" />
        <p className="color-[#e0e0e0]">{doneTodos.length} completed</p>
      </CardContent>
    </Card>
  );
}

export default TodoProgress;
