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
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
interface DeleteAlertProps {
  onDelete: () => Promise<boolean> | void;
  title: string;
  description: string;
  successMessage: string;
  errorMessage: string;
  children?: React.ReactNode;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  onDelete,
  title,
  description,
  successMessage,
  errorMessage,
  children,
  setIsLoading,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        {children ? (
          children
        ) : (
          <div className="flex items-center justify-start gap-2  p-0 text-sm w-full hover:bg-gray-100">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center items-center text-center">
            <IoIosAlert className="w-12 h-12" />
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
              try {
                setIsLoading(true);
                const success = await onDelete();
                if (!success) {
                  toast.error(errorMessage);
                  return;
                }
                toast.success(successMessage);
              } catch (error: unknown) {
                if (error instanceof Error) {
                  toast.error(error.message);
                } else {
                  toast.error(errorMessage);
                }
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
