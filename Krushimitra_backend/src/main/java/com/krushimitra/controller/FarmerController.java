package com.krushimitra.controller;

import com.krushimitra.entity.Order;
import com.krushimitra.entity.Product;
import com.krushimitra.entity.User;
import com.krushimitra.repository.OrderRepository;
import com.krushimitra.repository.ProductRepository;
import com.krushimitra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/farmer")
@PreAuthorize("hasRole('FARMER')")
public class FarmerController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getMyProducts(Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Product> products = productRepository.findByFarmer(farmer);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findOrdersByFarmer(farmer);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> getDashboardStats(Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        long totalProducts = productRepository.findByFarmer(farmer).size();
        long totalOrders = orderRepository.findOrdersByFarmer(farmer).size();

        return ResponseEntity.ok(new FarmerStats(totalProducts, totalOrders));
    }

    public static class FarmerStats {
        private long totalProducts;
        private long totalOrders;

        public FarmerStats(long totalProducts, long totalOrders) {
            this.totalProducts = totalProducts;
            this.totalOrders = totalOrders;
        }

        public long getTotalProducts() { return totalProducts; }
        public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

        public long getTotalOrders() { return totalOrders; }
        public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
    }
}