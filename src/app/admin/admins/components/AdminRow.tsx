import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Admin } from "@/types/Admin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { useDeleteAdmin } from "@/hooks/useDeleteAdmin";
import { useState } from "react";

interface Props {
  admin: Admin;
  displayId: string;
}

const AdminRow = ({ admin, displayId }: Props) => {
  const { deleteAdmin, isDeleting } = useDeleteAdmin();
  const [showDelete, setShowDelete] = useState(false);

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
      <TableCell className="relative">
        <DeleteAlert
          onDelete={async () => await deleteAdmin(admin.id)}
          title="Delete Admin?"
          description={`Are you sure you want to delete admin ${admin.name}? This action cannot be undone.`}
          successMessage="Admin deleted successfully."
          errorMessage="Failed to delete admin."
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDelete(true)}
            className="text-red-500 hover:text-red-700"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </DeleteAlert>
      </TableCell>
    </TableRow>
  );
};

export default AdminRow;
