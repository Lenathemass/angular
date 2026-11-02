package com.example.cart;

import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository gives us save, findAll, findById, deleteById... for free
public interface CartRepository extends JpaRepository<CartItem, Long> {
}
