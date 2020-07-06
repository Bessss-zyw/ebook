package com.reins.bookstore.service;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.dao.OrderDao;
import com.reins.bookstore.dao.UserDao;
import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.extra.BookSale;
import com.reins.bookstore.service.extra.UserConsume;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;


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


    /**
     * Calculate the cumulative consumption of each book
     * and sort the result from high to low
     */
    public List<BookSale> getBookSale(Timestamp start, Timestamp end) {
        List<Book> books = bookDao.getBooks();

        List<BookSale> bookSaleList = new ArrayList<>();
        for (Book book: books) {
            bookSaleList.add(new BookSale(0, book));
        }

        List<Order> orders = orderDao.getOrderDuring(start, end);
        for (Order order: orders) {
            List<OrderItem> orderItems = orderDao.getOrderItems(order.getOrder_id());

            for (OrderItem item: orderItems) {
                for (BookSale bookSale: bookSaleList) {
                    if (!bookSale.match(item.getBook_id())) continue;
                    bookSale.addSale(item.getNum());
                    break;
                }
            }
        }

        bookSaleList.sort(new Comparator<BookSale>() {
            @Override
            public int compare(BookSale t1, BookSale t2) {
                return Integer.compare(t2.getSale(), t1.getSale());
            }
        });

        return bookSaleList;
    }


    /**
     * Calculate the cumulative consumption of each user
     * and the result is not sorted
     */
    public List<UserConsume> getUserConsume(Timestamp start, Timestamp end) {
        List<UserAuth> users = userDao.getAllAuth();

        List<UserConsume> userConsumes = new ArrayList<>();
        for (UserAuth user: users) {
            userConsumes.add(new UserConsume(0, 0.0, user));
        }

        List<Order> orders = orderDao.getOrderDuring(start, end);
        for (Order order: orders) {
            System.out.println(order);
            List<OrderItem> orderItems = orderDao.getOrderItems(order.getOrder_id());

            for (UserConsume userConsume: userConsumes) {
                if (!userConsume.match(order.getUser_id())) continue;
                for (OrderItem item: orderItems) {
                    userConsume.addBookNum(item.getNum());
                    userConsume.addExpenditure(item.getNum() * item.getBook_price());
                }
            }
        }

        userConsumes.sort(new Comparator<UserConsume>() {
            @Override
            public int compare(UserConsume t1, UserConsume t2) {
                return Integer.compare(t2.getBookNum(),t1.getBookNum());
            }
        });
        return userConsumes;
    }


    /**
     * Calculate the cumulative consumption of this user
     * and sort the result from high to low
     */
    public List<BookSale> getUserReport(int user_id, Timestamp start, Timestamp end) {
        List<Book> books = bookDao.getBooks();

        List<BookSale> bookSaleList = new ArrayList<>();
        for (Book book: books) {
            bookSaleList.add(new BookSale(0, book));
        }

        List<Order> orders = orderDao.getUserOrderDuring(user_id, start, end);
        for (Order order: orders) {
            List<OrderItem> orderItems = orderDao.getOrderItems(order.getOrder_id());

            for (OrderItem item: orderItems) {
                for (BookSale bookSale: bookSaleList) {
                    if (!bookSale.match(item.getBook_id())) continue;
                    bookSale.addSale(item.getNum());
                    break;
                }
            }
        }


        bookSaleList.removeIf(new Predicate<BookSale>() {
            @Override
            public boolean test(BookSale bookSale) {
                if (bookSale.getSale() == 0) return true;
                else return false;
            }
        });

        bookSaleList.sort(new Comparator<BookSale>() {
            @Override
            public int compare(BookSale t1, BookSale t2) {
                return Integer.compare(t2.getSale(), t1.getSale());
            }
        });

        return bookSaleList;
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
