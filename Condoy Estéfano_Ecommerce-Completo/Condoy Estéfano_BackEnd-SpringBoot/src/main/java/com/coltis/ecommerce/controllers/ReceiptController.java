package com.coltis.ecommerce.controllers;

import com.coltis.ecommerce.dto.CreateReceiptRequest;
import com.coltis.ecommerce.dto.ReceiptResponse;
import com.coltis.ecommerce.services.ReceiptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReceiptResponse create(@Valid @RequestBody CreateReceiptRequest request) {
        return receiptService.createReceipt(request);
    }

    @GetMapping("/{id}")
    public ReceiptResponse read(@PathVariable Integer id) {
        return receiptService.readReceipt(id);
    }

    @GetMapping
    public List<ReceiptResponse> readAll() {
        return receiptService.getAllReceipts();
    }

    @GetMapping("/user/{userId}")
    public List<ReceiptResponse> readByUser(@PathVariable Integer userId) {
        return receiptService.getReceiptsByUser(userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        receiptService.deleteReceipt(id);
    }
}
