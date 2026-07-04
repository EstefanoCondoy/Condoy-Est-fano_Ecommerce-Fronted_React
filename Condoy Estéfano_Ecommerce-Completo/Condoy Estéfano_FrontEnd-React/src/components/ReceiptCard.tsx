import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import type { Receipt } from "../types";

export default function ReceiptCard({ receipt }: { receipt: Receipt }) {
  return (
    <article className="receipt-card">
      <div className="receipt-header">
        <span className="receipt-icon"><ReceiptLongOutlinedIcon /></span>
        <div>
          <span>Recibo</span>
          <h3>#{receipt.receiptId.toString().padStart(5, "0")}</h3>
        </div>
        <div className="receipt-total">
          <span>Total</span>
          <strong>${Number(receipt.total).toFixed(2)}</strong>
        </div>
      </div>
      <div className="receipt-meta">
        <span><CalendarMonthOutlinedIcon /> {new Date(receipt.createdAt).toLocaleString("es-EC")}</span>
        <span>{receipt.amountOfItems} artículos</span>
      </div>
      <div className="receipt-items">
        {receipt.items.map(item => (
          <div key={`${receipt.receiptId}-${item.productId}`}>
            <span>{item.productName} × {item.quantity}</span>
            <strong>${Number(item.subtotal).toFixed(2)}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
