import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

interface Props {
  onDeleteClick: () => void;
  title: string;
  isChecked: boolean;
  onCheckboxClick: () => void;
  disabled: boolean;
}

function TodoItem(props: Props) {
  const { isChecked, onCheckboxClick, title, onDeleteClick } = props;
  return (
    <div className="align-center my-1 flex rounded-full border-none bg-white pl-4">
      <Checkbox
        disabled={false}
        value={isChecked.toString()}
        onCheckedChange={onCheckboxClick}
        className=" mt-2.5 h-6 w-6 rounded-md border-2 border-[#526f92] data-[state=checked]:bg-[#526f92]"
      />
      <p
        className={clsx(
          isChecked && "line-through",
          "w-full p-2.5 text-left text-base leading-6",
        )}
      >
        {title}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="mx-2.5 mt-2.5 cursor-pointer rounded-full hover:bg-black/10" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem onClick={onDeleteClick}>
            <span className="cursor-pointer text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TodoItem;
