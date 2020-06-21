package com.reins.bookstore.controller;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.CartItem;
import com.reins.bookstore.service.BookService;
import com.reins.bookstore.service.CartService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import static java.lang.Integer.parseInt;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping("/getCart")
    public List<CartItem> getCart(@RequestParam("user_id") Integer id) {
        return cartService.getCart(id);
    }

    @RequestMapping("/addToCart")
    public Msg addToCart(@RequestBody Map<String, String> params){
        System.out.println("add to cart");
        System.out.println(params);
        int user_id = parseInt(params.get("user_id"));
        int book_id = parseInt(params.get("book_id"));
        String book_name = params.get("book_name");
        System.out.println(user_id);
        System.out.println(book_id);
        System.out.println(book_name);

        cartService.addToCart(user_id,book_id,book_name);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.ADD_TO_CART_SUCCESS);
    }

    @RequestMapping("/removeFromCart")
    public Msg removeFromCart(@RequestBody Map<String, String> params){
        int user_id = parseInt(params.get("user_id"));
        int book_id = parseInt(params.get("book_id"));
        cartService.removeFromCart(user_id,book_id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, "remove from cart successfully!");
    }

    @RequestMapping("/clearCart")
    public Msg clearCart(@RequestParam("user_id") int user_id){
        cartService.clearCart(user_id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

}
