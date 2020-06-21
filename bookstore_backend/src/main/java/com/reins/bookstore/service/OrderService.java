package com.reins.bookstore.service;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.CartItem;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    UserDao userDao;

    @Autowired
    CartDao cartDao;

    public List<Order> getOrdersByUser(int user_id){
        return orderDao.getOrdersByUser(user_id);
    }

    public List<OrderItem> getOrderItems(int order_id){
        return orderDao.getOrderItems(order_id);
    }

    public List<Order> getAllOrders(){
        return orderDao.getAllOrders();
    }


    public Order createOrder(int user_id){
        /* check if the user exists*/
        if (!userDao.checkId(user_id)) return null;

        /* check if the each book's inventory is enough */
        List<CartItem> cart = cartDao.getCart(user_id);
        double total = 0.0;
        for (CartItem cartItem:cart) {
            Book book = bookDao.findOne(cartItem.getBook_id());
            if (book.getInventory() < cartItem.getNum())
                return null;
            else total = total + book.getPrice() * cartItem.getNum();
        }

        Order order = new Order(user_id);
        order.setTotal_price(total);
        orderDao.saveOrder(order);
        return order;
    };

    public OrderItem addOrderItem(int order_id,int cart_id){
        CartItem cartItem = cartDao.getItem(cart_id);
        Book book = bookDao.findOne(cartItem.getBook_id());

        OrderItem orderItem = new OrderItem(order_id, cartItem.getBook_id(),
                cartItem.getBook_name(), cartItem.getNum(), book.getPrice());
        orderDao.saveOrderItem(orderItem);

        int inv = book.getInventory() - orderItem.getNum();
        book.setInventory(inv);
        bookDao.saveBook(book);

        return orderItem;
    }

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    public boolean cartToOrder(int user_id){
        /* check if this user_id exists */
        if (!userDao.checkId(user_id)) return false;

        /* get cart items */
        List<CartItem> cart = cartDao.getCart(user_id);

        /* create a new order */
        if (cart.size() == 0) return false;
        Order order =  new Order(user_id);
        orderDao.saveOrder(order);

        double total = 0.0;
        OrderItem[] orderItems = new OrderItem[cart.size()];
        int start_id = 0;
        for (int i = 0; i < cart.size(); ++i) {
            CartItem cartItem = cart.get(i);
            Book book = bookDao.findOne(cartItem.getBook_id());
            System.out.println(book);

            if (book == null) return false;
            total  = total + book.getPrice() * cartItem.getNum();
            if (book.getInventory() < cartItem.getNum()) return false;
            book.setInventory(book.getInventory() - cartItem.getNum());

//            orderItems[i] = new OrderItem(order.getOrder_id(),
//                    cartItem.getBook_id(), cartItem.getBook_name(),
//                    cartItem.getNum(), book.getPrice());
//
//            orderDao.saveOrderItem(orderItems[i]);

            orderItems[i] = new OrderItem(order.getOrder_id(),
                    cartItem.getBook_id(), cartItem.getBook_name(),
                    cartItem.getNum(), book.getPrice());

            if (start_id == 0) {
                orderDao.saveOrderItem(orderItems[i]);
                start_id = orderItems[i].getOrder_item_id();
                System.out.println("start_id = " + start_id);
            }
            else {
                orderItems[i].setOrder_item_id(start_id + i);
                System.out.println(orderItems[i]);
                orderDao.saveOrderItem(orderItems[i]);
            }
        }

        order.setTotal_price(total);
        orderDao.saveOrder(order);

        /* delete all items in cart */
        cartDao.removeAllByUser(user_id);

        return true;

    }



    public boolean cancelOrder(int order_id){
        Order order = orderDao.getOrder(order_id);
        if (order == null) return false;

        order.setState(Constant.ORDER_CANCELED);
        orderDao.saveOrder(order);
        return true;
    }

    public boolean finishOrder(int order_id){
        Order order = orderDao.getOrder(order_id);
        if (order == null) return false;

        order.setState(Constant.ORDER_FINISHED);
        orderDao.saveOrder(order);
        return true;
    }

}
