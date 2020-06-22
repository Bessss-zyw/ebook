package com.reins.bookstore.dao;

import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.Modifying;

import java.sql.Timestamp;
import java.util.List;

public interface OrderDao {

    List<Order> getOrdersByUser(int user_id);

    List<OrderItem> getOrderItems(int order_id);

    Order getOrder(int order_id);

    List<Order> getAllOrders();

    List<Order> getOrderDuring(Timestamp start, Timestamp end);

    List<Order> getUserOrderDuring(int user_id, Timestamp start, Timestamp end);


    void saveOrder(Order order);

    void saveOrderItem(OrderItem orderItem);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    void insertOrderItem(int order_id, int book_id, String book_name, int num, Double book_price);

    void insertOrderItems(List<OrderItem> list);

    void removeOrder(Order order);

    void removeOrderItem(OrderItem orderItem);


//    void makeOrder(List<OrderItem> items, int user_id);
}
