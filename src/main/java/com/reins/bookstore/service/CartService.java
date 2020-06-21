package com.reins.bookstore.service;

import com.reins.bookstore.dao.BookDao;
import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    CartDao cartDao;

    @Autowired
    BookDao bookDao;

    public List<CartItem> getCart(int user_id){
        return cartDao.getCart(user_id);
    }

    public void addToCart(int user_id,int book_id,String book_name){
        cartDao.addToCart(user_id,book_id,book_name);
    }

    public void removeFromCart(int user_id,int book_id){
        cartDao.removeFromCart(user_id,book_id);
    }

    public void clearCart(int user_id){
        cartDao.removeAllByUser(user_id);
    }
}
