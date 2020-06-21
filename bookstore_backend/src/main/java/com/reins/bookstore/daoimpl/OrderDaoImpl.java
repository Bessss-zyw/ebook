package com.reins.bookstore.daoimpl;

import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.repository.OrderItemRepository;
import com.reins.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;


    @Override
    public List<Order> getOrdersByUser(int user_id){
        return orderRepository.getOrderByUser_id(user_id);
    };

    @Override
    public List<OrderItem> getOrderItems(int order_id){
        return orderItemRepository.getOrderItemsByOrder_id(order_id);
    };

    @Override
    public Order getOrder(int order_id){
        return orderRepository.getOrderByOrder_id(order_id);
    };

    @Override
    public List<Order> getAllOrders(){
        return orderRepository.getAllOrder();
    };



    @Override
    public void saveOrder(Order order){
        orderRepository.save(order);
    };

    @Override
    public void saveOrderItem(OrderItem orderItem){
//        orderItemRepository.save(orderItem);
        orderItemRepository.saveAndFlush(orderItem);
    };

    @Override
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    public void insertOrderItem(int order_id, int book_id, String book_name, int num, Double book_price) {
        OrderItem orderItem = new OrderItem(order_id, book_id, book_name, num, book_price);
        orderItemRepository.saveAndFlush(orderItem);
    }

    @Override
    public void insertOrderItems(List<OrderItem> list){
        orderItemRepository.saveAll(list);
    }


    @Override
    public void removeOrder(Order order){
        orderRepository.delete(order);
    };

    @Override
    public void removeOrderItem(OrderItem orderItem){
        orderItemRepository.delete(orderItem);
    };


}
