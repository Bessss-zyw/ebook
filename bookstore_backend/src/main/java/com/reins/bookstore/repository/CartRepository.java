package com.reins.bookstore.repository;

import com.reins.bookstore.entity.Book;
import com.reins.bookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem,Integer> {

    @Query("from CartItem where user_id = ?1")
    List<CartItem> getUserBooks(int user_id);

    @Query(value = "from CartItem where user_id = ?1 and book_id = ?2")
    CartItem findOneItem(int user_id, int book_id);

    @Query(value = "from CartItem where cart_item_id = ?1")
    CartItem findById(int id);

}
