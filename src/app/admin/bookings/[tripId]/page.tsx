"use client";
import { useBookings } from "@/hooks/useBookings";
import { useState } from "react";
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
import Search from "@/components/Search";
import { Button } from "@/components/ui/Button";
import { IoShareSocial } from "react-icons/io5";

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
    <div className="p-6">
      {filteredBookings.length === 0 ? (
        <div className="text-gray-500 text-2xl h-screen flex justify-center items-center">
          No bookings found.
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Search onSearch={setSearchQuery} placeholder="Search Booking" />
            <div className="flex items-center gap-2">
              <select className="border rounded px-4 py-1 bg-white text-gray-700">
                <option className="hover:bg-red-500">All</option>
                <option>$60</option>
                <option>$140</option>
              </select>
            </div>
            <Button variant="primary" className="px-4 py-2">
              <IoShareSocial />
              Export
            </Button>
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
          ) : null}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </div>
  );
};

export default ViewBookingsPage;
