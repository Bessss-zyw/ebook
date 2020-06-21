package com.reins.bookstore.repository;

import com.reins.bookstore.entity.OrderItem;
import org.hibernate.sql.ordering.antlr.OrderingSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {

    @Query("from OrderItem where order_id = ?1")
    List<OrderItem> getOrderItemsByOrder_id(int order_id);

}
