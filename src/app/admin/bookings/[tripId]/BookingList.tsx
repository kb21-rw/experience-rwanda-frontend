"use client";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import BookRow from "./Card/BookRow";
import Search from "@/components/Search";
import { Button } from "@/components/ui/Button";
import { IoShareSocial } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Booking } from "@/types/Booking";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useDeleteBooking } from "@/hooks/useDeleteBooking";
import BookingHeader from "@/components/BookingHeader";

const BookingList = ({
  initialBookings,
}: {
  initialBookings: Booking[];
  isLoading: boolean;
  error: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;
  const { deleteBooking } = useDeleteBooking();

  const {
    data: bookings,
    error,
    mutate,
    isLoading,
  } = useSWR<Booking[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
    fetcher,
    {
      fallbackData: initialBookings,
      revalidateOnFocus: true,
    }
  );

  const handleDelete = async (id: string) => {
    const success = await deleteBooking(id);
    mutate();
    return success;
  };

  const filteredBookings =
    bookings?.filter((booking) => {
      const keyword = searchQuery.toLowerCase();
      return (
        booking.id.toLowerCase().includes(keyword) ||
        booking.user.name.toLowerCase().includes(keyword) ||
        booking.user.email.toLowerCase().includes(keyword)
      );
    }) || [];

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

  if (isLoading)
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
    <>
      <div className="p-6 xl:p-10 min-h-screen flex flex-col justify-between">
        <BookingHeader />
        <div>
          <div className="flex justify-between items-center mb-10">
            <Search onSearch={setSearchQuery} placeholder="Search Booking" />
            <Select>
              <SelectTrigger className="w-37.5">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sixty">$60</SelectItem>
                <SelectItem value="hundred">$100</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead>Seats</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map((booking, index) => (
                  <BookRow
                    key={booking.id}
                    booking={booking}
                    displayId={((currentPage - 1) * bookingsPerPage + index + 1)
                      .toString()
                      .padStart(3, "0")}
                    onDelete={handleDelete}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-gray-500 text-xl flex justify-center items-center">
              No bookings found.
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

export default BookingList;
