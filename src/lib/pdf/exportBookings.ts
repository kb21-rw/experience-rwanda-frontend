import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = (
  data: { [key: string]: string }[],
  headers: string[],
  text: string,
  fileName: string = "data"
) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(text, 14, 20);
  autoTable(doc, {
    startY: 30,

    head: [headers.map((header) => [header])],
    body: data.map((row) => Object.values(row)),
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [52, 152, 219],
      textColor: [255, 255, 255],
    },
  });

  doc.save(`${fileName}.pdf`);
};
