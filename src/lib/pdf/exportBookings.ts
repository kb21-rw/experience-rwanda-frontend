import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Booking } from "@/types/Booking";

export const exportBookingsToPdf = (
  bookings: Booking[],
  fileName = "bookings.pdf"
) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Trip Bookings Report", 14, 20);

  const tableData = bookings.map((booking, i) => [
    (i + 1).toString().padStart(3, "0"),
    booking.user?.fullName || "—",
    booking.user?.phoneNumber || "—",
    booking.user?.email || "—",
    booking.bookedSeats.toString(),
    `$${booking.totalAmount?.toFixed(2) || "0.00"}`,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [["No", "Name", "Phone", "Email", "Seats", "Amount"]],
    body: tableData,
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [52, 152, 219],
      textColor: [255, 255, 255],
    },
  });

  doc.save(fileName);
};
