package com.example.cart;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200") // allow Angular to call this API
public class CartController {

    private final CartRepository repo;

    public CartController(CartRepository repo) {
        this.repo = repo;
    }

    // READ all  -> GET /api/cart
    @GetMapping
    public List<CartItem> getAll() {
        return repo.findAll();
    }

    // READ one  -> GET /api/cart/1
    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getOne(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE    -> POST /api/cart
    @PostMapping
    public CartItem add(@RequestBody CartItem item) {
        item.setId(null); // make sure it is treated as a new row
        return repo.save(item);
    }

    // UPDATE    -> PUT /api/cart/1
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> update(@PathVariable Long id, @RequestBody CartItem newData) {
        return repo.findById(id).map(item -> {
            item.setName(newData.getName());
            item.setPrice(newData.getPrice());
            item.setQuantity(newData.getQuantity());
            return ResponseEntity.ok(repo.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE    -> DELETE /api/cart/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
