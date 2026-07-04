package com.coltis.ecommerce.services;

import com.coltis.ecommerce.dto.*;
import com.coltis.ecommerce.exceptions.BadRequestException;
import com.coltis.ecommerce.exceptions.InvalidCredentialsException;
import com.coltis.ecommerce.exceptions.ResourceNotFoundException;
import com.coltis.ecommerce.models.User;
import com.coltis.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse registerUser(RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("El correo ya se encuentra registrado");
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .address(request.address())
                .phoneNumber(request.phoneNumber())
                .build();
        return toResponse(userRepository.save(user));
    }

    public UserResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }
        return toResponse(user);
    }

    public UserResponse readUser(Integer id) {
        return toResponse(findUserEntity(id));
    }

    @Transactional
    public UserResponse updateUser(Integer id, UpdateUserRequest request) {
        User user = findUserEntity(id);
        if (request.firstName() != null) user.setFirstName(request.firstName());
        if (request.lastName() != null) user.setLastName(request.lastName());

        if (request.email() != null && !request.email().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.email())) {
                throw new BadRequestException("El correo ya se encuentra registrado");
            }
            user.setEmail(request.email());
        }
        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        if (request.address() != null) user.setAddress(request.address());
        if (request.phoneNumber() != null) user.setPhoneNumber(request.phoneNumber());
        return toResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Integer id) {
        userRepository.delete(findUserEntity(id));
    }

    public User findUserEntity(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAddress(),
                user.getPhoneNumber()
        );
    }
}
