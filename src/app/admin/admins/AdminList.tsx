import { useState } from "react";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import AdminRow from "./components/AdminRow";
import Search from "@/components/Search";
import { Button } from "@/components/ui/Button";
import { IoShareSocial } from "react-icons/io5";

import { Admin } from "@/types/Admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";

const AdminList = ({
  admins,
  isLoading,
  error,
}: {
  admins?: Admin[];
  isLoading: boolean;
  error: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("all");
  const adminsPerPage = 8;
  const filteredAdmins =
    admins?.filter((admin) => {
      const keyword = searchQuery.toLowerCase();
      return (
        (admin.role.toLowerCase() === role.toLowerCase() ||
          role.toLowerCase() === "all") &&
        (admin.id.toLowerCase().includes(keyword) ||
          admin.name.toLowerCase().includes(keyword) ||
          admin.email.toLowerCase().includes(keyword))
      );
    }) || [];

  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (error) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <div className="p-6 xl:p-10 min-h-screen flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-10">
            <Search onSearch={setSearchQuery} placeholder="Search Admin" />
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-37.5">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="primary" className="px-4 py-2">
              <IoShareSocial />
              Export
            </Button>
          </div>

          {paginatedAdmins.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAdmins.map((admin, index) => (
                  <AdminRow
                    key={admin.id}
                    admin={admin}
                    displayId={((currentPage - 1) * adminsPerPage + index + 1)
                      .toString()
                      .padStart(3, "0")}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-gray-500 text-xl flex justify-center items-center">
              No Admin found.
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </div>
      </div>
    </>
  );
};

export default AdminList;
