"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import DeleteAlert from "@/components/DeleteAlert";
import { Admin } from "@/types/Admin";

interface Props {
  onDelete?: (id: string) => Promise<boolean>;
  admin: Admin;
  displayId: string;
}

const AdminRow = ({ onDelete, admin, displayId }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isClickOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(target);

      const isInsideAlertDialog = (target as HTMLElement).closest(
        "[role='alertdialog']"
      );

      if (isClickOutsideDropdown && !isInsideAlertDialog) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <TableRow>
      <TableCell>{displayId}</TableCell>
      <TableCell>{admin.name}</TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>{admin.role}</TableCell>
      <TableCell>{admin.status}</TableCell>
      <TableCell className="relative">
        <Button
          variant="primary"
          onClick={toggleDropdown}
          className="flex items-center gap-2"
        >
          Modify <ChevronDown size={14} />
        </Button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-28 mt-2 bg-white border rounded shadow-lg"
          >
            <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
              View
            </button>

            <DeleteAlert
              onDelete={async () => {
                const success = await onDelete?.(admin.id);
                return success || false;
              }}
              title="Delete Admin?"
              description={`Are you sure you want to this admin made by ${admin.name}? This action can not  undone.`}
              errorMessage="Failed to delete admin."
              successMessage="Admin deleted successfully."
            />

            <Link
              href={`/admin/users/admins/${admin.id}/edit`}
              className="block text-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
            >
              Edit
            </Link>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AdminRow;
