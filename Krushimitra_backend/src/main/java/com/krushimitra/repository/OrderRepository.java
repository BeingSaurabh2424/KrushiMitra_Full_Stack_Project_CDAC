package com.krushimitra.repository;

import com.krushimitra.entity.Order;
import com.krushimitra.entity.OrderStatus;
import com.krushimitra.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByUserOrderByOrderDateDesc(User user);
    
    @Query("SELECT DISTINCT o FROM Order o JOIN o.items oi WHERE oi.product.farmer = :farmer")
    List<Order> findOrdersByFarmer(@Param("farmer") User farmer);
}