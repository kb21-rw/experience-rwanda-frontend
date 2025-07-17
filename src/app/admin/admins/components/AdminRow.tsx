import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Admin } from "@/types/Admin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { useDeleteAdmin } from "@/hooks/useDeleteAdmin";

interface Props {
  admin: Admin;
  displayId: string;
  mutate?: () => void; // Make mutate optional
  canPerformAction: boolean;
}

const AdminRow = ({ admin, displayId, mutate, canPerformAction }: Props) => {
  const { deleteAdmin, isDeleting } = useDeleteAdmin();

  return (
    <TableRow>
      <TableCell>{displayId}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{getNameInitials(admin.name)}</AvatarFallback>
        </Avatar>
        <p>{admin.name}</p>
      </TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>{admin.role}</TableCell>
      {canPerformAction && (
        <TableCell className="relative">
          <DeleteAlert
            onDelete={async () => {
              const success = await deleteAdmin(admin.id);
              if (success && mutate) mutate();
              return success;
            }}
            title="Delete Admin?"
            description={`Are you sure you want to delete admin ${admin.name}? This action cannot be undone.`}
            successMessage="Admin deleted successfully."
            errorMessage="Failed to delete admin."
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </DeleteAlert>
        </TableCell>
      )}
    </TableRow>
  );
};

export default AdminRow;
