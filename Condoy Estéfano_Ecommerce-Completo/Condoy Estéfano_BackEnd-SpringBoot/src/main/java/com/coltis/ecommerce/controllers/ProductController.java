package com.coltis.ecommerce.controllers;

import com.coltis.ecommerce.dto.ProductRequest;
import com.coltis.ecommerce.models.Product;
import com.coltis.ecommerce.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@Valid @RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }

    @GetMapping("/{id}")
    public Product read(@PathVariable Integer id) {
        return productService.readProduct(id);
    }

    @GetMapping
    public List<Product> readAll() {
        return productService.readAllProducts();
    }

    @PutMapping("/{id}")
    public Product update(
            @PathVariable Integer id,
            @Valid @RequestBody ProductRequest request
    ) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }
}
