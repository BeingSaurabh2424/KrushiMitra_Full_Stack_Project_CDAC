package com.krushimitra.controller;

import com.krushimitra.dto.MessageResponse;
import com.krushimitra.dto.ProductRequest;
import com.krushimitra.entity.Product;
import com.krushimitra.entity.User;
import com.krushimitra.repository.ProductRepository;
import com.krushimitra.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productRepository.findByCategoryAndInStock(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productRepository.findByKeyword(keyword);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequest productRequest, Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = new Product(
                productRequest.getName(),
                productRequest.getCategory(),
                productRequest.getPrice(),
                productRequest.getUnit(),
                productRequest.getDescription(),
                productRequest.getImage(),
                farmer
        );
        product.setInStock(productRequest.getInStock());

        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest productRequest, Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product product = productOptional.get();
        if (!product.getFarmer().getId().equals(farmer.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("You can only update your own products"));
        }

        product.setName(productRequest.getName());
        product.setCategory(productRequest.getCategory());
        product.setPrice(productRequest.getPrice());
        product.setUnit(productRequest.getUnit());
        product.setDescription(productRequest.getDescription());
        product.setImage(productRequest.getImage());
        product.setInStock(productRequest.getInStock());

        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id, Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product product = productOptional.get();
        if (!product.getFarmer().getId().equals(farmer.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("You can only delete your own products"));
        }

        productRepository.delete(product);
        return ResponseEntity.ok(new MessageResponse("Product deleted successfully"));
    }
}