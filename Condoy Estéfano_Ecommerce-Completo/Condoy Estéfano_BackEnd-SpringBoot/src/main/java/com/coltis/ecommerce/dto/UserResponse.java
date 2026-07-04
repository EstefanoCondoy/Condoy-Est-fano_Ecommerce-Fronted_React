package com.coltis.ecommerce.dto;

public record UserResponse(
        Integer userId,
        String firstName,
        String lastName,
        String email,
        String address,
        String phoneNumber
) {
}
