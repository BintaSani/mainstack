import jsPDF from "jspdf";
import { format } from "date-fns";
import type { TransactionType } from "@/shared/types/transactionType";

export function generateTransactionsPDF(transactions: TransactionType[]) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  let cursorY = 30;

  // HEADER
  pdf.setFillColor(19, 19, 22);
  pdf.rect(0, 0, pageWidth, 25, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("Transaction Report", pageWidth / 2, 16, { align: "center" });

  // Reset text color
  pdf.setTextColor(0, 0, 0);

  pdf.setFontSize(12);
  pdf.text(`Total Transactions: ${transactions.length}`, 14, cursorY);
  cursorY += 10;

  // TABLE HEADER
  pdf.setFillColor(240, 240, 240);
  pdf.rect(10, cursorY, pageWidth - 20, 10, "F");
  pdf.setFont("helvetica", "bold");
  pdf.text("Date", 14, cursorY + 7);
  pdf.text("Product", 54, cursorY + 7);
  pdf.text("Type", 104, cursorY + 7);
  pdf.text("Status", 134, cursorY + 7);
  pdf.text("Amount", 164, cursorY + 7);

  cursorY += 15;
  pdf.setFont("helvetica", "normal");

  // PAGE BREAK FUNCTION
  const checkPageBreak = (extra = 15) => {
    if (cursorY + extra > pageHeight - 20) {
      pdf.addPage();
      cursorY = 20;
    }
  };

  // TABLE ROWS
  transactions.forEach((t) => {
    checkPageBreak();

    const formattedDate = format(new Date(t.date), "MMM dd, yyyy");
    const productName = t.metadata?.product_name || "—";
    const displayName = t.metadata?.name || "—";
    const status =
      t.status.charAt(0).toUpperCase() + t.status.slice(1).toLowerCase();

    pdf.text(formattedDate, 14, cursorY);
    pdf.text(productName || displayName, 54, cursorY);
    pdf.text(t.type, 104, cursorY);
    pdf.text(status, 134, cursorY);
    pdf.text(`$${t.amount.toFixed(2)}`, 164, cursorY);

    cursorY += 10;
  });

  // FOOTER
  checkPageBreak(30);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(10, cursorY, pageWidth - 10, cursorY);
  cursorY += 10;
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    `Generated on ${format(new Date(), "PPPpp")}`,
    pageWidth / 2,
    cursorY,
    { align: "center" }
  );

  // SAVE FILE
  pdf.save(`transactions_${format(new Date(), "yyyyMMdd_HHmm")}.pdf`);
}
