import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface DeleteProps {
  id: string;
  item: string;
  onDelete: (id: string) => void;
  text?: string;
}

const DeleteButton = ({ id, onDelete, item, text }: DeleteProps) => {
  const [open, setOpen] = useState(false);
  async function handleDelete() {
    onDelete(id);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          title="Delete"
          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-100">
          <Trash2 className="h-4 w-4" /> {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {item}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm" className="bg-[#FDAB04]" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
