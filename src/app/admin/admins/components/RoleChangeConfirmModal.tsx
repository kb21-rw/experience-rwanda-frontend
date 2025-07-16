import { Button } from "@/components/ui/Button";
import { Admin } from "@/types/Admin";

interface RoleOption {
  value: string;
  label: string;
}

interface Props {
  open: boolean;
  admin: Admin;
  pendingRole: string | null;
  roleOptions: RoleOption[];
  isUpdating: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const RoleChangeConfirmModal = ({
  open,
  admin,
  pendingRole,
  roleOptions,
  isUpdating,
  onCancel,
  onConfirm,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h3 className="text-lg font-semibold mb-2">Confirm Role Change</h3>
        <p className="mb-4">
          Are you sure you want to change <b>{admin.name}</b>&apos;s role to <b>{roleOptions.find(r => r.value === pendingRole)?.label}</b>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isUpdating}>Cancel</Button>
          <Button variant="primary" onClick={onConfirm} disabled={isUpdating}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default RoleChangeConfirmModal; 