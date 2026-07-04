package com.coltis.ecommerce.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ReceiptResponse(
        Integer receiptId,
        Integer userId,
        String userEmail,
        BigDecimal total,
        Integer amountOfItems,
        LocalDateTime createdAt,
        List<ReceiptItemResponse> items
) {
}
