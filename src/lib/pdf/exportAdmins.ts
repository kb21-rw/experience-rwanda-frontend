import { Admin } from "@/types/Admin";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportAdminsToPdf = (admins: Admin[], fileName = "admins.pdf") => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Admin List", 14, 20);

  const tableData = admins.map((admin, i) => [
    (i + 1).toString().padStart(3, "0"),
    admin.name || "—",
    admin.email || "—",
    admin.role || "—",
  ]);

  autoTable(doc, {
    startY: 30,
    head: [["No", "Name", "Email", "Role"]],
    body: tableData,
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [52, 152, 219],
      textColor: [255, 255, 255],
    },
  });

  doc.save(fileName);
};
