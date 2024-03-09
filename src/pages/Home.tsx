import { useContext, useState } from "react";
import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TodoProgress from "@/components/TodoProgress";
import { TodoContext, TodoState } from "@/providers/TodoProvider";
import { useToast } from "@/components/ui/use-toast";

function Home() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const { createTodoItem } = useContext<TodoState>(TodoContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddClick = async () => {
    if (text) {
      await createTodoItem(text);
      setText("");
    } else {
      toast({ title: "Todo is empty" });
    }
  };

  return (
    <>
      <Card className="mx-auto min-h-[440px] max-w-3xl rounded-2xl bg-[#f5f5f5] px-20 py-14">
        <CardContent className="mt-4">
          <TodoProgress />
          <div className="align-center mt-5 flex">
            <h1 className="w-full text-left text-2xl">To-dos</h1>
            <Select>
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="Undone">Undone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="align-center my-1 mt-5 flex rounded-full border-none bg-white p-1 pl-2">
            <Input
              className="border-none text-base placeholder:text-[#bcbcbc] focus-visible:ring-blue-500/0 active:border-none"
              placeholder="Add your to-do ..."
              onChange={handleChange}
              value={text}
            />
            <Button
              className="rounded-full bg-[#526f92] text-sm"
              onClick={handleAddClick}
            >
              Add
            </Button>
          </div>
          <TodoList />
        </CardContent>
      </Card>
    </>
  );
}

export default Home;
