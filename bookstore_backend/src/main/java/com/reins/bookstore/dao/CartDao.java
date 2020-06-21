package com.reins.bookstore.dao;

import com.reins.bookstore.entity.CartItem;

import java.util.List;

public interface CartDao {

    List<CartItem> getCart(int user_id);

    CartItem getItem(int id);

    void addToCart(int user_id,int book_id,String book_name);

    void removeFromCart(int user_id,int book_id);

    void removeAllByUser(int user_id);

}
