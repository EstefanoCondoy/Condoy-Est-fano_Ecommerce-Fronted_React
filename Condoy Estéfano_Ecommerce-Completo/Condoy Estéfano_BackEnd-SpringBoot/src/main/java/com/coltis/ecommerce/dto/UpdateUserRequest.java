package com.coltis.ecommerce.dto;

import jakarta.validation.constraints.Email;

public record UpdateUserRequest(
        String firstName,
        String lastName,
        @Email String email,
        String password,
        String address,
        String phoneNumber
) {
}
