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
import { useDeleteBooking } from "@/hooks/useDeleteBooking";
import BookingHeader from "@/components/BookingHeader";
import { ExportPopover } from "@/components/ui/ExportPopover";
import { BOOKING_HEADERS } from "@/utils/constants";
import TripNotFound from "../../trips/Card/NotFound";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
import { useTrips } from "@/hooks/useTrips";
import { useParams } from "next/navigation";

const BookingList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;
  const { deleteBooking } = useDeleteBooking();
  const { tripId } = useParams();

  const handleDelete = async (id: string) => {
    const success = await deleteBooking(id);
    return success;
  };

  const { data: trips = [], isLoading, error } = useTrips();
  const trip = trips.find((trip) => trip.id === tripId);
  if (!trip)
    return (
      <div className="flex justify-center items-center text-center h-screen w-full">
        <p className="font-bold text-2xl">Trip not found</p>
      </div>
    );
  const filteredBookings =
    trip?.bookings?.filter((booking) => {
      const keyword = searchQuery.toLowerCase();
      return (
        booking.id.toLowerCase().includes(keyword) ||
        booking.user.fullName.toLowerCase().includes(keyword) ||
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
  if (isLoading) return <TableSkeleton />;
  if (error) return <p className="text-red-600">{error}</p>;
  const title = trip.title;
  const destination = trip.destination;
  const departureTime = trip.departureTime;
  const totalBookedSeats = trip.bookings.reduce(
    (total, booking) => total + booking.bookedSeats,
    0
  );
  const totalSeats = trip.totalSeats;
  return (
    <div className="border border-border overflow-hidden p-5 rounded-lg w-full flex flex-col gap-4">
      <BookingHeader
        departureTime={departureTime}
        totalBookedSeats={totalBookedSeats}
        totalSeats={totalSeats}
        destination={destination}
      />
      <div className="flex justify-between items-center">
        <Search
          onSearch={setSearchQuery}
          placeholder="Search Booking"
          className="w-1/3"
        />
        <ExportPopover
          data={paginatedBookings.map((booking, index) => ({
            No: ((currentPage - 1) * bookingsPerPage + index + 1)
              .toString()
              .padStart(3, "0"),
            Name: booking.user.fullName,
            Phone: booking.user.phoneNumber,
            Email: booking.user.email,
            Seats: booking.bookedSeats.toString(),
            Amount: booking.totalAmount.toString(),
          }))}
          headers={BOOKING_HEADERS}
          filename={`bookings-${title}-${currentPage}`}
          title={`Bookings of ${title}`}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {BOOKING_HEADERS.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {trip.bookings.length > 0 ? (
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
        ) : (
          <TripNotFound
            title="No Bookings"
            description="No bookings found for this trip"
          />
        )}
      </Table>

      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default BookingList;
