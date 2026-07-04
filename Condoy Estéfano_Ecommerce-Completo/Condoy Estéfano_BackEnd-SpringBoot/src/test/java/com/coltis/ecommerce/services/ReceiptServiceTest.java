package com.coltis.ecommerce.services;

import com.coltis.ecommerce.dto.CreateReceiptRequest;
import com.coltis.ecommerce.dto.ReceiptItemRequest;
import com.coltis.ecommerce.dto.ReceiptResponse;
import com.coltis.ecommerce.exceptions.BadRequestException;
import com.coltis.ecommerce.models.Product;
import com.coltis.ecommerce.models.Receipt;
import com.coltis.ecommerce.models.User;
import com.coltis.ecommerce.repository.ProductRepository;
import com.coltis.ecommerce.repository.ReceiptRepository;
import com.coltis.ecommerce.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReceiptServiceTest {

    @Mock
    private ReceiptRepository receiptRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductRepository productRepository;

    private ReceiptService receiptService;
    private User user;
    private Product product;

    @BeforeEach
    void setUp() {
        receiptService = new ReceiptService(receiptRepository, userRepository, productRepository);
        user = User.builder()
                .userId(1)
                .firstName("Jaime")
                .lastName("Sayago")
                .email("jaime@epn.edu.ec")
                .password("hash")
                .build();
        product = Product.builder()
                .productId(1)
                .name("Laptop")
                .price(new BigDecimal("850.99"))
                .amount(10)
                .build();
    }

    @Test
    void createsReceiptFromDatabasePriceAndUpdatesStock() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        when(receiptRepository.save(any(Receipt.class))).thenAnswer(invocation -> {
            Receipt receipt = invocation.getArgument(0);
            receipt.setReceiptId(7);
            return receipt;
        });

        ReceiptResponse response = receiptService.createReceipt(
                new CreateReceiptRequest(1, List.of(new ReceiptItemRequest(1, 2)))
        );

        assertThat(response.receiptId()).isEqualTo(7);
        assertThat(response.total()).isEqualByComparingTo("1701.98");
        assertThat(response.amountOfItems()).isEqualTo(2);
        assertThat(response.items()).hasSize(1);
        assertThat(product.getAmount()).isEqualTo(8);
    }

    @Test
    void rejectsReceiptWhenStockIsInsufficient() {
        product.setAmount(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        CreateReceiptRequest request =
                new CreateReceiptRequest(1, List.of(new ReceiptItemRequest(1, 2)));

        assertThatThrownBy(() -> receiptService.createReceipt(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Stock insuficiente");
        verify(receiptRepository, never()).save(any());
    }
}
