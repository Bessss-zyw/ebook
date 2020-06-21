package com.reins.bookstore.controller;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.CartItem;
import com.reins.bookstore.entity.Order;
import com.reins.bookstore.entity.OrderItem;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.service.OrderService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Integer.parseInt;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    BookService bookService;


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

}
