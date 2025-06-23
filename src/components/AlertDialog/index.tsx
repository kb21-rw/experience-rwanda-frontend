import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { IoIosAlert } from "react-icons/io";
import { toast } from "react-toastify";

interface DeleteAlertDialogProps {
  onDelete: () => Promise<boolean> | void;
  title: string;
  description: string;
}

const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  onDelete,
  title,
  description,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center items-center text-center">
            <IoIosAlert fill="red" className="w-12 h-12" />
          </div>
          <AlertDialogTitle className="text-bold text-center text-2xl mb-6">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-black mb-6">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8">
          <AlertDialogAction
            onClick={async () => {
              const success = await onDelete();
              if (!success) {
                toast.error("Failed to delete booking");
                return;
              }
              toast.success("Booking deleted successfully");
            }}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
