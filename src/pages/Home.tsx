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
import { FilterType } from "@/interfaces";

function Home() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const { createTodoItem } = useContext<TodoState>(TodoContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddClick = async () => {
    if (text) {
      setIsDisabled(true);
      await createTodoItem(text);
      setText("");
      setIsDisabled(false);
    } else {
      toast({ title: "To-do is empty" });
    }
  };

  const handleFilterSelect = (value: FilterType) => {
    setFilterType(value);
  };

  return (
    <Card className="mx-auto my-[60px] mt-6 min-h-[440px] max-w-[720px] rounded-[20px] bg-[#f5f5f5] px-20 py-14">
      <CardContent className="mt-4">
        <TodoProgress />
        <div className="align-center mt-5 flex">
          <h1 className="w-full text-left text-2xl">To-dos</h1>
          <Select value={filterType} onValueChange={handleFilterSelect}>
            <SelectTrigger className="w-[135px] rounded-lg border-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="rounded-[10px]">
              <SelectItem
                className="cursor-pointer rounded-[10px] data-[highlighted]:bg-[#526f92] data-[highlighted]:text-white"
                value="all"
              >
                All
              </SelectItem>
              <SelectItem
                className="cursor-pointer rounded-[10px] data-[highlighted]:bg-[#526f92] data-[highlighted]:text-white"
                value="done"
              >
                Done
              </SelectItem>
              <SelectItem
                className="cursor-pointer rounded-[10px] data-[highlighted]:bg-[#526f92] data-[highlighted]:text-white"
                value="undone"
              >
                Undone
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="align-center my-1 mt-5 flex rounded-full border-none bg-white p-1 pl-2">
          <Input
            className="border-none text-base placeholder:text-[#bcbcbc] focus-visible:ring-blue-500/0 active:border-none"
            placeholder="Add your to-do ..."
            onChange={handleChange}
            value={text}
            disabled={isDisabled}
          />
          <Button
            className="rounded-full bg-[#526f92] text-sm"
            onClick={handleAddClick}
            disabled={isDisabled}
          >
            Add
          </Button>
        </div>
        <TodoList filterType={filterType} />
      </CardContent>
    </Card>
  );
}

export default Home;
