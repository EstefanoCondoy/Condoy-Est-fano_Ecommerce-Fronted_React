package com.coltis.ecommerce.services;

import com.coltis.ecommerce.dto.RegisterUserRequest;
import com.coltis.ecommerce.dto.UserResponse;
import com.coltis.ecommerce.models.User;
import com.coltis.ecommerce.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Test
    void registersUserWithHashedPasswordAndSafeResponse() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        UserService service = new UserService(userRepository, encoder);
        when(userRepository.existsByEmail("jaime@epn.edu.ec")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setUserId(1);
            return user;
        });

        UserResponse response = service.registerUser(new RegisterUserRequest(
                "Jaime",
                "Sayago",
                "jaime@epn.edu.ec",
                "123456",
                "Quito",
                "0999999999"
        ));

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        org.mockito.Mockito.verify(userRepository).save(captor.capture());
        assertThat(encoder.matches("123456", captor.getValue().getPassword())).isTrue();
        assertThat(response.email()).isEqualTo("jaime@epn.edu.ec");
    }
}
