package com.coltis.ecommerce.dto;

import java.math.BigDecimal;

public record ReceiptItemResponse(
        Integer productId,
        String productName,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal
) {
}
