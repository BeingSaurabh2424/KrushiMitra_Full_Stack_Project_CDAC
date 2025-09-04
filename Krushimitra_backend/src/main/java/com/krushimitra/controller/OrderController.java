package com.krushimitra.controller;

import com.krushimitra.dto.MessageResponse;
import com.krushimitra.dto.OrderRequest;
import com.krushimitra.entity.*;
import com.krushimitra.repository.OrderRepository;
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
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderRequest orderRequest, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order(user, orderRequest.getTotalAmount(), orderRequest.getShippingAddress(), orderRequest.getPaymentMethod());
        Order savedOrder = orderRepository.save(order);

        // Create order items
        for (OrderRequest.OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = new OrderItem(savedOrder, product, itemRequest.getQuantity(), itemRequest.getPrice());
            savedOrder.getItems().add(orderItem);
        }

        orderRepository.save(savedOrder);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/farmer-orders")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<List<Order>> getFarmerOrders(Authentication authentication) {
        User farmer = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findOrdersByFarmer(farmer);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('FARMER') or hasRole('ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id, Authentication authentication) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (!orderOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Order order = orderOptional.get();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user has permission to view this order
        if (user.getRole() == Role.CUSTOMER && !order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
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
}