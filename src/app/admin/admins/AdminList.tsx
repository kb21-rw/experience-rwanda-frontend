import { useEffect, useState } from "react";
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

import { Admin } from "@/types/Admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
import useSWR from "swr";
import { useAuth } from "@/context/authContext";
import { fetcher } from "@/lib/fetcher";
import { hasPermission } from "@/auth/rbac";
import { ExportPopover } from "@/components/ui/ExportPopover";
import { ADMIN_HEADERS } from "@/utils/constants";
import NotFound from "../trips/Card/NotFound";

const AdminList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState("all");
  const { token, user } = useAuth();
  const [status, setStatus] = useState("all");

  const {
    data: admins,
    error,
    isLoading,
    mutate,
  } = useSWR<Admin[]>(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/admins`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const canDeleteAdmin = hasPermission(user, "delete:admins");
  const canChangeRole = hasPermission(user, "update:admins");
  const canExportAdmins = hasPermission(user, "export:admins");
  const adminsPerPage = 8;
  const filteredAdmins =
    admins?.filter((admin) => {
      const keyword = searchQuery.toLowerCase();
      return (
        (admin.role.toLowerCase() === role.toLowerCase() ||
          role.toLowerCase() === "all") &&
        (admin.status.toLowerCase() === status.toLowerCase() ||
          status.toLowerCase() === "all") &&
        ((admin.name || "Not Available").toLowerCase().includes(keyword) ||
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

  useEffect(() => {
    const isFiltering =
      searchQuery.trim() !== "" || role !== "all" || status !== "all";
    if (isFiltering) {
      setCurrentPage(1);
    }
  }, [searchQuery, role, status]);

  if (error) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (isLoading || !token) return <TableSkeleton />;

  return (
    <div className="p-6 xl:p-10 w-full flex flex-col justify-between border border-border overflow-hidden rounded-lg">
      <div className="">
        <div className="flex justify-between items-center mb-10">
          <Search
            onSearch={setSearchQuery}
            placeholder="Search Admin"
            className="w-1/3"
          />
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({admins?.length})</SelectItem>
              <SelectItem value="active">
                Active (
                {admins?.filter((admin) => admin.status === "ACTIVE").length})
              </SelectItem>
              <SelectItem value="inactive">
                Inactive (
                {admins?.filter((admin) => admin.status === "INACTIVE").length})
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({admins?.length})</SelectItem>
              <SelectItem value="admin">
                Admin (
                {admins?.filter((admin) => admin.role === "ADMIN").length})
              </SelectItem>
              <SelectItem value="super_admin">
                Super Admin (
                {admins?.filter((admin) => admin.role === "SUPER_ADMIN").length}
                )
              </SelectItem>
            </SelectContent>
          </Select>
          {canExportAdmins && (
            <ExportPopover
              data={paginatedAdmins.map((admin, index) => ({
                No: ((currentPage - 1) * adminsPerPage + index + 1)
                  .toString()
                  .padStart(3, "0"),
                Name: admin.name,
                "Email Address": admin.email,
                Role: admin.role,
                Status: admin.status,
              }))}
              headers={ADMIN_HEADERS}
              filename={`admins-page-${currentPage}`}
              title="Admins"
            />
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {ADMIN_HEADERS.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}

              {canDeleteAdmin && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          {paginatedAdmins.length > 0 ? (
            <TableBody>
              {paginatedAdmins.map((admin, index) => (
                <AdminRow
                  key={admin.id}
                  admin={admin}
                  displayId={((currentPage - 1) * adminsPerPage + index + 1)
                    .toString()
                    .padStart(3, "0")}
                  mutate={mutate}
                  canDeleteAdmin={canDeleteAdmin}
                  canChangeRole={canChangeRole}
                />
              ))}
            </TableBody>
          ) : (
            <NotFound title="No Admins Found" description="No admins found" />
          )}
        </Table>
      </div>
      {paginatedAdmins.length > 0 && (
        <div className="flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </div>
      )}
    </div>
  );
};

export default AdminList;
