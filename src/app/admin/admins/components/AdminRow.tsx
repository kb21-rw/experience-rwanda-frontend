import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Admin } from "@/types/Admin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getNameInitials } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { useDeleteAdmin } from "@/hooks/useDeleteAdmin";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { fetchWithToken } from "@/utils/request";
import { useAuth } from "@/context/authContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface Props {
  admin: Admin;
  displayId: string;
  mutate?: () => void;
}

const ROLE_OPTIONS = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "EDITOR", label: "Editor" },
];

const AdminRow = ({ admin, displayId, mutate }: Props) => {
  const { deleteAdmin, isDeleting } = useDeleteAdmin();
  const [selectedRole, setSelectedRole] = useState(admin.role);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { token } = useAuth();

  let isSuperAdmin = false;
  if (token) {
    try {
      const payload = jwtDecode<{ role?: string }>(token);
      isSuperAdmin = payload?.role === "SUPER_ADMIN";
    } catch {
      isSuperAdmin = false;
    }
  }

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
        `${process.env.NEXT_PUBLIC_API_URL}/admins/${admin.id}`,
        "PUT",
        { role: pendingRole },
        token
      );
      
      if (!response || response.error) {
        toast.error(response?.error || "Failed to update role. Please try again.");
        setShowConfirm(false);
        setPendingRole(null);
        return;
      }
      setSelectedRole(pendingRole);
      toast.success("Role updated successfully.");
      setShowConfirm(false);
      setPendingRole(null);
      if (mutate) mutate(); 
    } catch {
      toast.error("Failed to update role. Please try again.");
      setShowConfirm(false);
      setPendingRole(null);
    } finally {
      setIsUpdating(false);
    }
  };


  const handleCancel = () => {
    setShowConfirm(false);
    setPendingRole(null);
  };

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

      <TableCell>
        {isSuperAdmin ? (
          <Select
            value={selectedRole}
            onValueChange={handleRoleSelect}
            disabled={isUpdating}
          >
            <SelectTrigger
              className={`px-4 py-1 rounded text-sm font-medium border-0
                ${selectedRole === "SUPER_ADMIN"
                  ? "bg-black text-white"
                  : selectedRole === "ADMIN"
                    ? "bg-black text-white"
                    : selectedRole === "EDITOR"
                      ? "bg-gray-200 text-black"
                      : "bg-gray-200 text-black"
                }
              `}
            >
              <SelectValue>
                {ROLE_OPTIONS.find(r => r.value === selectedRole)?.label || selectedRole}
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
        ) : (
          <span
            className={`px-4 py-1 rounded text-sm font-medium border-0
              ${admin.role === "SUPER_ADMIN"
                ? "bg-black text-white"
                : admin.role === "ADMIN"
                  ? "bg-black text-white"
                  : admin.role === "EDITOR"
                    ? "bg-gray-200 text-black"
                    : "bg-gray-200 text-black"
              }
            `}
          >
            {ROLE_OPTIONS.find(r => r.value === admin.role)?.label || admin.role}
          </span>
        )}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
              <h3 className="text-lg font-semibold mb-2">Confirm Role Change</h3>
              <p className="mb-4">
                Are you sure you want to change <b>{admin.name}</b>&apos;s role to <b>{ROLE_OPTIONS.find(r => r.value === pendingRole)?.label}</b>?
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel} disabled={isUpdating}>Cancel</Button>
                <Button variant="primary" onClick={handleConfirm} disabled={isUpdating}>Save</Button>
              </div>
            </div>
          </div>
        )}
      </TableCell>
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
    </TableRow>
  );
};

export default AdminRow;