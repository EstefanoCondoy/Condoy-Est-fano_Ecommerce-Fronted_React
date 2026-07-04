package com.coltis.ecommerce.repository;

import com.coltis.ecommerce.models.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {
    List<Receipt> findByUser_UserId(Integer userId);
}
