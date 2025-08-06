const exportToCSV = (
  data: Record<string, string | number | boolean | null | undefined>[],
  headers: string[],
  filename: string = "data"
) => {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }
  const csvContent = [
    headers.map((header) => header).join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"') || value.includes("\n"))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? "";
        })
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export default exportToCSV;
