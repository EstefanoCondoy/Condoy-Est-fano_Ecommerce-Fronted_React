import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useState } from "react";

export default function ProductVisual({
  imageUrl,
  name,
  compact = false
}: {
  imageUrl?: string;
  name: string;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(!imageUrl || imageUrl.includes("example.com"));

  if (failed) {
    return (
      <div className={`product-fallback ${compact ? "compact" : ""}`}>
        <DevicesOutlinedIcon />
        <span>{name}</span>
      </div>
    );
  }

  return (
    <img
      className={compact ? "cart-product-image" : "product-image"}
      src={imageUrl}
      alt={name}
      onError={() => setFailed(true)}
    />
  );
}
