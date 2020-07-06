package com.reins.bookstore.controller;

import com.reins.bookstore.entity.*;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.service.extra.BookSale;
import com.reins.bookstore.service.extra.UserConsume;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.*;
import java.util.function.Predicate;

import static java.lang.Integer.parseInt;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    BookService bookService;


    /**
     * To put all the books in cart into a new order
     */
    @RequestMapping("/cartToOrder")
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    public Msg cartToOrder(@RequestParam("user_id") int user_id){
        if (orderService.cartToOrder(user_id))
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.MAKE_ORDER_SUCCESS);
        else
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.MAKE_ORDER_ERROR);
    }


    /**
     * To create a new order and return the order_id
     */
    @RequestMapping("/createOrder")
    public Order createOrder(@RequestParam("user_id") int user_id){
        System.out.println("createOrder");
        Order order = orderService.createOrder(user_id);

        return order;
    }


    /**
     * To add a single orderItem into one order*
     */
    @RequestMapping("/addOrderItem")
    public OrderItem addOrderItem(@RequestParam("order_id")int order_id,
                                  @RequestParam("cart_id")int cart_id){
        System.out.println("addOrderItem");
        System.out.println("cart_id = " + cart_id);
        return orderService.addOrderItem(order_id, cart_id);
    }



    /**
     * For admin to grab all order informations
     */
    @RequestMapping("/getAllOrders")
    public List<Order> getAllOrders(){
        System.out.println("getAllOrders");
        System.out.println(SessionUtil.getAuth());
        return orderService.getAllOrders();
    }

    /**
     * For user to grab all its orders
     */
    @RequestMapping("/getUserOrder")
    public List<Order> getUserOrder(@RequestParam("user_id") int user_id){
        return orderService.getOrdersByUser(user_id);
    }

    /**
     * To get a single order's all orderItems
     */
    @RequestMapping("/getOrderItems")
    public List<OrderItem> getOrderItems(@RequestParam("order_id") int order_id){
        return orderService.getOrderItems(order_id);
    }



    /**
     * Calculate the cumulative consumption of each book
     * and sort the result from high to low
     */
    @RequestMapping("/getBookSale")
    public List<BookSale> getBookSale(@RequestParam("start")String start,
                                      @RequestParam("end")String end) {
//        String str1 = "2020-2-05 16:16:57";
//        String str2 = "2020-6-20 16:16:57";
        Timestamp time1 = Timestamp.valueOf(start);
        Timestamp time2 = Timestamp.valueOf(end);
        System.out.println(start);
        System.out.println(end);

        return orderService.getBookSale(time1, time2);
    }


    /**
     * Calculate the cumulative consumption of each user
     * and the result is not sorted
     */
    @RequestMapping("/getUserConsume")
    public List<UserConsume> getUserConsume(@RequestParam("start")String start,
                                            @RequestParam("end")String end) {
        Timestamp time1 = Timestamp.valueOf(start);
        Timestamp time2 = Timestamp.valueOf(end);

        return orderService.getUserConsume(time1, time2);
    }


    /**
     * Calculate the cumulative consumption of this user
     * and sort the result from high to low
     */
    @RequestMapping("/getUserReport")
    public List<BookSale> getUserReport(@RequestParam("user_id")int user_id,
                                        @RequestParam("start")String start,
                                        @RequestParam("end")String end) {
        Timestamp time1 = Timestamp.valueOf(start);
        Timestamp time2 = Timestamp.valueOf(end);
        return orderService.getUserReport(user_id, time1, time2);
    }



}
