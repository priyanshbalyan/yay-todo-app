import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  onDeleteClick: () => Promise<void>;
  title: string;
  isChecked: boolean;
  onCheckboxClick: () => Promise<void>;
}

function TodoItem(props: Props) {
  const { isChecked, onCheckboxClick, title, onDeleteClick } = props;
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCheckboxClick = () => {
    setIsDisabled(true);
    onCheckboxClick().finally(() => setIsDisabled(false));
  };

  const handleDeleteClick = () => {
    setIsDisabled(true);
    onDeleteClick().finally(() => setIsDisabled(false));
  };

  return (
    <div className="align-center my-2.5 flex rounded-full border-none bg-white pl-4">
      <Checkbox
        disabled={isDisabled}
        checked={isChecked}
        onCheckedChange={handleCheckboxClick}
        className=" mt-2.5 h-6 w-6 rounded-md border-2 border-[#526f92] data-[state=checked]:bg-[#526f92]"
      />
      <p
        className={clsx(
          isChecked && "text-[#a9a9a9] line-through",
          "w-full p-2.5 text-left text-base leading-6",
        )}
      >
        {title}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isDisabled}>
          <Ellipsis className="mr-2 mt-1.5 h-8 w-10 cursor-pointer rounded-full px-2 text-[#9796a9] hover:bg-black/10" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="cursor-pointer"
          >
            <span className=" text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TodoItem;
