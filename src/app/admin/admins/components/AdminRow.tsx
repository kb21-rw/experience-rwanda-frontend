import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Admin } from "@/types/Admin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { useDeleteAdmin } from "@/hooks/useDeleteAdmin";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { fetchWithToken } from "@/utils/request";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import RoleChangeConfirmModal from "./RoleChangeConfirmModal";
import clsx from "clsx";
import Spinner from "@/components/ui/Spinner";

interface Props {
  admin: Admin;
  displayId: string;
  mutate?: () => void;
  canDeleteAdmin: boolean;
  canChangeRole: boolean;
}

const ROLE_OPTIONS = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
];

const AdminRow = ({
  admin,
  displayId,
  mutate,
  canDeleteAdmin,
  canChangeRole,
}: Props) => {
  const { deleteAdmin } = useDeleteAdmin();
  const [selectedRole, setSelectedRole] = useState(admin.role);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleRoleSelect = (newRole: string) => {
    if (newRole !== admin.role) {
      setPendingRole(newRole);
      setShowConfirm(true);
    }
  };

  const handleConfirm = async () => {
    if (!pendingRole || !token) return;
    setIsUpdating(true);
    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/role/${admin.id}`,
        "PUT",
        { role: pendingRole },
        token
      );
      if (!response || response.error) {
        toast.error(
          response?.error || "Failed to update role. Please try again."
        );
        return;
      }
      setSelectedRole(pendingRole);
      toast.success("Role updated successfully.");
      if (mutate) mutate();
    } catch {
      toast.error("Failed to update role. Please try again.");
    } finally {
      setShowConfirm(false);
      setPendingRole(null);
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingRole(null);
  };

  return (
    <>
      <TableRow>
        <TableCell>{displayId}</TableCell>
        <TableCell className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="text-black">
              {getNameInitials(admin?.name || "Not Available")}
            </AvatarFallback>
          </Avatar>
          <p>{admin?.name || "Not Available"}</p>
        </TableCell>
        <TableCell>{admin?.email || "Not Available"}</TableCell>
        <TableCell>{admin?.status || "Not Available"}</TableCell>

        <TableCell>
          {canChangeRole ? (
            <>
              <Select
                value={selectedRole}
                onValueChange={handleRoleSelect}
                disabled={isUpdating}
              >
                <SelectTrigger
                  className={clsx(
                    "px-4 py-1 rounded text-sm font-medium border-0",
                    {
                      "bg-black text-white":
                        selectedRole === "SUPER_ADMIN" ||
                        selectedRole === "ADMIN",
                      "bg-gray-200 text-black":
                        selectedRole !== "SUPER_ADMIN" &&
                        selectedRole !== "ADMIN",
                    }
                  )}
                >
                  <SelectValue>
                    {ROLE_OPTIONS.find((r) => r.value === selectedRole)
                      ?.label || selectedRole}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showConfirm && (
                <RoleChangeConfirmModal
                  open={showConfirm}
                  admin={admin}
                  pendingRole={pendingRole}
                  roleOptions={ROLE_OPTIONS}
                  isUpdating={isUpdating}
                  onCancel={handleCancel}
                  onConfirm={handleConfirm}
                />
              )}
            </>
          ) : (
            <p
              className={clsx(
                "px-4 py-1 rounded text-sm font-medium border-0",
                {
                  "bg-black text-white": admin.role === "SUPER_ADMIN",
                  "bg-gray-200 text-black": admin.role === "ADMIN",
                }
              )}
            >
              {admin.role}
            </p>
          )}
        </TableCell>
        {canDeleteAdmin && (
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
              setIsLoading={setIsLoading}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </DeleteAlert>
          </TableCell>
        )}
      </TableRow>
      {isLoading || (isUpdating && <Spinner />)}
    </>
  );
};

export default AdminRow;
