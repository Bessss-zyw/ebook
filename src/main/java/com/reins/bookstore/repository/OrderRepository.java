package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("from Order where user_id = ?1")
    List<Order> getOrderByUser_id(int user_id);

    @Query("from Order where order_id = ?1")
    Order getOrderByOrder_id(int order_id);

    @Query("from Order")
    List<Order> getAllOrder();
}
