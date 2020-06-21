package com.reins.bookstore.daoimpl;


import com.reins.bookstore.dao.CartDao;
import com.reins.bookstore.entity.CartItem;
import com.reins.bookstore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    CartRepository cartRepository;

    @Override
    public List<CartItem> getCart(int user_id){
        return cartRepository.getUserBooks(user_id);
    }

    @Override
    public CartItem getItem(int id){
        return cartRepository.findById(id);
    };


    @Override
    public void addToCart(int user_id,int book_id,String book_name){
        CartItem cartItem = cartRepository.findOneItem(user_id,book_id);

        if (cartItem == null){
            cartItem = new CartItem();
            cartItem.setBook_id(book_id);
            cartItem.setBook_name(book_name);
            cartItem.setUser_id(user_id);
            cartItem.setNum(1);
        }
        else {
            cartItem.setNum(cartItem.getNum() + 1);
        }
        cartRepository.save(cartItem);
    };

    @Override
    public void removeFromCart(int user_id,int book_id){
        CartItem cartItem = cartRepository.findOneItem(user_id,book_id);
        if (cartItem == null) return;
        cartRepository.delete(cartItem);
    };

    @Override
    public void removeAllByUser(int user_id){
        List<CartItem> cart = getCart(user_id);
        cartRepository.deleteInBatch(cart);
    }


}

