import { useBookings } from "@/hooks/useBookings";
import { useState } from "react";
import Search from "../../trips/Search";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Booking } from "@/types/Booking";
import BookRow from "./Card/BookRow";

const ViewBookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { bookings, loading, error } = useBookings();
  const bookingsPerPage = 8;

  const filteredBookings = bookings.filter((booking) => {
    const keyword = searchQuery.toLowerCase();
    return (
      booking.id.toLowerCase().includes(keyword) ||
      booking.name.toLowerCase().includes(keyword) ||
      booking.email.toLowerCase().includes(keyword)
    );
  });

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <p className="animate-bounce text-2xl">Loading bookings...</p>
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Search onSearch={setSearchQuery} className="w-25" />
      </div>

      {paginatedBookings.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBookings.map((booking: Booking, index: number) => (
              <BookRow
                key={booking.id}
                {...booking}
                displayId={((currentPage - 1) * bookingsPerPage + index + 1)
                  .toString()
                  .padStart(3, "0")}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500 text-xl py-10">
          No bookings found.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </div>
  );
};

export default ViewBookingsPage;
