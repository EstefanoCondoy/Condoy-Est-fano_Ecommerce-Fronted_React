import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

export default function Announcement() {
  return (
    <div className="announcement">
      <LocalShippingOutlinedIcon fontSize="small" />
      <span>Envíos gratis en compras superiores a $500</span>
      <span className="announcement-dot">•</span>
      <span>Compra segura y stock actualizado</span>
    </div>
  );
}
