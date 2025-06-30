"use client";
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Admin } from "@/types/Admin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/utils/helper";
import { Trash2 } from "lucide-react";
interface Props {
  admin: Admin;
  displayId: string;
}

const AdminRow = ({ admin, displayId }: Props) => {
  console.log(admin);
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
        {
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Delete admin")}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        }
      </TableCell>
    </TableRow>
  );
};

export default AdminRow;
