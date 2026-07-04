package com.coltis.ecommerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ReceiptItemRequest(
        @NotNull Integer productId,
        @NotNull @Min(1) Integer quantity
) {
}
