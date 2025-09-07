package com.krushimitra.controller;

import com.krushimitra.dto.MessageResponse;
import com.krushimitra.entity.Order;
import com.krushimitra.entity.OrderStatus;
import com.krushimitra.entity.Product;
import com.krushimitra.entity.User;
import com.krushimitra.repository.OrderRepository;
import com.krushimitra.repository.ProductRepository;
import com.krushimitra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        if (user.getRole().name().equals("ADMIN")) {
            return ResponseEntity.badRequest().body(new MessageResponse("Cannot delete admin user"));
        }

        userRepository.delete(user);
        return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (!orderOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Order order = orderOptional.get();
        order.setStatus(status);
        orderRepository.save(order);

        return ResponseEntity.ok(new MessageResponse("Order status updated successfully"));
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalOrders = orderRepository.count();
        long totalProducts = productRepository.count();
        long pendingOrders = orderRepository.findByStatus(OrderStatus.PENDING).size();

        return ResponseEntity.ok(new DashboardStats(totalUsers, totalOrders, totalProducts, pendingOrders));
    }

    public static class DashboardStats {
        private long totalUsers;
        private long totalOrders;
        private long totalProducts;
        private long pendingOrders;

        public DashboardStats(long totalUsers, long totalOrders, long totalProducts, long pendingOrders) {
            this.totalUsers = totalUsers;
            this.totalOrders = totalOrders;
            this.totalProducts = totalProducts;
            this.pendingOrders = pendingOrders;
        }

        public long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

        public long getTotalOrders() { return totalOrders; }
        public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

        public long getTotalProducts() { return totalProducts; }
        public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

        public long getPendingOrders() { return pendingOrders; }
        public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }
    }
}