package com.coltis.ecommerce.services;

import com.coltis.ecommerce.dto.*;
import com.coltis.ecommerce.exceptions.BadRequestException;
import com.coltis.ecommerce.exceptions.ResourceNotFoundException;
import com.coltis.ecommerce.models.Product;
import com.coltis.ecommerce.models.Receipt;
import com.coltis.ecommerce.models.ReceiptItem;
import com.coltis.ecommerce.models.User;
import com.coltis.ecommerce.repository.ProductRepository;
import com.coltis.ecommerce.repository.ReceiptRepository;
import com.coltis.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public ReceiptResponse createReceipt(CreateReceiptRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario no encontrado con id: " + request.userId()));

        Receipt receipt = Receipt.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .total(BigDecimal.ZERO)
                .amountOfItems(0)
                .items(new ArrayList<>())
                .build();

        BigDecimal total = BigDecimal.ZERO;
        int amountOfItems = 0;

        for (ReceiptItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Producto no encontrado con id: " + itemRequest.productId()));

            if (product.getAmount() < itemRequest.quantity()) {
                throw new BadRequestException(
                        "Stock insuficiente para el producto: " + product.getName());
            }

            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(itemRequest.quantity()));
            ReceiptItem item = ReceiptItem.builder()
                    .receipt(receipt)
                    .product(product)
                    .quantity(itemRequest.quantity())
                    .unitPrice(unitPrice)
                    .subtotal(subtotal)
                    .build();

            receipt.getItems().add(item);
            product.setAmount(product.getAmount() - itemRequest.quantity());
            total = total.add(subtotal);
            amountOfItems += itemRequest.quantity();
        }

        receipt.setTotal(total);
        receipt.setAmountOfItems(amountOfItems);
        return toResponse(receiptRepository.save(receipt));
    }

    public ReceiptResponse readReceipt(Integer id) {
        return toResponse(findReceipt(id));
    }

    public List<ReceiptResponse> getReceiptsByUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("Usuario no encontrado con id: " + userId);
        }
        return receiptRepository.findByUser_UserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<ReceiptResponse> getAllReceipts() {
        return receiptRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void deleteReceipt(Integer id) {
        receiptRepository.delete(findReceipt(id));
    }

    private Receipt findReceipt(Integer id) {
        return receiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Recibo no encontrado con id: " + id));
    }

    private ReceiptResponse toResponse(Receipt receipt) {
        List<ReceiptItemResponse> items = receipt.getItems().stream()
                .map(item -> new ReceiptItemResponse(
                        item.getProduct().getProductId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getSubtotal()
                ))
                .toList();

        return new ReceiptResponse(
                receipt.getReceiptId(),
                receipt.getUser().getUserId(),
                receipt.getUser().getEmail(),
                receipt.getTotal(),
                receipt.getAmountOfItems(),
                receipt.getCreatedAt(),
                items
        );
    }
}
